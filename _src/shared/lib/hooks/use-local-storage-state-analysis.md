# useLocalStorageState Hook - Analysis & Recommendations

## 1. Edge Cases That Were Missing

### ✅ Now Added (11 new tests):

1. **Invalid JSON Fallback**: When stored value is not valid JSON and no custom `parse` is provided, should fallback to raw string
2. **Parse Function Errors**: When custom `parse` function throws, error should propagate
3. **Falsy Values**: Zero (`0`) and false (`false`) should be properly stored and retrieved (not confused with "no value")
4. **Large Strings**: Should handle very large string values without issues
5. **Special Characters**: Unicode, quotes, backslashes, newlines should be properly escaped
6. **Deep Nesting**: Deeply nested objects should serialize/deserialize correctly
7. **Date Handling**: Dates get serialized to ISO strings (limitation to document)
8. **Storage Sync with Parse**: Cross-tab sync should work with custom parse functions
9. **Storage Removal Events**: When value is removed in another tab (null newValue), should revert to default
10. **Options Cache Conflict**: When multiple hooks use same key with different options, first options win (known limitation)

### 🔴 Still Missing (should consider adding):

1. **QuotaExceededError**: When localStorage is full
   ```typescript
   test("handles quota exceeded error gracefully", () => {
     const key = getUniqueKey();
     const mockSetItem = vi.fn(() => {
       throw new DOMException("QuotaExceededError", "QuotaExceededError");
     });
     global.localStorage.setItem = mockSetItem;
     
     const { result } = renderHook(() => useLocalStorageState(key));
     
     // Should not crash, maybe provide error callback?
     act(() => {
       result.current[1]("large-value");
     });
   });
   ```

2. **Concurrent Updates**: Race conditions when multiple tabs update simultaneously
3. **Memory Leaks**: Verify cleanup when many hooks mount/unmount rapidly
4. **Parse Function Stability**: What happens if parse function reference changes on re-render?
5. **localStorage.getItem Errors**: Some browsers can throw when accessing localStorage
6. **Circular References**: Objects with circular references will fail JSON.stringify

---

## 2. Hook Implementation Improvements

### 🟡 High Priority Issues

#### 2.1 Event Listener Memory Leak
**Location**: Lines 51-56

```typescript
subscribeOnStorageChange() {
  window.addEventListener("storage", this.onStorageChange.bind(this));
  return () =>
    window.removeEventListener(
      "storage",
      this.onStorageChange.bind(this),  // ❌ Creates NEW function, won't remove original!
    );
}
```

**Problem**: `bind(this)` creates a new function each time, so `removeEventListener` won't find the original listener.

**Fix**:
```typescript
private boundOnStorageChange?: (event: StorageEvent) => void;

subscribeOnStorageChange() {
  if (!this.boundOnStorageChange) {
    this.boundOnStorageChange = this.onStorageChange.bind(this);
  }
  window.addEventListener("storage", this.boundOnStorageChange);
  return () => {
    if (this.boundOnStorageChange) {
      window.removeEventListener("storage", this.boundOnStorageChange);
    }
  };
}
```

#### 2.2 Options Cache Mismatch
**Location**: Lines 102-109

```typescript
function buildState<TValue>(fieldName: string, options?: Options<TValue>) {
  let state = statesCache.get(fieldName) as
    | LocalStorageState<TValue>
    | undefined;
  if (!state) {
    state = new LocalStorageState<TValue>(fieldName, options);
    statesCache.set(fieldName, state);
  }
  // ❌ If state exists, new options are ignored!
  return { ... };
}
```

**Problem**: When same key is used with different options, the first options win silently.

**Possible Fixes**:

**Option A - Warn in Development**:
```typescript
if (state && process.env.NODE_ENV === "development") {
  console.warn(
    `useLocalStorageState: Key "${fieldName}" is already cached with different options. ` +
    `First options will be used. Consider using unique keys for different configurations.`
  );
}
```

**Option B - Hash Options into Cache Key**:
```typescript
function getCacheKey(fieldName: string, options?: Options<TValue>): string {
  // Include critical options in cache key
  const optionsKey = options?.parse ? "custom-parse" : "default";
  return `${fieldName}:${optionsKey}`;
}
```

**Option C - Update Options on Existing State** (most flexible):
```typescript
function buildState<TValue>(fieldName: string, options?: Options<TValue>) {
  let state = statesCache.get(fieldName);
  if (!state) {
    state = new LocalStorageState<TValue>(fieldName, options);
    statesCache.set(fieldName, state);
  } else {
    // Update options on existing state
    state.updateOptions(options);
  }
  return { ... };
}
```

#### 2.3 useMemo Dependency Array Issue
**Location**: Lines 166-169

```typescript
const { ... } = useMemo(
  () => buildState<TValue>(fieldName, options),
  [fieldName, options],  // ❌ options is an object - will recreate every render!
);
```

**Problem**: Options object changes on every render, causing `useMemo` to always recreate state bindings.

**Fix**:
```typescript
const {
  subscribe,
  getSnapshot,
  getServerSnapshot,
  setState,
  resetState,
  subscribeOnStorageChange,
} = useMemo(
  () => buildState<TValue>(fieldName, options),
  // Only recreate if fieldName changes - state is cached anyway
  [fieldName],
);
```

Or use stable options:
```typescript
const stableOptions = useMemo(
  () => options,
  [options?.parse, options?.defaultValue, options?.defaultServerValue, options?.syncWithStorage]
);
```

### 🟢 Medium Priority Improvements

#### 2.4 Error Handling
Add error boundaries for localStorage operations:

```typescript
setState(newValue: TValue) {
  if (isSsr()) return;
  
  try {
    const valueToSet =
      typeof newValue === "string" ? newValue : JSON.stringify(newValue);
    localStorage.setItem(this.fieldName, valueToSet);
    this.value = newValue;
    this.notifyListeners();
  } catch (error) {
    // Handle QuotaExceededError, circular references, etc.
    if (this.options.onError) {
      this.options.onError(error as Error);
    } else {
      console.error(`Failed to set localStorage key "${this.fieldName}":`, error);
    }
  }
}
```

#### 2.5 Add Serialization Option
Currently only supports custom `parse`, but not custom `serialize`:

```typescript
type Options<TValue, TDefaultValue> = {
  parse?: (value: string) => TValue;
  serialize?: (value: TValue) => string;  // ✅ Add this
  defaultValue?: TDefaultValue;
  defaultServerValue?: TDefaultValue;
  syncWithStorage?: boolean;
  onError?: (error: Error) => void;  // ✅ Add this too
};

setState(newValue: TValue) {
  if (isSsr()) return;
  
  try {
    const valueToSet = this.options.serialize
      ? this.options.serialize(newValue)
      : typeof newValue === "string"
        ? newValue
        : JSON.stringify(newValue);
    
    localStorage.setItem(this.fieldName, valueToSet);
    this.value = newValue;
    this.notifyListeners();
  } catch (error) {
    this.options.onError?.(error as Error);
  }
}
```

#### 2.6 Type Safety for Parse/Serialize
Add type guards to ensure parse returns correct type:

```typescript
type Options<TValue, TDefaultValue> = {
  parse?: (value: string) => TValue;
  // Ensure serialize receives and returns correct types
  serialize?: (value: TValue) => string;
  // ...
};
```

#### 2.7 Add TTL/Expiration Support
```typescript
type Options<TValue, TDefaultValue> = {
  // ...
  ttl?: number; // Time to live in milliseconds
};

private isExpired(): boolean {
  if (!this.options.ttl) return false;
  
  const timestampKey = `${this.fieldName}:timestamp`;
  const timestamp = localStorage.getItem(timestampKey);
  if (!timestamp) return false;
  
  const age = Date.now() - parseInt(timestamp, 10);
  return age > this.options.ttl;
}
```

### 🔵 Low Priority / Nice to Have

#### 2.8 Add Storage Events Batching
When multiple values change quickly, batch updates:

```typescript
private updateTimer?: NodeJS.Timeout;

private scheduleUpdate() {
  clearTimeout(this.updateTimer);
  this.updateTimer = setTimeout(() => {
    this.notifyListeners();
  }, 16); // ~60fps
}
```

#### 2.9 Add Middleware/Transforms
```typescript
type Options<TValue, TDefaultValue> = {
  // ...
  transforms?: Array<(value: TValue) => TValue>;
};
```

#### 2.10 Add Version/Migration Support
```typescript
type Options<TValue, TDefaultValue> = {
  // ...
  version?: number;
  migrate?: (oldValue: unknown, oldVersion: number) => TValue;
};
```

---

## 3. Architectural Improvements

### 3.1 Split Concerns
Consider separating into multiple files:
- `LocalStorageState.ts` - Core state management class
- `useLocalStorageState.ts` - React hook
- `storage-cache.ts` - Cache management
- `types.ts` - Type definitions

### 3.2 Add Storage Adapter Pattern
Support different storage backends:

```typescript
interface StorageAdapter {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

class LocalStorageAdapter implements StorageAdapter {
  getItem(key: string) { return localStorage.getItem(key); }
  setItem(key: string, value: string) { localStorage.setItem(key, value); }
  removeItem(key: string) { localStorage.removeItem(key); }
}

class SessionStorageAdapter implements StorageAdapter {
  // ... similar implementation for sessionStorage
}
```

### 3.3 Add Debug Mode
```typescript
type Options<TValue, TDefaultValue> = {
  // ...
  debug?: boolean;
};

private log(...args: unknown[]) {
  if (this.options.debug) {
    console.log(`[LocalStorageState:${this.fieldName}]`, ...args);
  }
}
```

---

## 4. Documentation Improvements

### 4.1 Add JSDoc Comments
The implementation has good inline docs for the `parse` option, but needs more:

```typescript
/**
 * React hook for managing state synchronized with localStorage.
 * 
 * @template TValue - The type of value to store
 * @param fieldName - The localStorage key to use
 * @param options - Configuration options
 * @returns A tuple of [value, setValue, resetValue]
 * 
 * @example
 * // Simple string storage
 * const [name, setName, resetName] = useLocalStorageState('username', {
 *   defaultValue: 'Guest'
 * });
 * 
 * @example
 * // Object with custom parse
 * const [user, setUser] = useLocalStorageState('user', {
 *   parse: JSON.parse,
 *   defaultValue: { name: 'Guest', age: 0 }
 * });
 */
```

### 4.2 Add README with Examples
Create comprehensive usage examples showing:
- Basic usage
- TypeScript usage
- Custom serialization
- Cross-tab sync
- SSR considerations
- Performance best practices

---

## 5. Testing Improvements

### Current: 45 tests ✅
Good coverage, but could add:

1. **Performance tests**: Measure memory usage with many hooks
2. **Integration tests**: Test with actual browser localStorage
3. **Concurrent tests**: Multiple rapid updates
4. **Fuzz testing**: Random data to find edge cases

---

## Summary

### Critical Fixes:
1. ✅ **Fix event listener memory leak** (High Priority)
2. ✅ **Fix useMemo dependency** (High Priority)
3. ⚠️ **Document or fix options caching behavior** (Medium Priority)

### Nice to Have:
- Add error handling with callbacks
- Support custom serialization
- Add TTL/expiration
- Better TypeScript types
- Performance optimizations

### Tests to Add:
- QuotaExceededError handling
- Concurrent update scenarios
- Parse function reference stability
- Circular reference handling


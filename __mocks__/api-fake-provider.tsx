import { DeepPartial } from "@/src/shared/lib";
import {
	DOMAIN_API,
	DomainApiContext,
	DomainApiContextProps,
} from "@/src/domain/providers/api-provider";
import { ReactNode } from "react";
import { vi } from "vitest";

export type FakeApi = DeepPartial<DomainApiContextProps>;
type ApiFakeProviderProps = {
	children: ReactNode;
	fakeApi?: FakeApi;
};

export function ApiFakeProvider({ children, fakeApi }: ApiFakeProviderProps) {
	return (
		<DomainApiContext.Provider
			value={mergeDeep(FAKE_API, fakeApi || {}) as DomainApiContextProps}
		>
			{children}
		</DomainApiContext.Provider>
	);
}

const FAKE_API: DomainApiContextProps = mockApi(
	DOMAIN_API,
) as DomainApiContextProps;

function mockApi(apiObj: PlainObject<unknown>) {
	const result: PlainObject<unknown> = {};
	Object.keys(apiObj).forEach((key) => {
		if (apiObj[key]?.constructor === Object) {
			result[key] = mockApi(apiObj[key] as PlainObject<unknown>);
		} else {
			result[key] = vi.fn();
		}
	});
	return result;
}

type PlainObject<T> = {
	[key: string]: T | PlainObject<T> | undefined;
};

function mergeDeep<T>(obj1: PlainObject<T>, obj2: PlainObject<T>): T {
	const result: PlainObject<T> = copyDeep(obj1) as PlainObject<T>;

	Object.keys(obj2).forEach((key) => {
		if (
			obj2[key]?.constructor === Object &&
			result[key]?.constructor === Object
		) {
			result[key] = mergeDeep(result[key], obj2[key]);
		} else {
			result[key] = obj2[key];
		}
	});

	return result as T;
}

function copyDeep(obj: PlainObject<unknown>) {
	const result: PlainObject<unknown> = {};
	Object.keys(obj).forEach((key) => {
		if (obj[key]?.constructor === Object) {
			result[key] = copyDeep({ ...obj[key] });
		} else {
			result[key] = obj[key];
		}
	});
	return result;
}

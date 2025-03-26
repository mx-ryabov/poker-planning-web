import {
	ApiContextProps,
	ApiContext,
	API,
} from "@/_src/app/providers/api-provider";
import { DeepPartial } from "@/_src/shared/lib";
import { ReactNode } from "react";
import { vi } from "vitest";

export type FakeApi = DeepPartial<ApiContextProps>;
type ApiFakeProviderProps = {
	children: ReactNode;
	fakeApi?: FakeApi;
};

export function ApiFakeProvider({ children, fakeApi }: ApiFakeProviderProps) {
	return (
		<ApiContext.Provider value={mergeDeep(FAKE_API, fakeApi || {})}>
			{children}
		</ApiContext.Provider>
	);
}

const FAKE_API: ApiContextProps = mockApi(API) as ApiContextProps;

function mockApi(apiObj: PlainObject) {
	const result: PlainObject = {};
	Object.keys(apiObj).forEach((key) => {
		if (apiObj[key]?.constructor === Object) {
			result[key] = mockApi(apiObj[key]);
		} else {
			result[key] = vi.fn();
		}
	});
	return result;
}

type PlainObject<T = any> = {
	[key: string]: T | PlainObject<T> | undefined;
};

function mergeDeep<T>(obj1: PlainObject, obj2: PlainObject): T {
	const result: PlainObject = copyDeep(obj1);

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

function copyDeep(obj: PlainObject) {
	let result: PlainObject = {};
	Object.keys(obj).forEach((key) => {
		if (obj[key]?.constructor === Object) {
			result[key] = copyDeep({ ...obj[key] });
		} else {
			result[key] = obj[key];
		}
	});
	return result;
}

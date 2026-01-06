import React from "react";
import { useStreamable } from "@/src/shared/lib";
import { Streamable } from "@/src/shared/lib/types/streamable";
import { Suspense } from "react";

type Props<T> = {
	fallback: React.ReactNode;
} & InnerProps<T>;

export function Stream<T>(props: Props<T>) {
	const { children, value, fallback } = props;
	return (
		<Suspense fallback={fallback}>
			<InnerStream value={value}>{children}</InnerStream>
		</Suspense>
	);
}

type InnerProps<T> = {
	children: (data: T) => React.ReactNode;
	value: Streamable<T>;
};

function InnerStream<T>(props: InnerProps<T>) {
	const { children, value } = props;
	const data = useStreamable(value);
	return <>{children(data)}</>;
}

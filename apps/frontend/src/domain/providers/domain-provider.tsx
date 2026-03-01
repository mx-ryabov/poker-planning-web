"use client";
import { ReactNode } from "react";
import { DomainApiProvider } from "./api-provider";

interface DomainProviderProps {
	children: ReactNode;
}

export function DomainProvider({ children }: DomainProviderProps) {
	return <DomainApiProvider>{children}</DomainApiProvider>;
}

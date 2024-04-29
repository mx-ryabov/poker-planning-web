"use client";

import PopoverCloseButton from "./components/popover-close-button";
import PopoverContent from "./components/popover-content";
import PopoverTrigger from "./components/popover-trigger";
import PopoverWrapper from "./components/popover-wrapper";

export const Popover = Object.assign(PopoverWrapper, {
	Trigger: PopoverTrigger,
	Content: PopoverContent,
	Close: PopoverCloseButton,
});

import { useEffect } from "react";

/**
 *
 * @param eventTarget instance of EventTarget
 * @param eventName eventType that you provide to the Event constructor
 * @param handler callback that is invoked when your event from generic parameters fires and provides an event instance as a parameter
 */
export function useEventTargetListener<CustomEvent extends Event>(
	eventTarget: EventTarget,
	eventName: string,
	handler: (event: CustomEvent) => void,
) {
	useEffect(() => {
		const eventHandler = (e: Event) => {
			handler(e as CustomEvent);
		};
		eventTarget.addEventListener(eventName, eventHandler);

		return () => {
			eventTarget.removeEventListener(eventName, eventHandler);
		};
	}, [eventTarget, eventName, handler]);
}

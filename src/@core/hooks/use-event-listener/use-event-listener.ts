import { useEffect } from "react";

export const useEventListener = <T extends Event>(
  element: Node | null,
  event: string,
  callback: (e: T) => void
) => {
  useEffect(() => {
    const _element = element;

    const eventListener = (e: T) => {
      e.preventDefault();
      callback(e);
    };

    _element?.addEventListener(event, eventListener as EventListener);
    return () => {
      _element?.removeEventListener(event, eventListener as EventListener);
    };
  }, [callback, element, event]);
};

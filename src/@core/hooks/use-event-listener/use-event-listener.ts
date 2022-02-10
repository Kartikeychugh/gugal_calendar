import { useEffect } from "react";

export const useEventListener = (
  element: Node | null,
  event: string,
  callback: (e: Event) => void
) => {
  useEffect(() => {
    const _element = element;

    const eventListener = (e: Event) => {
      e.preventDefault();
      callback(e);
    };

    _element?.addEventListener(event, eventListener);
    return () => {
      _element?.removeEventListener(event, eventListener);
    };
  }, [callback, element, event]);
};

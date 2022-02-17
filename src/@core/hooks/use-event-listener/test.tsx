import { useCallback } from "react";

export const useRegisterEventListener = <T extends Event>(
  event: string,
  callback: (event: T) => void
) => {
  const wrappedCallback = useCallback(
    (e: T) => {
      e.stopPropagation();
      callback(e);
    },
    [callback]
  );

  const register = useCallback(
    (element: HTMLElement | null) => {
      element?.addEventListener(event, wrappedCallback as EventListener);
      return () => {
        element?.removeEventListener(event, wrappedCallback as EventListener);
      };
    },
    [event, wrappedCallback]
  );

  return register;
};

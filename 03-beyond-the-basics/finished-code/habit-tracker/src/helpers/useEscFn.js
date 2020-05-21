import { useCallback, useEffect } from "react";

// Custom hook to call a function when escape is pressed
export const useEscFn = (successFn) => {
  const escFunction = useCallback(
    (event) => {
      if (event.keyCode === 27) {
        successFn();
      }
    },
    [successFn]
  );

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [escFunction]);
};

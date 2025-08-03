import { useEffect } from "react";

export default function useStopScroll(isOpen: boolean) {
  useEffect(() => {
    const body = document.body;

    if (isOpen) {
      body.style.setProperty("overflow", "hidden", "important");
    } else {
      body.style.removeProperty("overflow");
    }

    return () => {
      body.style.removeProperty("overflow");
    };
  }, [isOpen]);
}

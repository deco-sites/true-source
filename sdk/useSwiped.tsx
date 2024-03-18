import { useEffect } from "preact/hooks";

type Props = {
  onSwipeLeft?: (delta: number) => void;
  onSwipeRight?: (delta: number) => void;
  delta?: number;
};

export default function ({ onSwipeLeft, onSwipeRight, delta = 50 }: Props) {
  useEffect(() => {
    let touchStartX = 0;
    let touchEndX = 0;

    function checkDirection() {
      if (touchEndX < touchStartX - delta) {
        onSwipeLeft?.(touchStartX - touchEndX);
      }
      if (touchEndX > touchStartX + delta) {
        onSwipeRight?.(touchEndX - touchStartX);
      }
    }

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].screenX;

      checkDirection();
    };

    addEventListener("touchstart", handleTouchStart);
    addEventListener("touchend", handleTouchEnd);

    return () => {
      removeEventListener("touchstart", handleTouchStart);
      removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return null;
}

import {
  useRef,
  useState,
  useEffect,
  useCallback,
  MutableRefObject,
} from "react";

export interface MagneticPosition {
  x: number;
  y: number;
}

export interface UseMagneticReturn {
  ref: MutableRefObject<HTMLElement | null>;
  x: number;
  y: number;
}

/**
 * Custom hook to create a "Magnetic" interaction for an element.
 * It calculates the distance from the cursor and applies a subtle "pull" transform.
 */
export const useMagnetic = (intensity: number = 0.5): UseMagneticReturn => {
  const ref = useRef<HTMLElement>(null);
  const [position, setPosition] = useState<MagneticPosition>({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!ref.current) return;

      const { clientX, clientY } = e;
      const { left, top, width, height } = ref.current.getBoundingClientRect();

      // Find the center of the element
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      // Distance from cursor to center
      const distanceX = clientX - centerX;
      const distanceY = clientY - centerY;

      // Apply intensity and bounds
      const maxDistance = 100; // Interaction radius
      if (
        Math.abs(distanceX) < maxDistance &&
        Math.abs(distanceY) < maxDistance
      ) {
        setPosition({
          x: distanceX * intensity,
          y: distanceY * intensity,
        });
      } else {
        setPosition({ x: 0, y: 0 });
      }
    },
    [intensity],
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return { ref, x: position.x, y: position.y };
};

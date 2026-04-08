import React, { useState, useEffect, useRef } from 'react';

const TITLES = ["INTERACTIVE ENGINEER", "SYSTEM ARCHITECT", "CODE CRAFTSMAN"] as const;

export const AutoTypingTitle = () => {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  // Use a ref to hold the timeout id so we don't re-run the effect on each text change
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const currentTitle = TITLES[index];

    const tick = () => {
      if (isDeleting) {
        setText((prev) => {
          const next = currentTitle.slice(0, prev.length - 1);
          if (next.length === 0) {
            setIsDeleting(false);
            setIndex((i) => (i + 1) % TITLES.length);
          }
          return next;
        });
        timerRef.current = setTimeout(tick, 30);
      } else {
        setText((prev) => {
          const next = currentTitle.slice(0, prev.length + 1);
          if (next === currentTitle) {
            // Pause before deleting
            timerRef.current = setTimeout(() => setIsDeleting(true), 2500);
            return next;
          }
          timerRef.current = setTimeout(tick, 60);
          return next;
        });
      }
    };

    timerRef.current = setTimeout(tick, isDeleting ? 30 : 60);

    return () => {
      if (timerRef.current !== null) clearTimeout(timerRef.current);
    };
    // Only re-run when index or isDeleting changes; text is managed via setState callbacks
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, isDeleting]);

  return (
    <span className="font-mono text-tertiary border-r-[3px] border-tertiary pr-[2px] animate-pulse">
      {text}
    </span>
  );
};

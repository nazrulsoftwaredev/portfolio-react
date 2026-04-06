import React, { useState, useEffect } from 'react';

export const AutoTypingTitle = () => {
  const titles = ["INTERACTIVE ENGINEER", "SYSTEM ARCHITECT", "CODE CRAFTSMAN"];
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const currentTitle = titles[index];
    
    if (isDeleting) {
      timer = setTimeout(() => {
        setText(currentTitle.substring(0, text.length - 1));
        if (text.length === 0) {
          setIsDeleting(false);
          setIndex((prev) => (prev + 1) % titles.length);
        }
      }, 30);
    } else {
      timer = setTimeout(() => {
        setText(currentTitle.substring(0, text.length + 1));
        if (text === currentTitle) {
          timer = setTimeout(() => setIsDeleting(true), 2500);
        }
      }, 60);
    }
    return () => clearTimeout(timer);
  }, [text, isDeleting, index]);

  return (
    <span className="font-mono text-tertiary border-r-[3px] border-tertiary pr-[2px] animate-pulse">
      {text}
    </span>
  );
};

"use client";

import { useState, useEffect, useCallback } from "react";

interface UseTypingAnimationOptions {
  texts: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseAfterTyping?: number;
  pauseAfterDeleting?: number;
}

interface UseTypingAnimationReturn {
  displayedText: string;
  isTyping: boolean;
  isDeleting: boolean;
  cursor: string;
}

export function useTypingAnimation({
  texts,
  typeSpeed = 80,
  deleteSpeed = 40,
  pauseAfterTyping = 2000,
  pauseAfterDeleting = 500,
}: UseTypingAnimationOptions): UseTypingAnimationReturn {
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [cursor, setCursor] = useState("|");

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => {
      setCursor((prev) => (prev === "|" ? "" : "|"));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const tick = useCallback(() => {
    const currentText = texts[textIndex];

    if (isWaiting) return;

    if (isDeleting) {
      if (charIndex > 0) {
        setCharIndex((prev) => prev - 1);
      } else {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % texts.length);
        setIsWaiting(true);
        setTimeout(() => setIsWaiting(false), pauseAfterDeleting);
      }
    } else {
      if (charIndex < currentText.length) {
        setCharIndex((prev) => prev + 1);
      } else {
        setIsWaiting(true);
        setTimeout(() => {
          setIsDeleting(true);
          setIsWaiting(false);
        }, pauseAfterTyping);
      }
    }
  }, [
    textIndex,
    charIndex,
    isDeleting,
    isWaiting,
    texts,
    pauseAfterTyping,
    pauseAfterDeleting,
  ]);

  useEffect(() => {
    const speed = isDeleting ? deleteSpeed : typeSpeed;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [tick, isDeleting, typeSpeed, deleteSpeed]);

  return {
    displayedText: texts[textIndex].substring(0, charIndex),
    isTyping: !isDeleting && charIndex < texts[textIndex].length,
    isDeleting,
    cursor,
  };
}

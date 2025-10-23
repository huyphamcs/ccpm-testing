"use client";

import { useState, useEffect } from "react";

/**
 * Custom hook to track scroll position
 * @param threshold - Scroll position threshold to trigger change
 * @returns Whether scroll position is past threshold
 */
export function useScrollPosition(threshold: number = 50): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > threshold;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    // Check initial scroll position
    handleScroll();

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Cleanup
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled, threshold]);

  return scrolled;
}

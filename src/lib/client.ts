"use client";

import { useEffect, useState } from "react";

/**
 * Hook to detect prefers-reduced-motion media query
 * Returns true if user prefers reduced motion
 */
export function useReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setPrefersReduced(event.matches);
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return prefersReduced;
}

/**
 * Hook to safely check if we're running on the client
 * Prevents hydration mismatches when accessing window/document
 */
export function useIsClient(): boolean {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}

/**
 * Utility to safely run code only on client side
 * Usage: if (isClient()) { ... }
 */
export function isClient(): boolean {
  return typeof window !== "undefined";
}

/**
 * Utility to safely access localStorage/sessionStorage
 * Returns null if not on client or storage unavailable
 */
export function getStorageItem(key: string, storage: "local" | "session" = "session"): string | null {
  if (!isClient()) return null;
  try {
    return storage === "local" ? localStorage.getItem(key) : sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

export function setStorageItem(key: string, value: string, storage: "local" | "session" = "session"): boolean {
  if (!isClient()) return false;
  try {
    if (storage === "local") localStorage.setItem(key, value);
    else sessionStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}
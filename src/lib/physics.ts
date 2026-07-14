// src/lib/physics.ts

// Emil Kowalski Tactile Spring: Used for button presses, card hovers, and toggles
export const SPRING_TACTILE = {
  type: "spring",
  stiffness: 500,
  damping: 35,
  mass: 1,
} as const;

// Glider Spring: Used for layoutId pill transitions on tabs and segmented controls
export const SPRING_GLIDER = {
  type: "spring",
  stiffness: 450,
  damping: 30,
  mass: 0.8,
} as const;

// Asymmetric Out-Expo Curve: Rapid high-velocity entrance, snappy deceleration
export const EASING_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

// Smooth Viewport Reveal Curve: Used for section scrolling entrances
export const EASING_REVEAL = [0.25, 0.1, 0.25, 1] as const;
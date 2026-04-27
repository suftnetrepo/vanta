// ─────────────────────────────────────────────────────────────────────────────
// Vanta — Motion tokens
// Centralised durations and easing curves for all animations.
// ─────────────────────────────────────────────────────────────────────────────

export const duration = {
  // Instant feedback — button press, toggle
  instant:  80,

  // Fast transitions — chip select, badge appear
  fast:    150,

  // Standard UI transitions — screen slide, modal open
  normal:  250,

  // Deliberate — bottom sheet, drawer
  slow:    350,

  // Showcased — onboarding, scan detection pulse
  xslow:   500,
} as const

// Easing curves as Animated.Easing-compatible strings
export const easing = {
  // Snappy feel for most UI
  standard:   'cubic-bezier(0.4, 0, 0.2, 1)',

  // Entries — things coming onto screen
  decelerate: 'cubic-bezier(0, 0, 0.2, 1)',

  // Exits — things leaving screen
  accelerate: 'cubic-bezier(0.4, 0, 1, 1)',

  // Spring feel — scan button, mode pill
  spring:     'cubic-bezier(0.34, 1.56, 0.64, 1)',
} as const

// Spring configs for Animated.spring()
export const spring = {
  // Tight — checkbox, toggle
  snappy: { damping: 20, stiffness: 300, mass: 0.8 },

  // Standard — bottom sheet
  normal: { damping: 18, stiffness: 200, mass: 1 },

  // Bouncy — onboarding, mode switch
  bouncy: { damping: 14, stiffness: 180, mass: 1 },
} as const

export const motion = {
  duration,
  easing,
  spring,
} as const

export type Motion = typeof motion

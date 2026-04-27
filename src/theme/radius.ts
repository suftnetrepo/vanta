// ─────────────────────────────────────────────────────────────────────────────
// Vanta — Border radius tokens
// ─────────────────────────────────────────────────────────────────────────────

export const radius = {
  // Subtle — inputs, small badges
  xs:   4,
  sm:   6,

  // Standard cards, buttons
  md:   8,
  lg:  12,

  // Large cards, scan button, onboarding choices
  xl:  16,
  xxl: 20,

  // Bottom sheets, full-bleed modals
  sheet: 24,

  // Chips, pills, avatars
  full: 999,
} as const

export type Radius = typeof radius

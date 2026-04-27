// ─────────────────────────────────────────────────────────────────────────────
// Vanta — Shadow / elevation tokens
//
// These map to StyledCard's `shadow` prop levels and can also be used as
// flat style props on StyledCard directly.
//
// Usage:
//   <StyledCard shadow="card" ... />
//   <StyledCard {...shadows.card} ... />  ← alternative spread
// ─────────────────────────────────────────────────────────────────────────────

// fluent-styles StyledCard shadow levels:
// 'light' | 'lightMedium' | 'medium' | 'mediumDark' | 'dark' | 'veryDark'

export const shadows = {
  // No elevation — for items on already-elevated surfaces
  none: 'none' as const,

  // Subtle card lift — doc rows, quick action cards
  sm: 'light' as const,

  // Standard card elevation — home cards, stat cards
  card: 'lightMedium' as const,

  // Scan button, prominent CTAs
  md: 'medium' as const,

  // Bottom sheet, drawers
  sheet: 'mediumDark' as const,

  // Modals, popups
  lg: 'dark' as const,
} as const

export type ShadowLevel = typeof shadows[keyof typeof shadows]

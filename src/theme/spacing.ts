// ─────────────────────────────────────────────────────────────────────────────
// Vanta — Spacing tokens
// 4-pt grid. All layout values must come from here — no magic numbers.
// ─────────────────────────────────────────────────────────────────────────────

export const spacing = {
  // Micro gaps — icons, tight rows
  px:  1,
  0.5: 2,
  1:   4,

  // Small gaps — badge padding, tight card internals
  2:   8,
  3:  12,

  // Standard component padding
  4:  16,
  5:  20,
  6:  24,

  // Section gaps
  7:  28,
  8:  32,

  // Large whitespace
  10: 40,
  12: 48,
  16: 64,

  // ── Named aliases (preferred for readability) ──────────────────────────────
  // Use these in components instead of numbers where semantics matter.

  // Component internal padding
  insetXs:  4,
  insetSm:  8,
  insetMd: 12,
  insetLg: 16,
  insetXl: 20,

  // Screen horizontal edge padding
  screenH: 20,

  // Stack gaps
  gapXs:  4,
  gapSm:  8,
  gapMd: 12,
  gapLg: 16,
  gapXl: 20,

  // Section vertical rhythm
  sectionSm: 16,
  sectionMd: 24,
  sectionLg: 32,

  // Bottom tab bar safe padding
  tabBarHeight: 72,

  // Bottom sheet handle to content gap
  sheetGap: 16,
} as const

export type Spacing = typeof spacing

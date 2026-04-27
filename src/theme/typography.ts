// ─────────────────────────────────────────────────────────────────────────────
// Vanta — Typography tokens
//
// Font: Inter (4 weights)
//   Inter-Regular    → weight 400
//   Inter-Medium     → weight 500
//   Inter-SemiBold   → weight 600
//   Inter-Bold       → weight 700
//
// The font family names registered here MUST match the names passed to
// expo-font's loadAsync() in src/hooks/useFonts.ts — they are the glue.
//
// Usage:
//   import { typography } from '@/theme'
//   <StyledText fontFamily={typography.family.semiBold} fontSize={typography.size.lg} />
// ─────────────────────────────────────────────────────────────────────────────

import { theme } from 'fluent-styles'

// ─── Font family names ────────────────────────────────────────────────────────
// These strings are the keys passed to Font.loadAsync() and used in styles.
// Keep in sync with useFonts.ts.

export const family = {
  regular:  'Inter-Regular',
  medium:   'Inter-Medium',
  semiBold: 'Inter-SemiBold',
  bold:     'Inter-Bold',
} as const

// ─── Font weight scale ────────────────────────────────────────────────────────
// Numeric weights for components that accept fontWeight directly.
// Maps to the loaded font files above.

export const weight = {
  regular:  '400' as const,
  medium:   '500' as const,
  semiBold: '600' as const,
  bold:     '700' as const,
} as const

// ─── Font size scale ──────────────────────────────────────────────────────────
// 4-pt base, named for use-case clarity rather than arbitrary numbers.

export const size = {
  // Micro — badges, labels, timestamps
  xs:   11,
  sm:   12,

  // Body — captions, meta, secondary text
  md:   13,
  base: 14,

  // UI — list items, button labels, input text
  lg:   15,
  xl:   16,

  // Headings
  h4:   18,
  h3:   20,
  h2:   22,
  h1:   26,
  display: 32,
} as const

// ─── Line height scale ────────────────────────────────────────────────────────
// Unitless multipliers — React Native uses absolute px, so pair with size.

export const lineHeight = {
  tight:   1.2,   // headings
  snug:    1.35,  // sub-headings, nav labels
  normal:  1.5,   // body text
  relaxed: 1.7,   // long-form paragraphs
} as const

// ─── Letter spacing ───────────────────────────────────────────────────────────

export const letterSpacing = {
  tight:  -0.3,
  normal:  0,
  wide:    0.3,
  wider:   0.5,   // section labels (uppercase caps)
  widest:  0.8,
} as const

// ─── Pre-composed text styles ─────────────────────────────────────────────────
// Ready-to-spread objects for common patterns.

export const textStyles = {
  // Screen/section headings
  h1: {
    fontFamily:    family.bold,
    fontSize:      size.h1,
    lineHeight:    size.h1 * lineHeight.tight,
    letterSpacing: letterSpacing.tight,
  },
  h2: {
    fontFamily:    family.semiBold,
    fontSize:      size.h2,
    lineHeight:    size.h2 * lineHeight.tight,
    letterSpacing: letterSpacing.tight,
  },
  h3: {
    fontFamily:    family.semiBold,
    fontSize:      size.h3,
    lineHeight:    size.h3 * lineHeight.snug,
  },
  h4: {
    fontFamily:    family.semiBold,
    fontSize:      size.h4,
    lineHeight:    size.h4 * lineHeight.snug,
  },

  // Body
  body: {
    fontFamily: family.regular,
    fontSize:   size.base,
    lineHeight: size.base * lineHeight.normal,
  },
  bodyMd: {
    fontFamily: family.regular,
    fontSize:   size.md,
    lineHeight: size.md * lineHeight.normal,
  },

  // UI labels
  label: {
    fontFamily: family.medium,
    fontSize:   size.base,
    lineHeight: size.base * lineHeight.snug,
  },
  labelSm: {
    fontFamily: family.medium,
    fontSize:   size.sm,
    lineHeight: size.sm * lineHeight.snug,
  },

  // Section header (UPPERCASE)
  sectionHeader: {
    fontFamily:    family.semiBold,
    fontSize:      size.xs,
    lineHeight:    size.xs * lineHeight.normal,
    letterSpacing: letterSpacing.wider,
    textTransform: 'uppercase' as const,
  },

  // Button text
  btnLg: {
    fontFamily: family.semiBold,
    fontSize:   size.lg,
    lineHeight: size.lg * lineHeight.snug,
  },
  btnMd: {
    fontFamily: family.semiBold,
    fontSize:   size.base,
    lineHeight: size.base * lineHeight.snug,
  },
  btnSm: {
    fontFamily: family.medium,
    fontSize:   size.md,
    lineHeight: size.md * lineHeight.snug,
  },

  // Meta / timestamps
  meta: {
    fontFamily: family.regular,
    fontSize:   size.sm,
    lineHeight: size.sm * lineHeight.normal,
  },
  caption: {
    fontFamily: family.regular,
    fontSize:   size.xs,
    lineHeight: size.xs * lineHeight.normal,
  },
} as const

// ─── Composed export ──────────────────────────────────────────────────────────

export const typography = {
  family,
  weight,
  size,
  lineHeight,
  letterSpacing,
  textStyles,
} as const

export type Typography = typeof typography

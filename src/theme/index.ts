// ─────────────────────────────────────────────────────────────────────────────
// Vanta — Theme barrel
//
// Every theme token lives in its own file and is re-exported here.
// Consumers import from '@/theme' and get everything.
//
// Usage:
//   import { colors, typography, spacing, radius, shadows, motion } from '@/theme'
//   import type { AppMode } from '@/theme'
// ─────────────────────────────────────────────────────────────────────────────

export {
  colors,
  palette,
  brand,
  surface,
  text,
  semantic,
  docTypeColors,
  scanColors,
} from './colors'
export type { Colors } from './colors'

export {
  typography,
  family,
  weight,
  size,
  lineHeight,
  letterSpacing,
  textStyles,
} from './typography'
export type { Typography } from './typography'

export { spacing } from './spacing'
export type { Spacing } from './spacing'

export { radius } from './radius'
export type { Radius } from './radius'

export { shadows } from './shadows'
export type { ShadowLevel } from './shadows'

export { motion, duration, easing, spring } from './motion'
export type { Motion } from './motion'

// ─── Convenience: the full composed theme object ──────────────────────────────

import { colors }     from './colors'
import { typography } from './typography'
import { spacing }    from './spacing'
import { radius }     from './radius'
import { shadows }    from './shadows'
import { motion }     from './motion'

export const vantaTheme = {
  colors,
  typography,
  spacing,
  radius,
  shadows,
  motion,
} as const

export type VantaTheme = typeof vantaTheme

// ─── AppMode ──────────────────────────────────────────────────────────────────
export type AppMode = 'student' | 'business'

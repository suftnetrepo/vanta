// ─────────────────────────────────────────────────────────────────────────────
// Vanta — useTheme
//
// Convenience hook that returns the full vantaTheme object.
// Avoids importing the same 5 tokens at the top of every component.
//
// Usage:
//   const { colors, spacing, radius, typography } = useTheme()
// ─────────────────────────────────────────────────────────────────────────────

import { vantaTheme } from '@/theme'
import type { VantaTheme } from '@/theme'

export function useTheme(): VantaTheme {
  // Currently returns the static token object.
  // When dark-mode support is added, swap this for a context value
  // that resolves the correct color palette per color scheme.
  return vantaTheme
}

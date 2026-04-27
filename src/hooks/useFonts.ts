// ─────────────────────────────────────────────────────────────────────────────
// Vanta — useFonts
//
// Loads all Inter font weights from assets/fonts/ via expo-font.
// The font family name strings here MUST match typography.family exactly.
//
// Usage in App.tsx:
//   const { fontsLoaded, fontError } = useFonts()
//   if (!fontsLoaded && !fontError) return null  // splash screen holds
// ─────────────────────────────────────────────────────────────────────────────

import * as ExpoFont from 'expo-font'
import { family } from '@/theme'

// Map every family name to its asset path.
// Paths are relative to the project root (where app.json lives).
const FONT_MAP = {
  [family.regular]:  require('../../assets/fonts/Inter-Regular.ttf'),
  [family.medium]:   require('../../assets/fonts/Inter-Medium.ttf'),
  [family.semiBold]: require('../../assets/fonts/Inter-SemiBold.ttf'),
  [family.bold]:     require('../../assets/fonts/Inter-Bold.ttf'),
} as const

export interface UseFontsResult {
  // true once all fonts are loaded and ready to use
  fontsLoaded: boolean

  // non-null if any font failed to load — show fallback UI
  fontError: Error | null
}

export function useFonts(): UseFontsResult {
  const [fontsLoaded, fontError] = ExpoFont.useFonts(FONT_MAP)
  return { fontsLoaded, fontError }
}

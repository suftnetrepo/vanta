// ─────────────────────────────────────────────────────────────────────────────
// Vanta — Color tokens
// Single source of truth for every color used in the app.
// All values derived from fluent-styles palettes where possible.
// Rule: never import this file and hard-code a hex anywhere else.
// ─────────────────────────────────────────────────────────────────────────────

import { theme, palettes } from 'fluent-styles'

// ─── Raw palette references ──────────────────────────────────────────────────
// Expose the fluent-styles scales we actually use so the rest of the app
// never needs to import from fluent-styles directly for colors.

export const palette = {
  // Violet — student mode accent
  violet: theme.colors.violet,

  // Teal — business mode accent
  teal: theme.colors.teal,

  // Neutrals
  gray:  theme.colors.gray,
  white: palettes.white,
  black: palettes.black,

  // Semantic scales
  green:  theme.colors.green,
  amber:  theme.colors.amber,
  red:    theme.colors.red,
  blue:   theme.colors.blue,
  indigo: theme.colors.indigo,
  rose:   theme.colors.rose,
} as const

// ─── Brand ───────────────────────────────────────────────────────────────────

export const brand = {
  // Primary action — near-black, works on both light + dark surfaces
  primary:     '#111111',
  primarySoft: palette.gray[800],

  white: palette.white,
  black: palette.black,
} as const

// ─── Student mode ────────────────────────────────────────────────────────────
// Violet family. Deep surface for camera screens, lighter for UI.

export const studentColors = {
  // Scan button + dark surfaces
  scanSurface:    '#26215C',

  // Accent shades used in components
  accent:         palette.violet[500],   // '#8b5cf6' — icon fills, active states
  accentStrong:   palette.violet[600],   // '#7c3aed' — pressed states
  accentLight:    palette.violet[100],   // '#ede9fe' — icon backgrounds
  accentMid:      palette.violet[300],   // '#c4b5fd' — borders, dividers
  accentSubtle:   palette.violet[50],    // '#f5f3ff' — pill backgrounds

  // Text on accent backgrounds
  accentText:     palette.violet[800],   // '#5b21b6' — text on violet[50/100]
  accentTextDark: palette.violet[900],   // '#4c1d95' — text on violet[200]

  // Mode pill
  pillBg:         palette.violet[50],
  pillBorder:     palette.violet[200],
  pillText:       palette.violet[800],

  // Document type badge
  badgeBg:        palette.violet[50],
  badgeText:      palette.violet[800],
} as const

// ─── Business mode ───────────────────────────────────────────────────────────
// Teal family.

export const businessColors = {
  scanSurface:    '#04342C',

  accent:         palette.teal[500],    // '#14b8a6'
  accentStrong:   palette.teal[600],    // '#0d9488'
  accentLight:    palette.teal[100],    // '#ccfbf1'
  accentMid:      palette.teal[300],    // '#5eead4'
  accentSubtle:   palette.teal[50],     // '#f0fdfa'

  accentText:     palette.teal[800],    // '#115e59'
  accentTextDark: palette.teal[900],    // '#134e4a'

  pillBg:         palette.teal[50],
  pillBorder:     palette.teal[200],
  pillText:       palette.teal[800],

  badgeBg:        palette.teal[50],
  badgeText:      palette.teal[800],
} as const

// ─── Surface & background ────────────────────────────────────────────────────

export const surface = {
  // Page backgrounds
  page:      palette.gray[50],   // '#f9fafb' — screen background
  card:      palette.white,      // elevated cards
  secondary: palette.gray[100],  // '#f4f4f5' — input fills, chips
  tertiary:  palette.gray[200],  // '#e4e4e7' — dividers, skeletons

  // Borders
  border:      palette.gray[200],
  borderLight: palette.gray[100],
  borderStrong: palette.gray[300],

  // Overlays
  overlay:    'rgba(0,0,0,0.45)',
  overlayDark:'rgba(0,0,0,0.65)',

  // Camera screen
  camera:        '#0f0f0f',
  cameraOverlay: 'rgba(0,0,0,0.35)',

  // Crop screen
  cropBg:    '#141414',
  cropCanvas:'#1e1e1e',
} as const

// ─── Text ────────────────────────────────────────────────────────────────────

export const text = {
  primary:   palette.gray[900],  // '#18181b' — headings, primary body
  secondary: palette.gray[500],  // '#71717a' — subtitles, meta
  tertiary:  palette.gray[400],  // '#a1a1aa' — hints, placeholders
  disabled:  palette.gray[300],  // '#d4d4d8' — disabled state
  inverse:   palette.white,      // text on dark backgrounds
  link:      palette.blue[600],  // '#2563eb' — tappable links
} as const

// ─── Semantic / status ───────────────────────────────────────────────────────

export const semantic = {
  success:   palette.green[500],
  successBg: palette.green[50],
  successText: palette.green[800],

  warning:   palette.amber[500],
  warningBg: palette.amber[50],
  warningText: palette.amber[800],

  error:     palette.red[500],
  errorBg:   palette.red[50],
  errorText:  palette.red[800],

  info:      palette.blue[500],
  infoBg:    palette.blue[50],
  infoText:  palette.blue[800],
} as const

// ─── Document type badge colors ───────────────────────────────────────────────
// Using explicit hex values — palette scale keys from fluent-styles are not
// guaranteed to match Tailwind-style numeric keys (50, 100, 800 etc.)

export const docTypeColors = {
  // Student types
  notes:    { bg: '#F5F3FF', text: '#5B21B6' },   // violet-50 / violet-800
  assign:   { bg: '#FFFBEB', text: '#92400E' },   // amber-50  / amber-800
  reading:  { bg: '#F0FDFA', text: '#115E59' },   // teal-50   / teal-800

  // Business types
  receipt:  { bg: '#F0FDFA', text: '#115E59' },   // teal-50   / teal-800
  invoice:  { bg: '#FFFBEB', text: '#92400E' },   // amber-50  / amber-800
  contract: { bg: '#EFF6FF', text: '#1E40AF' },   // blue-50   / blue-800

  // Shared
  other:    { bg: '#F4F4F5', text: '#3F3F46' },   // gray-100  / gray-700
  pdf:      { bg: '#FFF1F2', text: '#9F1239' },   // rose-50   / rose-800
} as const

// ─── Camera / scan UI colors ──────────────────────────────────────────────────

export const scanColors = {
  // Viewfinder corner markers + detected state
  cornerActive:   '#4ADE80',  // green — document detected
  cornerIdle:     'rgba(255,255,255,0.6)',

  // Crop grid lines
  cropGrid:       'rgba(74,222,128,0.25)',
  cropBorder:     '#4ADE80',

  // Confirm button on dark screens
  confirmBtn:     '#4ADE80',
  confirmBtnText: '#0a2e14',

  // Controls
  controlBg:      'rgba(255,255,255,0.07)',
  controlBorder:  'rgba(255,255,255,0.1)',
  controlText:    'rgba(255,255,255,0.5)',
  controlTextActive: '#4ADE80',
} as const

// ─── Composed theme.colors object (for convenience) ──────────────────────────
// Mirrors the shape consumers expect: colors.student.accent etc.

export const colors = {
  palette,
  brand,
  student:  studentColors,
  business: businessColors,
  surface,
  text,
  semantic,
  docType:  docTypeColors,
  scan:     scanColors,
} as const

export type Colors = typeof colors
// ─────────────────────────────────────────────────────────────────────────────
// Vanta — useMode
//
// Returns mode state and the resolved color palette for the current mode.
// Every component that needs to respond to student/business mode uses this.
//
// Usage:
//   const { mode, isStudent, modeColors, setMode } = useMode()
// ─────────────────────────────────────────────────────────────────────────────

import { useContext } from 'react'
import { ModeContext } from '@/store/ModeContext'
import { colors } from '@/theme'
import type { AppMode } from '@/theme'

export interface UseModeResult {
  mode:        AppMode
  isStudent:   boolean
  isBusiness:  boolean
  setMode:     (m: AppMode) => void

  // The resolved color palette for the current mode.
  // Components use modeColors.accent, modeColors.pillBg etc.
  modeColors: typeof colors.student | typeof colors.business
}

export function useMode(): UseModeResult {
  const ctx = useContext(ModeContext)

  if (!ctx) {
    throw new Error('useMode must be used inside <ModeProvider>')
  }

  return {
    mode:        ctx.mode,
    isStudent:   ctx.mode === 'student',
    isBusiness:  ctx.mode === 'business',
    setMode:     ctx.setMode,
    modeColors:  ctx.mode === 'student' ? colors.student : colors.business,
  }
}

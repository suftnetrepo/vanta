// ─────────────────────────────────────────────────────────────────────────────
// Vanta — ModeContext
//
// Provides student/business mode to the entire app.
// children typed as CompatNode (React 18/19 fix per project rules).
// ─────────────────────────────────────────────────────────────────────────────

import React, { createContext, useState } from 'react'
import type { AppMode } from '@/theme'

export interface ModeContextValue {
  mode:    AppMode
  setMode: (m: AppMode) => void
}

export const ModeContext = createContext<ModeContextValue | null>(null)

interface Props {
  children: React.ReactNode
  initial?: AppMode
}

export function ModeProvider({ children, initial = 'student' }: Props) {
  const [mode, setMode] = useState<AppMode>(initial)

  return (
    <ModeContext.Provider value={{ mode, setMode }}>
      {children}
    </ModeContext.Provider>
  )
}

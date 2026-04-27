// ─────────────────────────────────────────────────────────────────────────────
// Vanta — DocumentContext
// Recent scans state — populated as screens are built.
// ─────────────────────────────────────────────────────────────────────────────

import React, { createContext, useContext, useState } from 'react'
import type { ScanResult } from '@/types'

interface DocumentContextValue {
  documents:   ScanResult[]
  addDocument: (doc: ScanResult) => void
  removeDocument: (id: string) => void
}

const DocumentContext = createContext<DocumentContextValue | null>(null)

interface Props { children: React.ReactNode }

export function DocumentProvider({ children }: Props) {
  const [documents, setDocuments] = useState<ScanResult[]>([])

  function addDocument(doc: ScanResult) {
    setDocuments((prev) => [doc, ...prev])
  }

  function removeDocument(id: string) {
    setDocuments((prev) => prev.filter((d) => d.id !== id))
  }

  return (
    <DocumentContext.Provider value={{ documents, addDocument, removeDocument }}>
      {children}
    </DocumentContext.Provider>
  )
}

export function useDocuments() {
  const ctx = useContext(DocumentContext)
  if (!ctx) throw new Error('useDocuments must be used inside <DocumentProvider>')
  return ctx
}

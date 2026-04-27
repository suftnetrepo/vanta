// ─────────────────────────────────────────────────────────────────────────────
// Vanta — Shared types (final)
// ─────────────────────────────────────────────────────────────────────────────

// ─── Document ─────────────────────────────────────────────────────────────────

export type StudentDocType  = 'notes' | 'assign' | 'reading'
export type BusinessDocType = 'receipt' | 'invoice' | 'contract'
export type DocType = StudentDocType | BusinessDocType | 'other' | 'pdf'

export interface ScanResult {
  id:         string
  name:       string
  docType:    DocType
  pages:      number
  createdAt:  Date
  uri:        string
  ocrText?:   string
  folderKey?: string
  meta?:      Record<string, string>
}

export interface Folder {
  key:      string
  label:    string
  docCount: number
  mode:     'student' | 'business' | 'shared'
}

// ─── Navigation ───────────────────────────────────────────────────────────────

export type RootStackParamList = {
  // Auth / onboarding
  Onboarding:     undefined
  StudentHome:    undefined
  BusinessHome:   undefined

  // Main shell (tab navigator)
  Main:           undefined

  // Tab screens (also reachable from stack for deep links)
  Library:        undefined
  Profile:        undefined

  // Scan flow
  Camera:         undefined
  Crop:           { uri: string }
  TagSave:        { uri: string; croppedUri: string }

  // Detail screens
  DocDetail:      { docId: string }
  FolderDetail:   { folderKey: string }

  // Settings
  Settings:       undefined

  // Dev
  DemoComponents: undefined
}

export type TabParamList = {
  Home:    undefined
  Library: undefined
  History: undefined
  Profile: undefined
}

// ─── Export ───────────────────────────────────────────────────────────────────

export type ExportDestination =
  | 'pdf'
  | 'google_drive'
  | 'notion'
  | 'apple_notes'
  | 'dropbox'

// ─── Services ─────────────────────────────────────────────────────────────────

export interface OcrResult {
  text:       string
  lines:      string[]
  confidence: number
}

export interface ExtractedInvoiceFields {
  vendor?:        string
  total?:         string
  date?:          string
  vatAmount?:     string
  invoiceNumber?: string
}

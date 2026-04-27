// ─────────────────────────────────────────────────────────────────────────────
// Vanta — Storage Service
//
// Persists scanned documents to the device file system.
// Index stored in AsyncStorage, files in FileSystem.documentDirectory.
//
// Install:
//   yarn add @react-native-async-storage/async-storage expo-file-system
// ─────────────────────────────────────────────────────────────────────────────

import AsyncStorage from '@react-native-async-storage/async-storage'
import * as FileSystem from 'expo-file-system'
import type { ScanResult } from '@/types'

const INDEX_KEY     = 'vanta:docs:index'
const DOCS_DIR      = `${FileSystem.documentDirectory}vanta-docs/`

// ── Ensure docs directory exists ──────────────────────────────────────────────
async function ensureDir() {
  const info = await FileSystem.getInfoAsync(DOCS_DIR)
  if (!info.exists) {
    await FileSystem.makeDirectoryAsync(DOCS_DIR, { intermediates: true })
  }
}

// ── Index helpers ─────────────────────────────────────────────────────────────
async function readIndex(): Promise<ScanResult[]> {
  try {
    const raw = await AsyncStorage.getItem(INDEX_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

async function writeIndex(docs: ScanResult[]): Promise<void> {
  await AsyncStorage.setItem(INDEX_KEY, JSON.stringify(docs))
}

// ── Public API ────────────────────────────────────────────────────────────────
export const storageService = {

  /**
   * Save a captured photo URI as a permanent document.
   * Copies the temp file to app documents directory and stores metadata.
   */
  async saveDocument(doc: ScanResult): Promise<ScanResult> {
    await ensureDir()

    const ext     = doc.uri.split('.').pop() ?? 'jpg'
    const destUri = `${DOCS_DIR}${doc.id}.${ext}`

    // Copy from temp camera path to permanent location
    if (doc.uri !== destUri) {
      await FileSystem.copyAsync({ from: doc.uri, to: destUri })
    }

    const saved: ScanResult = { ...doc, uri: destUri }

    const index = await readIndex()
    const existing = index.findIndex((d) => d.id === doc.id)
    if (existing >= 0) {
      index[existing] = saved
    } else {
      index.unshift(saved)   // newest first
    }
    await writeIndex(index)

    return saved
  },

  /** Load all documents, newest first. */
  async loadDocuments(): Promise<ScanResult[]> {
    return readIndex()
  },

  /** Load documents for a specific folder. */
  async loadFolder(folderKey: string): Promise<ScanResult[]> {
    const all = await readIndex()
    return all.filter((d) => d.folderKey === folderKey)
  },

  /** Update document metadata (name, type, folder) without re-copying the file. */
  async updateDocument(id: string, patch: Partial<ScanResult>): Promise<void> {
    const index = await readIndex()
    const i = index.findIndex((d) => d.id === id)
    if (i >= 0) {
      index[i] = { ...index[i], ...patch }
      await writeIndex(index)
    }
  },

  /** Delete a document — removes file + index entry. */
  async deleteDocument(id: string): Promise<void> {
    const index   = await readIndex()
    const doc     = index.find((d) => d.id === id)

    if (doc) {
      // Delete physical file
      try {
        const info = await FileSystem.getInfoAsync(doc.uri)
        if (info.exists) await FileSystem.deleteAsync(doc.uri)
      } catch (e) {
        console.warn('[Vanta] deleteDocument file error:', e)
      }
    }

    const updated = index.filter((d) => d.id !== id)
    await writeIndex(updated)
  },

  /** Get total storage used in bytes. */
  async getStorageInfo(): Promise<{ usedBytes: number; docCount: number }> {
    await ensureDir()
    try {
      const info = await FileSystem.getInfoAsync(DOCS_DIR, { size: true })
      const index = await readIndex()
      return {
        usedBytes: (info as any).size ?? 0,
        docCount:  index.length,
      }
    } catch {
      return { usedBytes: 0, docCount: 0 }
    }
  },

  /** Clear all documents and index — used by "Clear cache" in settings. */
  async clearAll(): Promise<void> {
    await AsyncStorage.removeItem(INDEX_KEY)
    try {
      await FileSystem.deleteAsync(DOCS_DIR, { idempotent: true })
    } catch (e) {
      console.warn('[Vanta] clearAll error:', e)
    }
  },
}

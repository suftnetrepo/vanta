// ─────────────────────────────────────────────────────────────────────────────
// Vanta — Export Service
//
// Handles exporting scanned documents to various destinations.
//
// Dependencies (install when activating each destination):
//   PDF:          expo-print, expo-sharing
//   Google Drive: expo-auth-session + Google Drive REST API
//   Notion:       fetch + Notion API
//   Apple Notes:  Linking (opens Notes with share sheet)
// ─────────────────────────────────────────────────────────────────────────────

import { Linking, Share } from 'react-native'
import type { ScanResult, ExportDestination } from '@/types'

// Lazy imports — prevent crash if packages aren't installed
let Print: any    = null
let Sharing: any  = null
try { Print   = require('expo-print')    } catch { /* not installed */ }
try { Sharing = require('expo-sharing') } catch { /* not installed */ }

export const exportService = {

  /**
   * Export a document to the requested destination.
   * Falls back to the native share sheet if the destination isn't configured.
   */
  async export(doc: ScanResult, destination: ExportDestination): Promise<void> {
    switch (destination) {
      case 'pdf':
        return exportService.exportAsPDF(doc)
      case 'google_drive':
        return exportService.exportToGoogleDrive(doc)
      case 'notion':
        return exportService.exportToNotion(doc)
      case 'apple_notes':
        return exportService.exportToAppleNotes(doc)
      default:
        return exportService.shareNative(doc)
    }
  },

  /** Generate a PDF from the scanned image and share/save it. */
  async exportAsPDF(doc: ScanResult): Promise<void> {
    if (!Print || !Sharing) {
      // Fallback: share the raw image file
      return exportService.shareNative(doc)
    }
    try {
      const { uri } = await Print.printToFileAsync({
        html: `
          <html><body style="margin:0;padding:0;">
            <img src="${doc.uri}" style="width:100%;height:auto;" />
            ${doc.ocrText ? `<pre style="font-size:12px;padding:16px;">${doc.ocrText}</pre>` : ''}
          </body></html>
        `,
        base64: false,
      })
      await Sharing.shareAsync(uri, {
        mimeType: 'application/pdf',
        dialogTitle: `Export ${doc.name}`,
      })
    } catch (e) {
      console.error('[Vanta] exportAsPDF failed:', e)
      return exportService.shareNative(doc)
    }
  },

  /**
   * Upload to Google Drive via REST API.
   * Requires OAuth token from expo-auth-session.
   * TODO: implement full OAuth flow in production.
   */
  async exportToGoogleDrive(doc: ScanResult): Promise<void> {
    // Placeholder — open Drive in browser as fallback
    await Linking.openURL('https://drive.google.com')
  },

  /**
   * Create a Notion page with OCR text and image attachment.
   * Requires Notion integration token stored in secure storage.
   * TODO: implement Notion API call in production.
   */
  async exportToNotion(doc: ScanResult): Promise<void> {
    // Placeholder — open Notion as fallback
    await Linking.openURL('notion://').catch(() =>
      Linking.openURL('https://notion.so')
    )
  },

  /**
   * Share to Apple Notes via the native share sheet.
   * iOS will offer "Add to Notes" in the share options.
   */
  async exportToAppleNotes(doc: ScanResult): Promise<void> {
    return exportService.shareNative(doc)
  },

  /** Native iOS/Android share sheet — universal fallback. */
  async shareNative(doc: ScanResult): Promise<void> {
    try {
      await Share.share({
        title:   doc.name,
        url:     doc.uri,
        message: doc.ocrText ?? doc.name,
      })
    } catch (e) {
      console.error('[Vanta] shareNative failed:', e)
    }
  },
}

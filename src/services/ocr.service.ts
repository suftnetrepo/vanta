// ─────────────────────────────────────────────────────────────────────────────
// Vanta — OCR Service
//
// Wraps react-native-mlkit-ocr for text recognition on captured images.
// Install: yarn add react-native-mlkit-ocr
//          npx pod-install
//
// Usage:
//   const result = await ocrService.recognize('file:///path/to/image.jpg')
// ─────────────────────────────────────────────────────────────────────────────

import type { OcrResult } from '@/types'

// Lazy import — prevents crash if mlkit-ocr isn't installed yet
let MlkitOcr: any = null
try {
  MlkitOcr = require('react-native-mlkit-ocr').default
} catch {
  console.warn('[Vanta] react-native-mlkit-ocr not installed — OCR disabled')
}

export const ocrService = {
  /**
   * Recognise text in an image file.
   * Returns null if OCR is unavailable (module not installed, or failed).
   */
  async recognize(imageUri: string): Promise<OcrResult | null> {
    if (!MlkitOcr) return null
    try {
      const result = await MlkitOcr.detectFromUri(imageUri)
      const lines  = result.map((block: any) => block.text)
      const text   = lines.join('\n')
      return {
        text,
        lines,
        confidence: 1,   // MLKit doesn't expose per-result confidence
      }
    } catch (e) {
      console.error('[Vanta] OCR failed:', e)
      return null
    }
  },

  /**
   * Extract invoice fields from OCR text using simple regex patterns.
   * Replace with an LLM call (Claude API) for higher accuracy in production.
   */
  extractInvoiceFields(text: string) {
    const totalMatch  = text.match(/(?:total|amount|sum)[:\s£$€]*([\d,]+\.?\d{0,2})/i)
    const dateMatch   = text.match(/(\d{1,2}[/\-\.]\d{1,2}[/\-\.]\d{2,4})/i)
    const vendorMatch = text.match(/^(.+?)(?:\n|invoice|receipt)/im)
    const vatMatch    = text.match(/(?:vat|tax)[:\s£$€]*([\d,]+\.?\d{0,2})/i)

    return {
      total:     totalMatch  ? totalMatch[1]  : undefined,
      date:      dateMatch   ? dateMatch[1]   : undefined,
      vendor:    vendorMatch ? vendorMatch[1].trim() : undefined,
      vatAmount: vatMatch    ? vatMatch[1]    : undefined,
    }
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// Vanta — useCamera hook (expo-camera)
//
// expo-camera ~15.0.16 — bundled with Expo 51, zero extra native setup.
// Supports: photo capture, barcode scanning, flash, front/back switch.
// ─────────────────────────────────────────────────────────────────────────────

import { useRef, useCallback } from 'react'
import {
  CameraView,
  useCameraPermissions,
  type CameraType,
  type FlashMode,
  type BarcodeScanningResult,
} from 'expo-camera'

export type ScannedCode = {
  value: string
  type:  string
}

interface UseCameraOptions {
  onCodeScanned?: (codes: ScannedCode[]) => void
}

export function useCamera({ onCodeScanned }: UseCameraOptions = {}) {
  const cameraRef = useRef<CameraView>(null)
  const [permission, requestPermission] = useCameraPermissions()

  const hasPermission = permission?.granted ?? false

  // ── Barcode scan callback ─────────────────────────────────────────────────
  function handleBarcodeScanned(result: BarcodeScanningResult) {
    if (!onCodeScanned) return
    onCodeScanned([{ value: result.data, type: result.type }])
  }

  // ── Photo capture ─────────────────────────────────────────────────────────
  const takePhoto = useCallback(
    async (flash: 'on' | 'off' = 'off'): Promise<string | null> => {
      if (!cameraRef.current) return null
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality:         0.9,
          skipProcessing:  false,
        })
        return photo?.uri ?? null
      } catch (e) {
        console.error('[Vanta] takePhoto failed:', e)
        return null
      }
    },
    []
  )

  return {
    cameraRef,
    hasPermission,
    requestPermission,
    takePhoto,
    handleBarcodeScanned,
  }
}

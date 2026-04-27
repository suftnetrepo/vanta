import React, { useState, useRef } from 'react'
import { Animated, Linking, StyleSheet } from 'react-native'
import { CameraView } from 'expo-camera'
import { StyledPage, StyledPressable, Stack, StyledText } from 'fluent-styles'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { RootStackParamList } from '@/types'
import { useCamera } from '@/hooks/useCamera'
import { colors, spacing, radius, typography } from '@/theme'

type Props = NativeStackScreenProps<RootStackParamList, 'Camera'>
type ScanMode = 'barcode' | 'document' | 'photo'

const MODES: { key: ScanMode; label: string }[] = [
  { key: 'barcode',  label: 'Barcode'  },
  { key: 'document', label: 'Document' },
  { key: 'photo',    label: 'Photo'    },
]

// ─── Corner marker — correct L-shape ─────────────────────────────────────────

function CornerMarker({ position, color }: {
  position: 'tl' | 'tr' | 'bl' | 'br'
  color: string
}) {
  const ARM = 24   // arm length
  const THK = 3    // stroke thickness
  const BR  = 3    // border radius on outer corner
  const isTop  = position === 'tl' || position === 'tr'
  const isLeft = position === 'tl' || position === 'bl'

  return (
    <Stack
      position="absolute"
      width={ARM}
      height={ARM}
      top={isTop ? 0 : undefined}
      bottom={!isTop ? 0 : undefined}
      left={isLeft ? 0 : undefined}
      right={!isLeft ? 0 : undefined}
    >
      {/* Horizontal arm */}
      <Stack
        position="absolute"
        width={ARM}
        height={THK}
        backgroundColor={color}
        top={isTop ? 0 : undefined}
        bottom={!isTop ? 0 : undefined}
        left={isLeft ? 0 : undefined}
        right={!isLeft ? 0 : undefined}
        borderTopLeftRadius={isTop && isLeft ? BR : 0}
        borderTopRightRadius={isTop && !isLeft ? BR : 0}
        borderBottomLeftRadius={!isTop && isLeft ? BR : 0}
        borderBottomRightRadius={!isTop && !isLeft ? BR : 0}
      />
      {/* Vertical arm */}
      <Stack
        position="absolute"
        width={THK}
        height={ARM}
        backgroundColor={color}
        top={isTop ? 0 : undefined}
        bottom={!isTop ? 0 : undefined}
        left={isLeft ? 0 : undefined}
        right={!isLeft ? 0 : undefined}
        borderTopLeftRadius={isTop && isLeft ? BR : 0}
        borderTopRightRadius={isTop && !isLeft ? BR : 0}
        borderBottomLeftRadius={!isTop && isLeft ? BR : 0}
        borderBottomRightRadius={!isTop && !isLeft ? BR : 0}
      />
    </Stack>
  )
}

// ─── Viewfinder box — uses onLayout for accurate dimensions ──────────────────

function ViewfinderBox({ detected, children }: { detected: boolean; children?: React.ReactNode }) {
  const [camSize, setCamSize] = React.useState({ width: 0, height: 0 })
  const INSET_H = 24   // px from edge of camera area to viewfinder edge
  const INSET_V = 56   // px from top/bottom of camera area

  const borderColor = detected ? colors.scan.cornerActive : colors.scan.cornerIdle
  const ARM = 24
  const THK = 3

  return (
    <Stack
      flex={1}
      position="relative"
      onLayout={(e) => setCamSize({ width: e.nativeEvent.layout.width, height: e.nativeEvent.layout.height })}
    >
      {children}
      {camSize.width > 0 && (
        <>
          {/* Dim overlays */}
          <Stack position="absolute" top={0} left={0} right={0} height={INSET_V} backgroundColor={colors.surface.cameraOverlay} />
          <Stack position="absolute" bottom={0} left={0} right={0} height={INSET_V} backgroundColor={colors.surface.cameraOverlay} />
          <Stack position="absolute" top={INSET_V} bottom={INSET_V} left={0} width={INSET_H} backgroundColor={colors.surface.cameraOverlay} />
          <Stack position="absolute" top={INSET_V} bottom={INSET_V} right={0} width={INSET_H} backgroundColor={colors.surface.cameraOverlay} />

          {/* TL corner */}
          <Stack position="absolute" top={INSET_V} left={INSET_H}>
            <Stack position="absolute" top={0} left={0} width={ARM} height={THK} borderRadius={1} backgroundColor={borderColor} />
            <Stack position="absolute" top={0} left={0} width={THK} height={ARM} borderRadius={1} backgroundColor={borderColor} />
          </Stack>

          {/* TR corner */}
          <Stack position="absolute" top={INSET_V} right={INSET_H}>
            <Stack position="absolute" top={0} right={0} width={ARM} height={THK} borderRadius={1} backgroundColor={borderColor} />
            <Stack position="absolute" top={0} right={0} width={THK} height={ARM} borderRadius={1} backgroundColor={borderColor} />
          </Stack>

          {/* BL corner */}
          <Stack position="absolute" bottom={INSET_V} left={INSET_H}>
            <Stack position="absolute" bottom={0} left={0} width={ARM} height={THK} borderRadius={1} backgroundColor={borderColor} />
            <Stack position="absolute" bottom={0} left={0} width={THK} height={ARM} borderRadius={1} backgroundColor={borderColor} />
          </Stack>

          {/* BR corner */}
          <Stack position="absolute" bottom={INSET_V} right={INSET_H}>
            <Stack position="absolute" bottom={0} right={0} width={ARM} height={THK} borderRadius={1} backgroundColor={borderColor} />
            <Stack position="absolute" bottom={0} right={0} width={THK} height={ARM} borderRadius={1} backgroundColor={borderColor} />
          </Stack>
        </>
      )}
    </Stack>
  )
}

// ─── Mode tabs ────────────────────────────────────────────────────────────────

function ModeTabs({ active, onChange }: { active: ScanMode; onChange: (m: ScanMode) => void }) {
  return (
    <Stack flexDirection="row" backgroundColor="rgba(255,255,255,0.1)"
      borderRadius={radius.full} padding={3} gap={2}
    >
      {MODES.map((m) => (
        <StyledPressable key={m.key} onPress={() => onChange(m.key)}
          paddingHorizontal={spacing[3]} paddingVertical={6}
          borderRadius={radius.full}
          backgroundColor={active === m.key ? 'rgba(255,255,255,0.9)' : 'transparent'}
        >
          <StyledText
            fontFamily={active === m.key ? typography.family.semiBold : typography.family.regular}
            fontSize={typography.size.sm}
            color={active === m.key ? colors.brand.primary : 'rgba(255,255,255,0.65)'}
          >
            {m.label}
          </StyledText>
        </StyledPressable>
      ))}
    </Stack>
  )
}

function ControlBtn({ onPress, children }: { onPress: () => void; children: React.ReactNode }) {
  return (
    <StyledPressable onPress={onPress} width={36} height={36} borderRadius={radius.full}
      backgroundColor="rgba(255,255,255,0.12)" alignItems="center" justifyContent="center"
    >
      {children}
    </StyledPressable>
  )
}

function ShutterButton({ onPress, capturing }: { onPress: () => void; capturing: boolean }) {
  const scale = useRef(new Animated.Value(1)).current
  function handle() {
    Animated.sequence([
      Animated.timing(scale, { toValue: 0.92, duration: 80,  useNativeDriver: true }),
      Animated.timing(scale, { toValue: 1,    duration: 150, useNativeDriver: true }),
    ]).start()
    onPress()
  }
  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <StyledPressable onPress={handle} disabled={capturing}
        width={72} height={72} borderRadius={radius.full}
        borderWidth={3} borderColor="rgba(255,255,255,0.9)"
        alignItems="center" justifyContent="center"
      >
        <Stack width={56} height={56} borderRadius={radius.full}
          backgroundColor={capturing ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.95)'}
        />
      </StyledPressable>
    </Animated.View>
  )
}

function PermissionScreen({ onRequest }: { onRequest: () => void }) {
  return (
    <StyledPage flex={1} backgroundColor={colors.surface.camera} alignItems="center" justifyContent="center">
      <Stack alignItems="center" paddingHorizontal={spacing[8]} gap={spacing[4]}>
        <Stack width={80} height={80} borderRadius={radius.full}
          backgroundColor="rgba(255,255,255,0.08)" alignItems="center" justifyContent="center"
        >
          <StyledText fontSize={36}>📷</StyledText>
        </Stack>
        <StyledText fontFamily={typography.family.bold} fontSize={typography.size.h3}
          color={colors.brand.white} textAlign="center"
        >
          Camera access needed
        </StyledText>
        <StyledText fontFamily={typography.family.regular} fontSize={typography.size.base}
          color="rgba(255,255,255,0.6)" textAlign="center" lineHeight={22}
        >
          Vanta needs access to your camera to scan documents and barcodes.
        </StyledText>
        <Stack borderRadius={radius.lg} overflow="hidden">
          <StyledPressable onPress={onRequest}
            backgroundColor={colors.scan.confirmBtn}
            paddingVertical={spacing[4]} paddingHorizontal={spacing[8]}
            alignItems="center"
          >
            <StyledText fontFamily={typography.family.semiBold} fontSize={typography.size.lg}
              color={colors.scan.confirmBtnText}
            >
              Grant permission
            </StyledText>
          </StyledPressable>
        </Stack>
        <StyledPressable onPress={() => Linking.openSettings()}>
          <StyledText fontFamily={typography.family.regular} fontSize={typography.size.sm}
            color="rgba(255,255,255,0.4)"
          >
            Open settings instead
          </StyledText>
        </StyledPressable>
      </Stack>
    </StyledPage>
  )
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export function CameraScreen({ navigation }: Props) {
  const [mode, setMode]           = useState<ScanMode>('document')
  const [flash, setFlash]         = useState<'on' | 'off'>('off')
  const [capturing, setCapturing] = useState(false)
  const [detected, setDetected]   = useState(false)

  const { cameraRef, hasPermission, requestPermission, takePhoto, handleBarcodeScanned } =
    useCamera({
      onCodeScanned: (codes) => {
        if (mode !== 'barcode' || codes.length === 0) return
        navigation.navigate('TagSave', { uri: codes[0].value, croppedUri: codes[0].value })
      },
    })

  if (!hasPermission) return <PermissionScreen onRequest={requestPermission} />

  async function handleShutter() {
    if (capturing) return
    setCapturing(true)
    try {
      const uri = await takePhoto(flash)
      if (uri) navigation.navigate('Crop', { uri })
    } finally {
      setCapturing(false)
    }
  }

  return (
    <StyledPage flex={1} backgroundColor={colors.surface.camera}>

      {/* ── Top bar ── */}
      <Stack flexDirection="row" alignItems="center" justifyContent="space-between"
        paddingHorizontal={spacing[5]} paddingTop={spacing[4]} paddingBottom={spacing[3]}
      >
        <ControlBtn onPress={() => navigation.goBack()}>
          <StyledText fontFamily={typography.family.semiBold} fontSize={18}
            color={colors.brand.white}
          >✕</StyledText>
        </ControlBtn>
        <ModeTabs active={mode} onChange={setMode} />
        <ControlBtn onPress={() => setFlash(f => f === 'on' ? 'off' : 'on')}>
          <StyledText fontSize={16}
            color={flash === 'on' ? '#FFD60A' : 'rgba(255,255,255,0.7)'}
          >⚡</StyledText>
        </ControlBtn>
      </Stack>

      {/* ── Camera preview + viewfinder overlay ── */}
      <ViewfinderBox detected={detected}>
        <CameraView
          ref={cameraRef}
          style={StyleSheet.absoluteFill}
          facing="back"
          flash={flash}
          barcodeScannerSettings={
            mode === 'barcode'
              ? { barcodeTypes: ['qr', 'ean13', 'ean8', 'code128', 'code39', 'pdf417', 'aztec', 'datamatrix'] }
              : undefined
          }
          onBarcodeScanned={mode === 'barcode' ? handleBarcodeScanned : undefined}
        />
      </ViewfinderBox>

      {/* ── Guide text ── */}
      <Stack alignItems="center" paddingTop={spacing[2]} paddingBottom={spacing[1]}>
        <StyledText fontFamily={typography.family.regular} fontSize={typography.size.sm}
          color={detected ? colors.scan.cornerActive : 'rgba(255,255,255,0.5)'}
        >
          {mode === 'barcode' ? 'Point at a barcode or QR code'
            : capturing        ? 'Processing…'
            : detected         ? 'Document detected — hold steady'
            : 'Align document within the frame'}
        </StyledText>
      </Stack>

      {/* ── Bottom bar ── */}
      <Stack flexDirection="row" alignItems="center" justifyContent="space-around"
        paddingHorizontal={spacing[5]} paddingBottom={spacing[8]} paddingTop={spacing[3]}
      >
        <StyledPressable width={52} height={52} borderRadius={radius.lg}
          backgroundColor="rgba(255,255,255,0.08)" borderWidth={1.5}
          borderColor="rgba(255,255,255,0.15)" alignItems="center" justifyContent="center"
          onPress={() => navigation.navigate('Library')}
        >
          <StyledText fontSize={typography.size.xs} color="rgba(255,255,255,0.4)">IMG</StyledText>
        </StyledPressable>

        <ShutterButton onPress={handleShutter} capturing={capturing} />

        <StyledPressable width={52} height={52} borderRadius={radius.full}
          borderWidth={1.5} borderColor="rgba(255,255,255,0.3)"
          alignItems="center" justifyContent="center"
        >
          <Stack alignItems="center" gap={2}>
            <Stack flexDirection="row" gap={2}>
              <Stack width={7} height={9} borderRadius={1} borderWidth={1} borderColor="rgba(255,255,255,0.5)" />
              <Stack width={7} height={9} borderRadius={1} borderWidth={1} borderColor="rgba(255,255,255,0.5)" />
            </Stack>
            <StyledText fontSize={8} color="rgba(255,255,255,0.4)">MULTI</StyledText>
          </Stack>
        </StyledPressable>
      </Stack>
    </StyledPage>
  )
}

import React, { useState } from 'react'
import { StyledPage, StyledPressable, Stack, StyledText, StyledSpacer } from 'fluent-styles'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { RootStackParamList } from '@/types'
import { colors, spacing, radius, typography } from '@/theme'

type Props = NativeStackScreenProps<RootStackParamList, 'Crop'>
type CropTool = 'crop' | 'rotate' | 'brightness' | 'filter'

// ─── Tool icons ───────────────────────────────────────────────────────────────

function CropIcon({ active }: { active: boolean }) {
  const c = active ? colors.scan.cornerActive : 'rgba(255,255,255,0.5)'
  return (
    <Stack width={20} height={20} position="relative">
      <Stack position="absolute" top={0} left={0} width={8} height={2.5} borderRadius={1} backgroundColor={c} />
      <Stack position="absolute" top={0} left={0} width={2.5} height={8} borderRadius={1} backgroundColor={c} />
      <Stack position="absolute" bottom={0} right={0} width={8} height={2.5} borderRadius={1} backgroundColor={c} />
      <Stack position="absolute" bottom={0} right={0} width={2.5} height={8} borderRadius={1} backgroundColor={c} />
    </Stack>
  )
}

function RotateIcon({ active }: { active: boolean }) {
  const c = active ? colors.scan.cornerActive : 'rgba(255,255,255,0.5)'
  return (
    <Stack width={20} height={20} alignItems="center" justifyContent="center">
      <Stack width={13} height={13} borderRadius={6.5} borderWidth={2}
        borderColor={c} style={{ borderTopColor: 'transparent' }}
      />
      <Stack position="absolute" top={1} right={2} width={0} height={0}
        style={{ borderLeftWidth: 4, borderRightWidth: 4, borderBottomWidth: 6,
          borderLeftColor: 'transparent', borderRightColor: 'transparent', borderBottomColor: c }}
      />
    </Stack>
  )
}

function BrightnessIcon({ active }: { active: boolean }) {
  const c = active ? colors.scan.cornerActive : 'rgba(255,255,255,0.5)'
  return (
    <Stack width={20} height={20} alignItems="center" justifyContent="center">
      <Stack width={7} height={7} borderRadius={3.5} backgroundColor={c} />
      {[0, 45, 90, 135].map((deg) => (
        <Stack key={deg} position="absolute" width={2} height={3.5} borderRadius={1}
          backgroundColor={c}
          style={{ transform: [{ rotate: `${deg}deg` }, { translateY: -8 }] }}
        />
      ))}
    </Stack>
  )
}

function FilterIcon({ active }: { active: boolean }) {
  const c = active ? colors.scan.cornerActive : 'rgba(255,255,255,0.5)'
  return (
    <Stack width={20} height={18} gap={3}>
      <Stack flexDirection="row" gap={2} alignItems="center">
        <Stack flex={1} height={1.5} borderRadius={1} backgroundColor={c} />
        <Stack width={6} height={6} borderRadius={3} borderWidth={1.5} borderColor={c} />
        <Stack flex={1} height={1.5} borderRadius={1} backgroundColor={c} />
      </Stack>
      <Stack flexDirection="row" gap={2} alignItems="center">
        <Stack width={6} height={6} borderRadius={3} borderWidth={1.5} borderColor={c} />
        <Stack flex={1} height={1.5} borderRadius={1} backgroundColor={c} />
        <Stack flex={1} height={1.5} borderRadius={1} backgroundColor={c} />
      </Stack>
    </Stack>
  )
}

// ─── Crop canvas ──────────────────────────────────────────────────────────────

function CropCanvas() {
  const [size, setSize] = React.useState({ width: 0, height: 0 })
  // Dynamic margins based on actual canvas size
  const MH = size.width  > 0 ? Math.round(size.width  * 0.08) : 28
  const MV = size.height > 0 ? Math.round(size.height * 0.04) : 28
  const HANDLE = 20

  return (
    <Stack
      flex={1}
      margin={spacing[4]}
      backgroundColor={colors.surface.cropCanvas}
      borderRadius={radius.md}
      overflow="hidden"
      onLayout={(e) => setSize({ width: e.nativeEvent.layout.width, height: e.nativeEvent.layout.height })}
    >
      {/* Document simulation */}
      <Stack
        position="absolute"
        top={MV} left={MH} right={MH} bottom={MV}
        backgroundColor="#f5f0e8"
        borderRadius={3}
        padding={spacing[3]}
        gap={5}
      >
        <Stack height={7}  width="40%" borderRadius={2} backgroundColor="#8a8070" />
        <Stack height={4}  width="92%" borderRadius={2} backgroundColor="#c8c0b0" />
        <Stack height={4}  width="75%" borderRadius={2} backgroundColor="#c8c0b0" />
        <Stack height={4}  width="88%" borderRadius={2} backgroundColor="#c8c0b0" />
        <Stack height={4}  width="55%" borderRadius={2} backgroundColor="#c8c0b0" />
        <StyledSpacer height={4} />
        <Stack height={4}  width="90%" borderRadius={2} backgroundColor="#c8c0b0" />
        <Stack height={4}  width="70%" borderRadius={2} backgroundColor="#c8c0b0" />
        <Stack height={4}  width="60%" borderRadius={2} backgroundColor="#c8c0b0" />
        <Stack height={4}  width="85%" borderRadius={2} backgroundColor="#c8c0b0" />
        <StyledSpacer height={4} />
        <Stack flexDirection="row" gap={6}>
          <Stack flex={1} height={4} borderRadius={2} backgroundColor="#c8c0b0" />
          <Stack flex={1} height={4} borderRadius={2} backgroundColor="#c8c0b0" />
        </Stack>
      </Stack>

      {/* Crop border */}
      <Stack
        position="absolute"
        top={MV} left={MH} right={MH} bottom={MV}
        borderWidth={1.5}
        borderColor={colors.scan.cropBorder}
        borderRadius={3}
      />

      {/* Grid lines — only when we have size */}
      {size.width > 0 && (
        <Stack position="absolute" top={MV} left={MH} right={MH} bottom={MV}>
          <Stack position="absolute" left="33.3%" top={0} bottom={0} width={0.5} backgroundColor={colors.scan.cropGrid} />
          <Stack position="absolute" left="66.6%" top={0} bottom={0} width={0.5} backgroundColor={colors.scan.cropGrid} />
          <Stack position="absolute" top="33.3%" left={0} right={0} height={0.5} backgroundColor={colors.scan.cropGrid} />
          <Stack position="absolute" top="66.6%" left={0} right={0} height={0.5} backgroundColor={colors.scan.cropGrid} />
        </Stack>
      )}

      {/* Corner handles — offset so they sit centred on the crop border */}
      <Stack position="absolute" top={MV - HANDLE / 2} left={MH - HANDLE / 2}
        width={HANDLE} height={HANDLE} borderRadius={HANDLE / 2}
        backgroundColor={colors.brand.white} borderWidth={2.5} borderColor={colors.scan.cropBorder}
      />
      <Stack position="absolute" top={MV - HANDLE / 2} right={MH - HANDLE / 2}
        width={HANDLE} height={HANDLE} borderRadius={HANDLE / 2}
        backgroundColor={colors.brand.white} borderWidth={2.5} borderColor={colors.scan.cropBorder}
      />
      <Stack position="absolute" bottom={MV - HANDLE / 2} left={MH - HANDLE / 2}
        width={HANDLE} height={HANDLE} borderRadius={HANDLE / 2}
        backgroundColor={colors.brand.white} borderWidth={2.5} borderColor={colors.scan.cropBorder}
      />
      <Stack position="absolute" bottom={MV - HANDLE / 2} right={MH - HANDLE / 2}
        width={HANDLE} height={HANDLE} borderRadius={HANDLE / 2}
        backgroundColor={colors.brand.white} borderWidth={2.5} borderColor={colors.scan.cropBorder}
      />
    </Stack>
  )
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export function CropScreen({ navigation, route }: Props) {
  const [activeTool, setActiveTool] = useState<CropTool>('crop')

  const TOOLS = [
    { key: 'crop'       as CropTool, label: 'Crop',       Icon: () => <CropIcon       active={activeTool === 'crop'}       /> },
    { key: 'rotate'     as CropTool, label: 'Rotate',     Icon: () => <RotateIcon     active={activeTool === 'rotate'}     /> },
    { key: 'brightness' as CropTool, label: 'Brightness', Icon: () => <BrightnessIcon active={activeTool === 'brightness'} /> },
    { key: 'filter'     as CropTool, label: 'Filter',     Icon: () => <FilterIcon     active={activeTool === 'filter'}     /> },
  ]

  function handleDone() {
    navigation.navigate('TagSave', {
      uri:        route.params.uri,
      croppedUri: route.params.uri,   // in production: pass actual cropped file URI
    })
  }

  return (
    <StyledPage flex={1} backgroundColor={colors.surface.cropBg}>

      {/* ── Top bar ── */}
      <Stack flexDirection="row" alignItems="center" justifyContent="space-between"
        paddingHorizontal={spacing[5]} paddingTop={spacing[3]} paddingBottom={spacing[2]}
      >
        <StyledPressable onPress={() => navigation.goBack()} paddingVertical={spacing[2]}>
          <StyledText fontFamily={typography.family.medium} fontSize={typography.size.base}
            color="rgba(255,255,255,0.5)"
          >
            Retake
          </StyledText>
        </StyledPressable>
        <StyledText fontFamily={typography.family.semiBold} fontSize={typography.size.base}
          color={colors.brand.white}
        >
          Adjust crop
        </StyledText>
        <StyledPressable onPress={handleDone} paddingVertical={spacing[2]}>
          <StyledText fontFamily={typography.family.semiBold} fontSize={typography.size.base}
            color={colors.scan.cornerActive}
          >
            Done
          </StyledText>
        </StyledPressable>
      </Stack>

      {/* ── Crop canvas — fills remaining space ── */}
      <Stack flex={1}>
        <CropCanvas />
      </Stack>

      {/* ── Tool strip ── */}
      <Stack flexDirection="row" justifyContent="space-around"
        paddingHorizontal={spacing[5]} paddingVertical={spacing[3]}
      >
        {TOOLS.map((t) => (
          <StyledPressable key={t.key} onPress={() => setActiveTool(t.key)}
            alignItems="center" gap={spacing[1]}
          >
            <Stack
              width={52} height={52} borderRadius={radius.lg}
              alignItems="center" justifyContent="center"
              backgroundColor={activeTool === t.key ? 'rgba(74,222,128,0.15)' : colors.scan.controlBg}
              borderWidth={0.5}
              borderColor={activeTool === t.key ? 'rgba(74,222,128,0.5)' : colors.scan.controlBorder}
            >
              <t.Icon />
            </Stack>
            <StyledText fontFamily={typography.family.regular} fontSize={typography.size.xs}
              color={activeTool === t.key ? colors.scan.cornerActive : colors.scan.controlText}
            >
              {t.label}
            </StyledText>
          </StyledPressable>
        ))}
      </Stack>

      {/* ── Action row ── */}
      <Stack flexDirection="row" gap={spacing[3]}
        paddingHorizontal={spacing[5]} paddingBottom={spacing[8]} paddingTop={spacing[2]}
      >
        <Stack flex={1} borderRadius={radius.lg}
          backgroundColor="rgba(255,255,255,0.07)"
          borderWidth={0.5} borderColor="rgba(255,255,255,0.12)" overflow="hidden"
        >
          <StyledPressable onPress={() => navigation.goBack()}
            paddingVertical={spacing[4]} alignItems="center" justifyContent="center"
          >
            <StyledText fontFamily={typography.family.semiBold} fontSize={typography.size.base}
              color="rgba(255,255,255,0.7)"
            >
              Retake
            </StyledText>
          </StyledPressable>
        </Stack>

        <Stack flex={2} borderRadius={radius.lg}
          backgroundColor={colors.scan.confirmBtn} overflow="hidden"
        >
          <StyledPressable onPress={handleDone}
            paddingVertical={spacing[4]} alignItems="center" justifyContent="center"
          >
            <StyledText fontFamily={typography.family.semiBold} fontSize={typography.size.base}
              color={colors.scan.confirmBtnText}
            >
              Use this scan
            </StyledText>
          </StyledPressable>
        </Stack>
      </Stack>
    </StyledPage>
  )
}

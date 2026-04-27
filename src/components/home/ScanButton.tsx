import React from 'react'
import { Stack, StyledText, StyledPressable } from 'fluent-styles'
import { useMode } from '@/hooks/useMode'
import { colors, spacing, radius, typography } from '@/theme'

interface Props {
  onPress: () => void
}

export function ScanButton({ onPress }: Props) {
  const { isStudent } = useMode()

  const bgColor = isStudent
    ? colors.student.scanSurface
    : colors.business.scanSurface

  const label = isStudent ? 'Scan document' : 'Scan receipt or invoice'
  const sub   = isStudent ? 'Auto-crop + OCR ready' : 'Auto-extract totals + VAT'

  return (
    <StyledPressable
      onPress={onPress}
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      marginHorizontal={spacing[5]}
      marginTop={spacing[4]}
      paddingHorizontal={spacing[5]}
      paddingVertical={spacing[4]}
      borderRadius={radius.xl}
      backgroundColor={bgColor}
    >
      <Stack gap={3}>
        <StyledText
          fontFamily={typography.family.semiBold}
          fontSize={typography.size.lg}
          color={colors.brand.white}
        >
          {label}
        </StyledText>
        <StyledText
          fontFamily={typography.family.regular}
          fontSize={typography.size.sm}
          color="rgba(255,255,255,0.6)"
        >
          {sub}
        </StyledText>
      </Stack>

      {/* Icon box */}
      <Stack
        width={40}
        height={40}
        borderRadius={radius.lg}
        backgroundColor="rgba(255,255,255,0.12)"
        alignItems="center"
        justifyContent="center"
      >
        <StyledText fontSize={18} color={colors.brand.white}>⊡</StyledText>
      </Stack>
    </StyledPressable>
  )
}

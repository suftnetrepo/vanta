import React from 'react'
import { Stack, StyledText } from 'fluent-styles'
import { colors, spacing, radius, typography } from '@/theme'

interface Props {
  label:    string
  value:    string
  sub:      string
}

export function StatCard({ label, value, sub }: Props) {
  return (
    <Stack
      flex={1}
      backgroundColor={colors.surface.secondary}
      borderRadius={radius.lg}
      padding={spacing[3]}
      borderWidth={0.5}
      borderColor={colors.surface.border}
      gap={2}
    >
      <StyledText
        fontFamily={typography.family.regular}
        fontSize={typography.size.xs}
        color={colors.text.secondary}
      >
        {label}
      </StyledText>
      <StyledText
        fontFamily={typography.family.semiBold}
        fontSize={typography.size.h3}
        color={colors.text.primary}
      >
        {value}
      </StyledText>
      <StyledText
        fontFamily={typography.family.regular}
        fontSize={typography.size.xs}
        color={colors.text.secondary}
      >
        {sub}
      </StyledText>
    </Stack>
  )
}

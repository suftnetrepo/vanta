import React from 'react'
import { Stack, StyledText, StyledPressable } from 'fluent-styles'
import type { CompatNode } from 'fluent-styles'
import { colors, spacing, radius, typography } from '@/theme'

interface Props {
  icon:     CompatNode
  iconBg:   string
  label:    string
  sub:      string
  onPress?: () => void
}

export function QuickActionCard({ icon, iconBg, label, sub, onPress }: Props) {
  return (
    <StyledPressable
      onPress={onPress}
      flex={1}
      backgroundColor={colors.surface.secondary}
      borderRadius={radius.lg}
      padding={spacing[4]}
      borderWidth={0.5}
      borderColor={colors.surface.border}
    >
      <Stack
        width={34}
        height={34}
        borderRadius={radius.md}
        backgroundColor={iconBg}
        alignItems="center"
        justifyContent="center"
        marginBottom={spacing[2] + 2}
      >
        {icon}
      </Stack>

      <StyledText
        fontFamily={typography.family.semiBold}
        fontSize={typography.size.md}
        color={colors.text.primary}
      >
        {label}
      </StyledText>

      <StyledText
        fontFamily={typography.family.regular}
        fontSize={typography.size.xs}
        color={colors.text.secondary}
        marginTop={2}
      >
        {sub}
      </StyledText>
    </StyledPressable>
  )
}

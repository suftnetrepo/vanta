import React from 'react'
import { Stack, StyledText, StyledPressable } from 'fluent-styles'
import { colors, spacing, typography } from '@/theme'

interface Props {
  label:       string
  actionLabel?: string
  onAction?:   () => void
}

export function SectionHeader({ label, actionLabel, onAction }: Props) {
  return (
    <Stack
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      paddingHorizontal={spacing[5]}
      marginTop={spacing[5]}
      marginBottom={spacing[2]}
    >
      <StyledText
        fontFamily={typography.family.semiBold}
        fontSize={typography.size.xs}
        color={colors.text.tertiary}
        style={{ textTransform: 'uppercase', letterSpacing: 0.5 }}
      >
        {label}
      </StyledText>

      {actionLabel && (
        <StyledPressable onPress={onAction}>
          <StyledText
            fontFamily={typography.family.medium}
            fontSize={typography.size.sm}
            color={colors.palette.blue[500]}
          >
            {actionLabel}
          </StyledText>
        </StyledPressable>
      )}
    </Stack>
  )
}

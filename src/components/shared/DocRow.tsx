import React from 'react'
import { Stack, StyledText, StyledPressable, StyledDivider } from 'fluent-styles'
import { DocTypeBadge } from './DocTypeBadge'
import { colors, spacing, radius, typography } from '@/theme'
import type { DocType } from '@/types'

interface Props {
  name:         string
  meta:         string
  thumbLabel:   string
  docType:      DocType
  onPress?:     () => void
  showDivider?: boolean
}

export function DocRow({
  name, meta, thumbLabel, docType, onPress, showDivider = true,
}: Props) {
  return (
    <>
      <StyledPressable
        onPress={onPress}
        flexDirection="row"
        alignItems="center"
        gap={spacing[3]}
        paddingVertical={spacing[3]}
        paddingHorizontal={spacing[5]}
      >
        {/* Thumbnail */}
        <Stack
          width={40}
          height={48}
          borderRadius={radius.md}
          backgroundColor={colors.surface.secondary}
          borderWidth={0.5}
          borderColor={colors.surface.border}
          alignItems="center"
          justifyContent="center"
        >
          <StyledText
            fontFamily={typography.family.semiBold}
            fontSize={typography.size.xs}
            color={colors.text.tertiary}
          >
            {thumbLabel}
          </StyledText>
        </Stack>

        {/* Info */}
        <Stack flex={1}>
          <StyledText
            fontFamily={typography.family.semiBold}
            fontSize={typography.size.md}
            color={colors.text.primary}
            numberOfLines={1}
          >
            {name}
          </StyledText>
          <StyledText
            fontFamily={typography.family.regular}
            fontSize={typography.size.sm}
            color={colors.text.secondary}
            marginTop={2}
          >
            {meta}
          </StyledText>
        </Stack>

        <DocTypeBadge type={docType} />
      </StyledPressable>

      {showDivider && (
        <StyledDivider
          borderBottomColor={colors.surface.borderLight}
          marginHorizontal={spacing[5]}
        />
      )}
    </>
  )
}

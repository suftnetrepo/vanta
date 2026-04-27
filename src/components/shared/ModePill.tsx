import React from 'react'
import { Stack, StyledText, StyledPressable } from 'fluent-styles'
import { useMode } from '@/hooks/useMode'
import { colors, typography, spacing, radius } from '@/theme'

interface Props {
  onPress?: () => void
}

export function ModePill({ onPress }: Props) {
  const { mode, setMode, isStudent, modeColors } = useMode()

  function handlePress() {
    if (onPress) { onPress() }
    else { setMode(isStudent ? 'business' : 'student') }
  }

  return (
    <StyledPressable
      onPress={handlePress}
      flexDirection="row"
      alignItems="center"
      gap={spacing[1] + 2}
      paddingHorizontal={spacing[3]}
      paddingVertical={5}
      borderRadius={radius.full}
      backgroundColor={modeColors.pillBg}
      borderWidth={0.5}
      borderColor={modeColors.pillBorder}
      alignSelf="flex-start"
      marginTop={spacing[1] + 2}
    >
      <Stack
        width={7}
        height={7}
        borderRadius={radius.full}
        backgroundColor={modeColors.accent}
      />
      <StyledText
        fontFamily={typography.family.medium}
        fontSize={typography.size.xs}
        color={modeColors.pillText}
      >
        {isStudent ? 'Student mode' : 'Business mode'}
      </StyledText>
      <StyledText
        fontSize={9}
        color={modeColors.pillText}
      >
        ▾
      </StyledText>
    </StyledPressable>
  )
}

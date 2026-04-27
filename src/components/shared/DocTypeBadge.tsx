import React from 'react'
import { StyledBadge } from 'fluent-styles'
import { docTypeColors, typography, radius } from '@/theme'
import type { DocType } from '@/types'

interface Props {
  type:   DocType
  label?: string
}

const LABELS: Record<DocType, string> = {
  notes:    'Notes',
  assign:   'Assign.',
  reading:  'Reading',
  receipt:  'Receipt',
  invoice:  'Invoice',
  contract: 'Contract',
  other:    'Other',
  pdf:      'PDF',
}

export function DocTypeBadge({ type, label }: Props) {
  const token = docTypeColors[type] ?? docTypeColors.other

  return (
    <StyledBadge
      backgroundColor={token.bg}
      color={token.text}
      paddingHorizontal={8}
      paddingVertical={3}
      borderRadius={radius.sm}
      fontFamily={typography.family.semiBold}
      fontSize={typography.size.xs}
    >
      {label ?? LABELS[type]}
    </StyledBadge>
  )
}

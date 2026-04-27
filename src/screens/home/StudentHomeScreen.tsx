import React from 'react'
import {
  StyledPage,
  StyledScrollView,
  Stack,
  StyledText,
  StyledSpacer,
} from 'fluent-styles'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { RootStackParamList } from '@/types'

import { ModePill }        from '@/components/shared/ModePill'
import { ScanButton }      from '@/components/home/ScanButton'
import { QuickActionCard } from '@/components/home/QuickActionCard'
import { DocRow }          from '@/components/shared/DocRow'
import { SectionHeader }   from '@/components/shared/SectionHeader'
import { useUser, getGreeting } from '@/store/UserContext'
import { colors, spacing, radius, typography } from '@/theme'

type Props = NativeStackScreenProps<RootStackParamList, 'StudentHome'>

function ActionIcon({ shape, color }: { shape: string; color: string }) {
  if (shape === 'folder') {
    return (
      <Stack width={18} height={16} gap={2}>
        <Stack width={9}  height={4}  borderRadius={2} backgroundColor={color} opacity={0.7} />
        <Stack width={18} height={12} borderRadius={3} backgroundColor={color} opacity={0.9} />
      </Stack>
    )
  }
  if (shape === 'card') {
    return (
      <Stack width={18} height={14} borderRadius={3} borderWidth={1.5} borderColor={color}
        alignItems="center" justifyContent="center" gap={3} paddingHorizontal={3}
      >
        <Stack width="100%" height={1.5} borderRadius={1} backgroundColor={color} />
        <Stack width="100%" height={1.5} borderRadius={1} backgroundColor={color} />
      </Stack>
    )
  }
  if (shape === 'clock') {
    return (
      <Stack width={18} height={18} borderRadius={9} borderWidth={1.5} borderColor={color}
        alignItems="center" justifyContent="center"
      >
        <Stack width={1.5} height={5} borderRadius={1} backgroundColor={color}
          style={{ position: 'absolute', top: 2 }} />
        <Stack width={4} height={1.5} borderRadius={1} backgroundColor={color}
          style={{ position: 'absolute', right: 2 }} />
      </Stack>
    )
  }
  if (shape === 'export') {
    return (
      <Stack alignItems="center" gap={1}>
        <Stack width={1.5} height={8} borderRadius={1} backgroundColor={color} />
        <Stack width={8}   height={1.5} borderRadius={1} backgroundColor={color} />
        <Stack width={12}  height={1.5} borderRadius={1} backgroundColor={color} />
      </Stack>
    )
  }
  return <Stack width={18} height={18} borderRadius={4} backgroundColor={color} />
}

const QUICK_ACTIONS = [
  { key: 'folders',    iconBg: colors.student.accentLight,  iconColor: colors.student.accent,  iconShape: 'folder', label: 'Subject folders', sub: '8 subjects'          },
  { key: 'flashcards', iconBg: '#FEF3EC',                   iconColor: '#C06000',               iconShape: 'card',   label: 'Flashcards',       sub: 'Generate from notes' },
  { key: 'history',    iconBg: colors.business.accentLight, iconColor: colors.business.accent, iconShape: 'clock',  label: 'Scan history',     sub: '24 this month'       },
  { key: 'export',     iconBg: '#E6F1FB',                   iconColor: '#185FA5',               iconShape: 'export', label: 'Export',           sub: 'PDF, DOCX, Drive'    },
] as const

const RECENT_DOCS = [
  { name: 'Lecture notes — Biochem wk 7', meta: 'Today, 2:14 PM · 3 pages', thumbLabel: 'PDF', docType: 'notes'  as const },
  { name: 'Assignment brief — CS3',        meta: 'Yesterday · 1 page',        thumbLabel: 'IMG', docType: 'assign' as const },
  { name: 'Textbook — Chapter 12',         meta: 'Mon · 8 pages',             thumbLabel: 'PDF', docType: 'pdf'    as const },
]

export function StudentHomeScreen({ navigation }: Props) {
  const { user } = useUser()

  return (
    <StyledPage flex={1} backgroundColor={colors.surface.page} showStatusBar={false}>

      {/* ── Custom header row — Stack, not StyledHeader ── */}
      {/* StyledHeader clips multi-line content at 44px and double-insets safe area */}
      <Stack
        flexDirection="row"
        alignItems="flex-start"
        justifyContent="space-between"
        paddingHorizontal={spacing[5]}
        paddingTop={spacing[4]}
        paddingBottom={spacing[2]}
      >
        <Stack flex={1}>
          <StyledText
            fontFamily={typography.family.semiBold}
            fontSize={typography.size.h2}
            color={colors.text.primary}
            lineHeight={typography.size.h2 * 1.25}
          >
            {`${getGreeting()},\n${user.name}`}
          </StyledText>
          <ModePill />
        </Stack>

        {/* Avatar */}
        <Stack
          width={38} height={38}
          borderRadius={radius.full}
          backgroundColor={colors.student.accentLight}
          alignItems="center"
          justifyContent="center"
          marginTop={4}
        >
          <StyledText
            fontFamily={typography.family.semiBold}
            fontSize={typography.size.sm}
            color={colors.student.accentText}
          >
            {user.initials}
          </StyledText>
        </Stack>
      </Stack>

      {/* ── Scrollable content ── */}
      <StyledScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <ScanButton onPress={() => navigation.navigate('Camera')} />

        <SectionHeader label="Quick actions" />
        <Stack flexDirection="row" flexWrap="wrap" gap={spacing[2] + 2} paddingHorizontal={spacing[5]}>
          {QUICK_ACTIONS.map((a) => (
            <Stack key={a.key} width="47.5%">
              <QuickActionCard
                icon={<ActionIcon shape={a.iconShape} color={a.iconColor} />}
                iconBg={a.iconBg} label={a.label} sub={a.sub}
              />
            </Stack>
          ))}
        </Stack>

        <SectionHeader
          label="Recent scans"
          actionLabel="See all"
          onAction={() => navigation.navigate('Library')}
        />
        {RECENT_DOCS.map((doc, i) => (
          <DocRow
            key={doc.name} name={doc.name} meta={doc.meta}
            thumbLabel={doc.thumbLabel} docType={doc.docType}
            showDivider={i < RECENT_DOCS.length - 1}
          />
        ))}

        <StyledSpacer height={spacing[8]} />
      </StyledScrollView>
    </StyledPage>
  )
}

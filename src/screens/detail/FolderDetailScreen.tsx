// ─────────────────────────────────────────────────────────────────────────────
// Vanta — FolderDetailScreen
//
// Layout: StyledPage
//         └── StyledHeader (back + folder name + doc count)
//         └── StyledScrollView
//               └── Folder summary card
//               └── Sort + filter row
//               └── DocRow list
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react'
import {
  StyledPage,
  StyledHeader,
  StyledScrollView,
  StyledPressable,
  StyledDivider,
  StyledSpacer,
  StyledBadge,
  StyledChip,
  Stack,
  StyledText,
} from 'fluent-styles'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { RootStackParamList } from '@/types'
import { useMode }       from '@/hooks/useMode'
import { DocRow }        from '@/components/shared/DocRow'
import { colors, spacing, radius, typography } from '@/theme'

type Props = NativeStackScreenProps<RootStackParamList, 'FolderDetail'>

// ─── Mock data ────────────────────────────────────────────────────────────────

const FOLDER_DOCS_STUDENT = [
  { name: 'Lecture notes — Biochem wk 7',  meta: 'Today · 3 pages',      thumbLabel: 'PDF', docType: 'notes'   as const },
  { name: 'Lecture notes — Biochem wk 6',  meta: 'Last week · 4 pages',  thumbLabel: 'PDF', docType: 'notes'   as const },
  { name: 'Lecture notes — Biochem wk 5',  meta: '2 weeks ago · 3 pages',thumbLabel: 'PDF', docType: 'notes'   as const },
  { name: 'Tutorial sheet — Enzymes',      meta: '2 weeks ago · 2 pages',thumbLabel: 'PDF', docType: 'assign'  as const },
  { name: 'Textbook — Chapter 12',         meta: 'Last month · 8 pages', thumbLabel: 'PDF', docType: 'reading' as const },
  { name: 'Textbook — Chapter 11',         meta: 'Last month · 6 pages', thumbLabel: 'PDF', docType: 'reading' as const },
]

const FOLDER_DOCS_BUSINESS = [
  { name: 'Invoice — Webflow Pro Oct',     meta: 'Today · £299.00',      thumbLabel: 'INV', docType: 'invoice'  as const },
  { name: 'Invoice — AWS Oct',             meta: 'Last week · £132.00',  thumbLabel: 'INV', docType: 'invoice'  as const },
  { name: 'Invoice — Figma Oct',           meta: 'Last week · £15.00',   thumbLabel: 'INV', docType: 'invoice'  as const },
  { name: 'Invoice — Notion Oct',          meta: '2 weeks ago · £8.00',  thumbLabel: 'INV', docType: 'invoice'  as const },
  { name: 'Invoice — GitHub Oct',          meta: '2 weeks ago · £4.00',  thumbLabel: 'INV', docType: 'invoice'  as const },
]

type SortKey = 'date' | 'name' | 'size'

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: 'date', label: 'Date' },
  { key: 'name', label: 'Name' },
  { key: 'size', label: 'Size' },
]

// ─── Screen ───────────────────────────────────────────────────────────────────

export function FolderDetailScreen({ navigation }: Props) {
  const { isStudent, modeColors } = useMode()
  const [sortBy, setSortBy] = useState<SortKey>('date')

  const docs        = isStudent ? FOLDER_DOCS_STUDENT : FOLDER_DOCS_BUSINESS
  const folderName  = isStudent ? 'Biochemistry'      : 'Invoices'
  const folderSub   = isStudent ? 'Year 2'            : 'Q4 2024'
  const folderCount = docs.length

  return (
    <StyledPage flex={1} backgroundColor={colors.surface.page}>

      {/* ── Header ── */}
      <StyledHeader
        title={folderName}
        titleAlignment="left"
        showStatusBar={false}
        backgroundColor={colors.surface.page}
        showBackArrow
        onBackPress={() => navigation.goBack()}
        titleProps={{
          fontFamily: typography.family.bold,
          fontSize:   typography.size.h3,
          color:      colors.text.primary,
        }}
        rightIcon={
          <Stack paddingRight={spacing[5]} paddingVertical={spacing[2]}>
            <StyledBadge
              backgroundColor={modeColors.accentLight}
              color={modeColors.accentText}
              paddingHorizontal={10}
              paddingVertical={4}
              borderRadius={radius.full}
              fontFamily={typography.family.semiBold}
              fontSize={typography.size.xs}
            >
              {`${folderCount} docs`}
            </StyledBadge>
          </Stack>
        }
      />

      <StyledScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >

        {/* ── Folder summary card ── */}
        <Stack
          marginHorizontal={spacing[5]}
          marginTop={spacing[3]}
          flexDirection="row"
          alignItems="center"
          gap={spacing[4]}
          backgroundColor={modeColors.accentLight}
          borderRadius={radius.xl}
          padding={spacing[4]}
          borderWidth={0.5}
          borderColor={modeColors.accentMid}
        >
          {/* Folder icon */}
          <Stack
            width={52}
            height={52}
            borderRadius={radius.lg}
            backgroundColor={modeColors.accent}
            alignItems="center"
            justifyContent="center"
          >
            <Stack gap={2}>
              <Stack width={12} height={5}  borderRadius={2} backgroundColor={colors.brand.white} opacity={0.7} />
              <Stack width={22} height={14} borderRadius={3} backgroundColor={colors.brand.white} />
            </Stack>
          </Stack>

          <Stack flex={1}>
            <StyledText
              fontFamily={typography.family.bold}
              fontSize={typography.size.lg}
              color={modeColors.accentText}
            >
              {folderName}
            </StyledText>
            <StyledText
              fontFamily={typography.family.regular}
              fontSize={typography.size.sm}
              color={modeColors.accentText}
              opacity={0.7}
              marginTop={2}
            >
              {folderSub} · {folderCount} documents
            </StyledText>
          </Stack>

          {/* Edit folder button */}
          <StyledPressable
            width={32}
            height={32}
            borderRadius={radius.md}
            backgroundColor="rgba(0,0,0,0.08)"
            alignItems="center"
            justifyContent="center"
          >
            <StyledText fontSize={14} color={modeColors.accentText}>✏️</StyledText>
          </StyledPressable>
        </Stack>

        {/* ── Sort row ── */}
        <Stack
          flexDirection="row"
          alignItems="center"
          paddingHorizontal={spacing[5]}
          paddingTop={spacing[4]}
          paddingBottom={spacing[2]}
          gap={spacing[2]}
        >
          <StyledText
            fontFamily={typography.family.medium}
            fontSize={typography.size.sm}
            color={colors.text.secondary}
            marginRight={spacing[1]}
          >
            Sort:
          </StyledText>
          {SORT_OPTIONS.map((s) => (
            <StyledChip
              key={s.key}
              label={s.label}
              variant="smooth"
              size="sm"
              selected={sortBy === s.key}
              color={sortBy === s.key ? modeColors.accent : colors.text.secondary}
              bgColor={sortBy === s.key ? modeColors.accentLight : undefined}
              showCheck={false}
              onPress={() => setSortBy(s.key)}
            />
          ))}
        </Stack>

        <StyledDivider borderBottomColor={colors.surface.borderLight} />

        {/* ── Document list ── */}
        {docs.map((doc, i) => (
          <DocRow
            key={doc.name}
            name={doc.name}
            meta={doc.meta}
            thumbLabel={doc.thumbLabel}
            docType={doc.docType}
            onPress={() => navigation.navigate('DocDetail', { docId: doc.name })}
            showDivider={i < docs.length - 1}
          />
        ))}

        <StyledSpacer height={spacing[6]} />

        {/* ── Scan into folder CTA ── */}
        <Stack
          marginHorizontal={spacing[5]}
          borderRadius={radius.xl}
          overflow="hidden"
        >
          <StyledPressable
            onPress={() => navigation.navigate('Camera')}
            flexDirection="row"
            alignItems="center"
            gap={spacing[4]}
            paddingVertical={spacing[4]}
            paddingHorizontal={spacing[5]}
            backgroundColor={colors.brand.primary}
          >
            <Stack
              width={36}
              height={36}
              borderRadius={radius.lg}
              backgroundColor="rgba(255,255,255,0.12)"
              alignItems="center"
              justifyContent="center"
            >
              <StyledText fontSize={16} color={colors.brand.white}>⊡</StyledText>
            </Stack>
            <StyledText
              fontFamily={typography.family.semiBold}
              fontSize={typography.size.base}
              color={colors.brand.white}
            >
              Scan into {folderName}
            </StyledText>
          </StyledPressable>
        </Stack>

      </StyledScrollView>
    </StyledPage>
  )
}

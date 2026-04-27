// ─────────────────────────────────────────────────────────────────────────────
// Vanta — TagSaveScreen
//
// Layout: StyledPage (light)
//         └── StyledHeader (back + title)
//         └── StyledScrollView
//               └── Document preview + meta
//               └── Doc type chips (StyledChip — mode-aware)
//               └── Save-to folder row
//               └── Export chips (StyledChip)
//               └── Save button
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react'
import {
  StyledPage,
  StyledHeader,
  StyledScrollView,
  StyledPressable,
  StyledChip,
  StyledBadge,
  StyledDivider,
  StyledSpacer,
  Stack,
  StyledText,
  toastService,
} from 'fluent-styles'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { RootStackParamList, ExportDestination } from '@/types'
import { useMode } from '@/hooks/useMode'
import { colors, spacing, radius, typography } from '@/theme'

type Props = NativeStackScreenProps<RootStackParamList, 'TagSave'>

// ─── Doc type definitions ─────────────────────────────────────────────────────

interface DocTypeOption {
  key:   string
  label: string
  dot:   string
}

const STUDENT_TYPES: DocTypeOption[] = [
  { key: 'notes',   label: 'Notes',      dot: colors.student.accent  },
  { key: 'assign',  label: 'Assignment', dot: '#EF9F27'              },
  { key: 'reading', label: 'Reading',    dot: colors.business.accent },
  { key: 'other',   label: 'Other',      dot: colors.text.tertiary   },
]

const BUSINESS_TYPES: DocTypeOption[] = [
  { key: 'invoice',  label: 'Invoice',  dot: '#EF9F27'              },
  { key: 'receipt',  label: 'Receipt',  dot: colors.business.accent },
  { key: 'contract', label: 'Contract', dot: '#378ADD'              },
  { key: 'other',    label: 'Other',    dot: colors.text.tertiary   },
]

// ─── Export options ───────────────────────────────────────────────────────────

const EXPORT_OPTIONS: { key: ExportDestination; label: string }[] = [
  { key: 'pdf',          label: 'PDF'          },
  { key: 'google_drive', label: 'Google Drive' },
  { key: 'notion',       label: 'Notion'       },
  { key: 'apple_notes',  label: 'Apple Notes'  },
]

// ─── Document preview thumbnail ───────────────────────────────────────────────

function DocPreviewThumb() {
  return (
    <Stack
      width={72}
      height={88}
      borderRadius={radius.md}
      backgroundColor="#f5f0e8"
      borderWidth={0.5}
      borderColor={colors.surface.border}
      padding={spacing[2]}
      gap={4}
      flexShrink={0}
    >
      <Stack height={5}  width="45%" borderRadius={2} backgroundColor="#a09880" />
      <Stack height={3.5} width="90%" borderRadius={2} backgroundColor="#c8c0b0" />
      <Stack height={3.5} width="75%" borderRadius={2} backgroundColor="#c8c0b0" />
      <Stack height={3.5} width="55%" borderRadius={2} backgroundColor="#c8c0b0" />
      <Stack height={3.5} width="88%" borderRadius={2} backgroundColor="#c8c0b0" />
      <StyledSpacer height={2} />
      <Stack height={3.5} width="80%" borderRadius={2} backgroundColor="#c8c0b0" />
      <Stack height={3.5} width="60%" borderRadius={2} backgroundColor="#c8c0b0" />
    </Stack>
  )
}

// ─── Folder picker row ────────────────────────────────────────────────────────

function FolderRow({
  label,
  sub,
  accentBg,
  accentText,
}: {
  label:      string
  sub:        string
  accentBg:   string
  accentText: string
}) {
  return (
    <StyledPressable
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      paddingVertical={spacing[3]}
      paddingHorizontal={spacing[3]}
      borderRadius={radius.lg}
      backgroundColor={colors.surface.secondary}
      borderWidth={0.5}
      borderColor={colors.surface.border}
    >
      <Stack flexDirection="row" alignItems="center" gap={spacing[3]}>
        <Stack
          width={34}
          height={34}
          borderRadius={radius.md}
          backgroundColor={accentBg}
          alignItems="center"
          justifyContent="center"
        >
          <StyledText fontSize={16}>📂</StyledText>
        </Stack>
        <Stack>
          <StyledText
            fontFamily={typography.family.semiBold}
            fontSize={typography.size.base}
            color={colors.text.primary}
          >
            {label}
          </StyledText>
          <StyledText
            fontFamily={typography.family.regular}
            fontSize={typography.size.xs}
            color={colors.text.secondary}
          >
            {sub}
          </StyledText>
        </Stack>
      </Stack>
      <StyledText fontSize={16} color={colors.text.tertiary}>›</StyledText>
    </StyledPressable>
  )
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export function TagSaveScreen({ navigation }: Props) {
  const { isStudent, modeColors } = useMode()

  const types          = isStudent ? STUDENT_TYPES : BUSINESS_TYPES
  const [docType, setDocType]   = useState(types[0].key)
  const [exports, setExports]   = useState<ExportDestination[]>(['pdf'])

  const folderLabel = isStudent ? 'Biochemistry'      : 'October Expenses'
  const folderSub   = isStudent ? 'Year 2 · 14 docs'  : 'Q4 2024 · 8 docs'
  const docName     = isStudent
    ? 'Lecture notes — Biochem wk 7'
    : 'Invoice — Webflow Pro Oct'

  function toggleExport(key: ExportDestination) {
    setExports((prev) =>
      prev.includes(key) ? prev.filter((e) => e !== key) : [...prev, key]
    )
  }

  function handleSave() {
    toastService.success('Document saved')
    navigation.navigate('Main')
  }

  return (
    <StyledPage flex={1} backgroundColor={colors.surface.page}>

      {/* ── Header ── */}
      <StyledHeader
        title="Save document"
        titleAlignment="left"
        
        backgroundColor={colors.surface.page}
        showBackArrow
        onBackPress={() => navigation.goBack()}
        titleProps={{
          fontFamily: typography.family.semiBold,
          fontSize:   typography.size.xl,
          color:      colors.text.primary,
        }}
      />

      <StyledScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >

        {/* ── Document preview ── */}
        <Stack
          flexDirection="row"
          gap={spacing[3]}
          paddingHorizontal={spacing[5]}
          paddingTop={spacing[3]}
          alignItems="flex-start"
        >
          <DocPreviewThumb />

          <Stack flex={1} gap={spacing[2]}>
            {/* Editable name (visual only — wire TextInput for production) */}
            <Stack
              borderBottomWidth={1.5}
              borderBottomColor={colors.surface.border}
              paddingBottom={spacing[1] + 2}
            >
              <StyledText
                fontFamily={typography.family.semiBold}
                fontSize={typography.size.base}
                color={colors.text.primary}
              >
                {docName}
              </StyledText>
            </Stack>

            <StyledText
              fontFamily={typography.family.regular}
              fontSize={typography.size.sm}
              color={colors.text.secondary}
            >
              1 page · Scanned now · Auto-enhanced
            </StyledText>

            {/* Status badges */}
            <Stack flexDirection="row" gap={spacing[2]} flexWrap="wrap">
              <StyledBadge
                backgroundColor={colors.business.accentLight}
                color={colors.business.accentText}
                paddingHorizontal={8}
                paddingVertical={3}
                borderRadius={radius.sm}
                fontFamily={typography.family.semiBold}
                fontSize={typography.size.xs}
              >
                ✓ OCR ready
              </StyledBadge>
              <StyledBadge
                backgroundColor={modeColors.accentLight}
                color={modeColors.accentText}
                paddingHorizontal={8}
                paddingVertical={3}
                borderRadius={radius.sm}
                fontFamily={typography.family.semiBold}
                fontSize={typography.size.xs}
              >
                Auto-enhanced
              </StyledBadge>
            </Stack>
          </Stack>
        </Stack>

        <StyledDivider
          borderBottomColor={colors.surface.borderLight}
          marginVertical={spacing[4]}
        />

        {/* ── Document type ── */}
        <Stack paddingHorizontal={spacing[5]}>
          <StyledText
            fontFamily={typography.family.semiBold}
            fontSize={typography.size.xs}
            color={colors.text.tertiary}
            marginBottom={spacing[3]}
            style={{ textTransform: 'uppercase', letterSpacing: 0.5 }}
          >
            Document type
          </StyledText>

          <Stack flexDirection="row" flexWrap="wrap" gap={spacing[2]}>
            {types.map((t) => (
              <StyledPressable
                key={t.key}
                onPress={() => setDocType(t.key)}
                flexDirection="row"
                alignItems="center"
                gap={spacing[2]}
                paddingHorizontal={spacing[3]}
                paddingVertical={10}
                borderRadius={radius.lg}
                borderWidth={docType === t.key ? 1.5 : 1}
                borderColor={
                  docType === t.key
                    ? colors.brand.primary
                    : colors.surface.border
                }
                backgroundColor={
                  docType === t.key
                    ? colors.surface.secondary
                    : colors.surface.card
                }
              >
                <Stack
                  width={8}
                  height={8}
                  borderRadius={radius.full}
                  backgroundColor={t.dot}
                />
                <StyledText
                  fontFamily={typography.family.semiBold}
                  fontSize={typography.size.md}
                  color={colors.text.primary}
                >
                  {t.label}
                </StyledText>
              </StyledPressable>
            ))}
          </Stack>
        </Stack>

        <StyledDivider
          borderBottomColor={colors.surface.borderLight}
          marginVertical={spacing[4]}
        />

        {/* ── Save to folder ── */}
        <Stack paddingHorizontal={spacing[5]}>
          <StyledText
            fontFamily={typography.family.semiBold}
            fontSize={typography.size.xs}
            color={colors.text.tertiary}
            marginBottom={spacing[3]}
            style={{ textTransform: 'uppercase', letterSpacing: 0.5 }}
          >
            Save to
          </StyledText>
          <FolderRow
            label={folderLabel}
            sub={folderSub}
            accentBg={modeColors.accentLight}
            accentText={modeColors.accentText}
          />
        </Stack>

        <StyledDivider
          borderBottomColor={colors.surface.borderLight}
          marginVertical={spacing[4]}
        />

        {/* ── Also export to ── */}
        <Stack paddingHorizontal={spacing[5]}>
          <StyledText
            fontFamily={typography.family.semiBold}
            fontSize={typography.size.xs}
            color={colors.text.tertiary}
            marginBottom={spacing[3]}
            style={{ textTransform: 'uppercase', letterSpacing: 0.5 }}
          >
            Also export to
          </StyledText>
          <Stack flexDirection="row" gap={spacing[2]} flexWrap="wrap">
            {EXPORT_OPTIONS.map((opt) => (
              <StyledChip
                key={opt.key}
                label={opt.label}
                variant="outlined"
                size="md"
                selected={exports.includes(opt.key)}
                color={exports.includes(opt.key) ? '#0C447C' : colors.text.secondary}
                bgColor={exports.includes(opt.key) ? '#E6F1FB' : undefined}
                showCheck={false}
                onPress={() => toggleExport(opt.key)}
              />
            ))}
          </Stack>
        </Stack>

        <StyledSpacer height={spacing[6]} />

        {/* ── Save button ── */}
        <Stack
          marginHorizontal={spacing[5]}
          borderRadius={radius.lg}
          backgroundColor={colors.brand.primary}
          overflow="hidden"
        >
          <StyledPressable
            onPress={handleSave}
            paddingVertical={spacing[4]}
            alignItems="center"
            justifyContent="center"
          >
            <StyledText
              fontFamily={typography.family.semiBold}
              fontSize={typography.size.lg}
              color={colors.brand.white}
            >
              ✓  Save document
            </StyledText>
          </StyledPressable>
        </Stack>

      </StyledScrollView>
    </StyledPage>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Vanta — DocDetailScreen
//
// Layout: StyledPage
//         └── StyledHeader (back + title + share button)
//         └── StyledScrollView
//               └── Document preview (large thumb)
//               └── Metadata row (pages, date, size, OCR)
//               └── OCR text section (collapsible)
//               └── Action row (Share / Export / Delete)
//         └── Popup (share/export sheet)
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
  Popup,
  Stack,
  StyledText,
  Collapse,
  useToast,
  useDialogue,
} from 'fluent-styles'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { RootStackParamList, ExportDestination } from '@/types'
import { DocTypeBadge } from '@/components/shared/DocTypeBadge'
import { colors, spacing, radius, typography } from '@/theme'

type Props = NativeStackScreenProps<RootStackParamList, 'DocDetail'>

// ─── Mock document data ───────────────────────────────────────────────────────
// Replace with real data from storage service in production

const MOCK_DOC = {
  id:        'doc-001',
  name:      'Lecture notes — Biochem wk 7',
  docType:   'notes' as const,
  pages:     3,
  createdAt: 'Today, 2:14 PM',
  size:      '1.2 MB',
  folder:    'Biochemistry',
  ocrText:   `Biochemistry — Week 7: Enzyme Kinetics

Key concepts covered this lecture:

1. Michaelis-Menten kinetics
   - Km represents substrate concentration at half Vmax
   - Lower Km = higher affinity for substrate
   - Vmax is the maximum reaction rate

2. Enzyme inhibition types
   - Competitive: increases apparent Km, Vmax unchanged
   - Non-competitive: Km unchanged, decreases Vmax
   - Uncompetitive: decreases both Km and Vmax

3. Lineweaver-Burk plot
   - Double reciprocal plot (1/V vs 1/[S])
   - Useful for determining Km and Vmax graphically
   - Y-intercept = 1/Vmax, X-intercept = -1/Km

Exam tip: Know how to interpret inhibition from Lineweaver-Burk plots.`,
}

// ─── Export options ───────────────────────────────────────────────────────────

const EXPORT_OPTIONS: { key: ExportDestination; label: string; icon: string }[] = [
  { key: 'pdf',          label: 'Save as PDF',    icon: '📄' },
  { key: 'google_drive', label: 'Google Drive',   icon: '☁️' },
  { key: 'notion',       label: 'Notion',         icon: '📝' },
  { key: 'apple_notes',  label: 'Apple Notes',    icon: '🍎' },
]

// ─── Metadata chip ────────────────────────────────────────────────────────────

function MetaChip({ label, value }: { label: string; value: string }) {
  return (
    <Stack
      paddingHorizontal={spacing[3]}
      paddingVertical={spacing[2]}
      borderRadius={radius.lg}
      backgroundColor={colors.surface.secondary}
      alignItems="center"
      gap={2}
    >
      <StyledText
        fontFamily={typography.family.regular}
        fontSize={typography.size.xs}
        color={colors.text.tertiary}
      >
        {label}
      </StyledText>
      <StyledText
        fontFamily={typography.family.semiBold}
        fontSize={typography.size.sm}
        color={colors.text.primary}
      >
        {value}
      </StyledText>
    </Stack>
  )
}

// ─── Action button ────────────────────────────────────────────────────────────

function ActionBtn({
  label,
  iconBg,
  iconColor,
  iconShape,
  onPress,
  danger,
}: {
  label:      string
  iconBg:     string
  iconColor:  string
  iconShape:  string
  onPress:    () => void
  danger?:    boolean
}) {
  return (
    <StyledPressable
      flex={1}
      alignItems="center"
      gap={spacing[2]}
      onPress={onPress}
    >
      <Stack
        width={52}
        height={52}
        borderRadius={radius.xl}
        backgroundColor={iconBg}
        alignItems="center"
        justifyContent="center"
        borderWidth={0.5}
        borderColor={colors.surface.border}
      >
        <StyledText fontSize={22}>{iconShape}</StyledText>
      </Stack>
      <StyledText
        fontFamily={typography.family.medium}
        fontSize={typography.size.xs}
        color={danger ? colors.semantic.error : colors.text.secondary}
      >
        {label}
      </StyledText>
    </StyledPressable>
  )
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export function DocDetailScreen({ navigation, route }: Props) {
  const [shareVisible, setShareVisible] = useState(false)
  const toast    = useToast()
  const dialogue = useDialogue()

  async function handleDelete() {
    const ok = await dialogue.confirm({
      title:        'Delete document?',
      message:      'This document will be permanently deleted.',
      icon:         '🗑️',
      confirmLabel: 'Delete',
      cancelLabel:  'Cancel',
      destructive:  true,
      theme:        'light',
    })
    if (ok) {
      toast.success('Document deleted')
      navigation.goBack()
    }
  }

  function handleExport(dest: ExportDestination) {
    setShareVisible(false)
    toast.success(`Exported to ${dest.replace('_', ' ')}`)
  }

  return (
    <StyledPage flex={1} backgroundColor={colors.surface.page}>

      {/* ── Header ── */}
      <StyledHeader
        title={MOCK_DOC.name}
        titleAlignment="left"
        showStatusBar={false}
        backgroundColor={colors.surface.page}
        showBackArrow
        onBackPress={() => navigation.goBack()}
        titleProps={{
          fontFamily: typography.family.semiBold,
          fontSize:   typography.size.base,
          color:      colors.text.primary,
        }}
        rightIcon={
          <StyledPressable
            onPress={() => setShareVisible(true)}
            paddingRight={spacing[5]}
            paddingVertical={spacing[2]}
          >
            <Stack
              width={32}
              height={32}
              borderRadius={radius.md}
              backgroundColor={colors.surface.secondary}
              alignItems="center"
              justifyContent="center"
            >
              <StyledText fontSize={14} color={colors.text.secondary}>↑</StyledText>
            </Stack>
          </StyledPressable>
        }
      />

      <StyledScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60 }}
      >

        {/* ── Document preview ── */}
        <Stack
          marginHorizontal={spacing[5]}
          marginTop={spacing[3]}
          height={320}
          borderRadius={radius.xl}
          backgroundColor="#f5f0e8"
          borderWidth={0.5}
          borderColor={colors.surface.border}
          overflow="hidden"
          padding={spacing[5]}
          gap={spacing[2]}
        >
          {/* Simulated doc content */}
          <Stack height={10} width="42%" borderRadius={3} backgroundColor="#8a8070" marginBottom={spacing[2]} />
          {[92,58,80,90,62,85,52,78,88,44,72,90,60].map((w, i) => (
            <Stack key={i} height={5} width={`${w}%`} borderRadius={2} backgroundColor="#c8c0b0" />
          ))}
          {/* Page indicator */}
          <Stack
            position="absolute"
            bottom={spacing[3]}
            right={spacing[3]}
            paddingHorizontal={spacing[2]}
            paddingVertical={3}
            borderRadius={radius.full}
            backgroundColor="rgba(0,0,0,0.3)"
          >
            <StyledText
              fontFamily={typography.family.medium}
              fontSize={typography.size.xs}
              color={colors.brand.white}
            >
              1 / {MOCK_DOC.pages}
            </StyledText>
          </Stack>
        </Stack>

        {/* ── Doc type + folder ── */}
        <Stack
          flexDirection="row"
          alignItems="center"
          gap={spacing[2]}
          paddingHorizontal={spacing[5]}
          marginTop={spacing[3]}
        >
          <DocTypeBadge type={MOCK_DOC.docType} />
          <StyledBadge
            backgroundColor={colors.surface.secondary}
            color={colors.text.secondary}
            paddingHorizontal={8}
            paddingVertical={3}
            borderRadius={radius.sm}
            fontFamily={typography.family.medium}
            fontSize={typography.size.xs}
          >
            📂 {MOCK_DOC.folder}
          </StyledBadge>
        </Stack>

        {/* ── Metadata row ── */}
        <Stack
          flexDirection="row"
          gap={spacing[2]}
          paddingHorizontal={spacing[5]}
          marginTop={spacing[3]}
          flexWrap="wrap"
        >
          <MetaChip label="Pages"   value={String(MOCK_DOC.pages)} />
          <MetaChip label="Scanned" value={MOCK_DOC.createdAt}     />
          <MetaChip label="Size"    value={MOCK_DOC.size}          />
          <MetaChip label="OCR"     value="Ready"                  />
        </Stack>

        <StyledDivider
          borderBottomColor={colors.surface.borderLight}
          marginVertical={spacing[4]}
        />

        {/* ── Action row ── */}
        <Stack
          flexDirection="row"
          paddingHorizontal={spacing[5]}
        >
          <ActionBtn
            label="Share"
            iconBg={colors.student.accentLight}
            iconColor={colors.student.accent}
            iconShape="↑"
            onPress={() => setShareVisible(true)}
          />
          <ActionBtn
            label="Export"
            iconBg="#E6F1FB"
            iconColor="#185FA5"
            iconShape="📤"
            onPress={() => setShareVisible(true)}
          />
          <ActionBtn
            label="Rename"
            iconBg={colors.surface.secondary}
            iconColor={colors.text.secondary}
            iconShape="✏️"
            onPress={() => {}}
          />
          <ActionBtn
            label="Delete"
            iconBg={colors.semantic.errorBg}
            iconColor={colors.semantic.error}
            iconShape="🗑️"
            onPress={handleDelete}
            danger
          />
        </Stack>

        <StyledDivider
          borderBottomColor={colors.surface.borderLight}
          marginVertical={spacing[4]}
        />

        {/* ── OCR text (collapsible) ── */}
        <Stack paddingHorizontal={spacing[5]}>
          <Collapse
            title="OCR Text"
            variant="bordered"
            defaultCollapse
          >
            <Stack padding={spacing[3]}>
              <StyledText
                fontFamily={typography.family.regular}
                fontSize={typography.size.sm}
                color={colors.text.secondary}
                lineHeight={typography.size.sm * 1.7}
              >
                {MOCK_DOC.ocrText}
              </StyledText>
            </Stack>
          </Collapse>
        </Stack>

        <StyledSpacer height={spacing[6]} />

      </StyledScrollView>

      {/* ── Share / Export popup ── */}
      <Popup
        visible={shareVisible}
        onClose={() => setShareVisible(false)}
        title="Export document"
        subtitle="Choose where to send this document"
        showClose
        round
        safeAreaBottom
        position="bottom"
        animation="slide"
      >
        <Stack gap={spacing[2]} padding={spacing[4]}>
          {EXPORT_OPTIONS.map((opt) => (
            <StyledPressable
              key={opt.key}
              onPress={() => handleExport(opt.key)}
              flexDirection="row"
              alignItems="center"
              gap={spacing[4]}
              paddingVertical={spacing[3] + 2}
              paddingHorizontal={spacing[3]}
              borderRadius={radius.lg}
              backgroundColor={colors.surface.secondary}
            >
              <StyledText fontSize={22}>{opt.icon}</StyledText>
              <StyledText
                fontFamily={typography.family.medium}
                fontSize={typography.size.base}
                color={colors.text.primary}
              >
                {opt.label}
              </StyledText>
              <Stack flex={1} />
              <StyledText fontSize={14} color={colors.text.tertiary}>›</StyledText>
            </StyledPressable>
          ))}
        </Stack>
      </Popup>

    </StyledPage>
  )
}

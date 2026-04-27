// ─────────────────────────────────────────────────────────────────────────────
// Vanta — SettingsScreen
//
// Layout: StyledPage
//         └── StyledHeader (back + title)
//         └── StyledScrollView
//               └── Notifications section (StyledForm.Switch rows)
//               └── Export defaults section
//               └── Storage section (usage bar)
//               └── Appearance section
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react'
import {
  StyledPage,
  StyledHeader,
  StyledScrollView,
  StyledPressable,
  StyledDivider,
  StyledSpacer,
  StyledProgressBar,
  StyledForm,
  Stack,
  StyledText,
  useToast,
} from 'fluent-styles'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { RootStackParamList } from '@/types'
import { useMode } from '@/hooks/useMode'
import { colors, spacing, radius, typography } from '@/theme'

type Props = NativeStackScreenProps<RootStackParamList, 'Settings'>

// ─── Section header ───────────────────────────────────────────────────────────

function SectionLabel({ label }: { label: string }) {
  return (
    <StyledText
      fontFamily={typography.family.semiBold}
      fontSize={typography.size.xs}
      color={colors.text.tertiary}
      paddingHorizontal={spacing[5]}
      paddingTop={spacing[5]}
      paddingBottom={spacing[2]}
      style={{ textTransform: 'uppercase', letterSpacing: 0.5 }}
    >
      {label}
    </StyledText>
  )
}

// ─── Toggle row ───────────────────────────────────────────────────────────────

function ToggleRow({
  label,
  sub,
  value,
  onChange,
  showDivider = true,
}: {
  label:       string
  sub?:        string
  value:       boolean
  onChange:    (v: boolean) => void
  showDivider?: boolean
}) {
  return (
    <>
      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        paddingVertical={spacing[3] + 2}
        paddingHorizontal={spacing[5]}
        gap={spacing[3]}
      >
        <Stack flex={1}>
          <StyledText
            fontFamily={typography.family.medium}
            fontSize={typography.size.base}
            color={colors.text.primary}
          >
            {label}
          </StyledText>
          {sub && (
            <StyledText
              fontFamily={typography.family.regular}
              fontSize={typography.size.xs}
              color={colors.text.secondary}
              marginTop={2}
            >
              {sub}
            </StyledText>
          )}
        </Stack>
        <StyledForm avoidKeyboard={false} gap={0}>
          <StyledForm.Switch value={value} onChange={onChange} size="sm" />
        </StyledForm>
      </Stack>
      {showDivider && (
        <StyledDivider
          borderBottomColor={colors.surface.borderLight}
          marginHorizontal={spacing[5]}
        />
      )}
    </>
  )
}

// ─── Select row ───────────────────────────────────────────────────────────────

function SelectRow({
  label,
  value,
  onPress,
  showDivider = true,
}: {
  label:        string
  value:        string
  onPress:      () => void
  showDivider?: boolean
}) {
  return (
    <>
      <StyledPressable
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        paddingVertical={spacing[3] + 2}
        paddingHorizontal={spacing[5]}
        onPress={onPress}
      >
        <StyledText
          fontFamily={typography.family.medium}
          fontSize={typography.size.base}
          color={colors.text.primary}
        >
          {label}
        </StyledText>
        <Stack flexDirection="row" alignItems="center" gap={spacing[2]}>
          <StyledText
            fontFamily={typography.family.regular}
            fontSize={typography.size.sm}
            color={colors.text.tertiary}
          >
            {value}
          </StyledText>
          <StyledText fontSize={14} color={colors.text.tertiary}>›</StyledText>
        </Stack>
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

// ─── Screen ───────────────────────────────────────────────────────────────────

export function SettingsScreen({ navigation }: Props) {
  const { modeColors } = useMode()
  const toast = useToast()

  // Notification prefs
  const [notifScan,    setNotifScan]    = useState(true)
  const [notifExport,  setNotifExport]  = useState(true)
  const [notifBackup,  setNotifBackup]  = useState(false)
  const [notifTips,    setNotifTips]    = useState(true)

  // Export defaults
  const [autoPDF,      setAutoPDF]      = useState(true)
  const [autoDrive,    setAutoDrive]    = useState(false)
  const [autoOCR,      setAutoOCR]      = useState(true)
  const [autoEnhance,  setAutoEnhance]  = useState(true)

  // Storage: mock 847MB used of 5GB
  const storageUsedMB  = 847
  const storageTotalMB = 5120
  const storagePct     = Math.round((storageUsedMB / storageTotalMB) * 100)

  return (
    <StyledPage flex={1} backgroundColor={colors.surface.page}>

      {/* ── Header ── */}
      <StyledHeader
        title="Settings"
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
      />

      <StyledScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >

        {/* ── Notifications ── */}
        <SectionLabel label="Notifications" />
        <Stack
          backgroundColor={colors.surface.card}
          borderTopWidth={0.5}
          borderBottomWidth={0.5}
          borderColor={colors.surface.borderLight}
        >
          <ToggleRow
            label="Scan complete"
            sub="Notify when a scan finishes processing"
            value={notifScan}
            onChange={setNotifScan}
          />
          <ToggleRow
            label="Export complete"
            sub="Notify when export to Drive / Notion finishes"
            value={notifExport}
            onChange={setNotifExport}
          />
          <ToggleRow
            label="Backup complete"
            sub="Notify when iCloud backup finishes"
            value={notifBackup}
            onChange={setNotifBackup}
          />
          <ToggleRow
            label="Tips & updates"
            sub="Occasional tips on getting the most from Vanta"
            value={notifTips}
            onChange={setNotifTips}
            showDivider={false}
          />
        </Stack>

        {/* ── Scan defaults ── */}
        <SectionLabel label="Scan defaults" />
        <Stack
          backgroundColor={colors.surface.card}
          borderTopWidth={0.5}
          borderBottomWidth={0.5}
          borderColor={colors.surface.borderLight}
        >
          <ToggleRow
            label="Auto-save as PDF"
            sub="Always generate a PDF after scanning"
            value={autoPDF}
            onChange={setAutoPDF}
          />
          <ToggleRow
            label="Auto-export to Drive"
            sub="Send every scan to Google Drive"
            value={autoDrive}
            onChange={setAutoDrive}
          />
          <ToggleRow
            label="Run OCR automatically"
            sub="Extract text from every scan"
            value={autoOCR}
            onChange={setAutoOCR}
          />
          <ToggleRow
            label="Auto-enhance"
            sub="Improve contrast and brightness automatically"
            value={autoEnhance}
            onChange={setAutoEnhance}
            showDivider={false}
          />
        </Stack>

        {/* ── Export destinations ── */}
        <SectionLabel label="Export" />
        <Stack
          backgroundColor={colors.surface.card}
          borderTopWidth={0.5}
          borderBottomWidth={0.5}
          borderColor={colors.surface.borderLight}
        >
          <SelectRow label="Default export format" value="PDF"          onPress={() => {}} />
          <SelectRow label="Google Drive folder"   value="Vanta Scans"  onPress={() => {}} />
          <SelectRow label="Notion database"       value="Not connected" onPress={() => {}} showDivider={false} />
        </Stack>

        {/* ── Storage ── */}
        <SectionLabel label="Storage" />
        <Stack
          backgroundColor={colors.surface.card}
          borderTopWidth={0.5}
          borderBottomWidth={0.5}
          borderColor={colors.surface.borderLight}
          padding={spacing[5]}
        >
          <Stack
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            marginBottom={spacing[3]}
          >
            <StyledText
              fontFamily={typography.family.semiBold}
              fontSize={typography.size.base}
              color={colors.text.primary}
            >
              Local storage
            </StyledText>
            <StyledText
              fontFamily={typography.family.regular}
              fontSize={typography.size.sm}
              color={colors.text.secondary}
            >
              {`${storageUsedMB} MB of ${(storageTotalMB / 1024).toFixed(0)} GB`}
            </StyledText>
          </Stack>

          <StyledProgressBar
            value={storagePct}
            size="sm"
            shape="pill"
            colors={{
              fill:  storagePct > 80
                ? colors.semantic.warning
                : modeColors.accent,
              track: colors.surface.secondary,
            }}
          />

          <StyledText
            fontFamily={typography.family.regular}
            fontSize={typography.size.xs}
            color={colors.text.tertiary}
            marginTop={spacing[2]}
          >
            {`${storagePct}% used · 247 documents`}
          </StyledText>

          <StyledDivider
            borderBottomColor={colors.surface.borderLight}
            marginVertical={spacing[4]}
          />

          <StyledPressable
            onPress={() => toast.success('Cache cleared')}
            paddingVertical={spacing[3]}
            borderRadius={radius.lg}
            alignItems="center"
            backgroundColor={colors.surface.secondary}
          >
            <StyledText
              fontFamily={typography.family.semiBold}
              fontSize={typography.size.sm}
              color={colors.text.secondary}
            >
              Clear cache
            </StyledText>
          </StyledPressable>
        </Stack>

        {/* ── Appearance ── */}
        <SectionLabel label="Appearance" />
        <Stack
          backgroundColor={colors.surface.card}
          borderTopWidth={0.5}
          borderBottomWidth={0.5}
          borderColor={colors.surface.borderLight}
        >
          <SelectRow label="Theme"      value="System"  onPress={() => {}} />
          <SelectRow label="App icon"   value="Default" onPress={() => {}} showDivider={false} />
        </Stack>

        <StyledSpacer height={spacing[6]} />

      </StyledScrollView>
    </StyledPage>
  )
}

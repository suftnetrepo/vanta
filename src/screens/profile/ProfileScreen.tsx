// ─────────────────────────────────────────────────────────────────────────────
// Vanta — ProfileScreen
//
// Layout: StyledPage
//         └── StyledHeader (title)
//         └── StyledScrollView
//               └── User card (avatar + name + mode)
//               └── Subscription tier card
//               └── Settings sections (mode, storage, export, account)
//               └── Sign out
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
  Stack,
  StyledText,
  useDialogue,
} from 'fluent-styles'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { RootStackParamList } from '@/types'
import { useMode }      from '@/hooks/useMode'
import { ModePill }     from '@/components/shared/ModePill'
import { colors, spacing, radius, typography } from '@/theme'

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>

// ─── Settings row ─────────────────────────────────────────────────────────────

interface SettingsRowProps {
  label:       string
  sub?:        string
  value?:      string
  iconBg:      string
  iconColor:   string
  iconShape:   string
  onPress?:    () => void
  showDivider?: boolean
  danger?:     boolean
}

function SettingsIcon({ shape, color }: { shape: string; color: string }) {
  if (shape === 'mode') {
    return (
      <Stack width={16} height={16} borderRadius={8} borderWidth={1.5} borderColor={color} alignItems="center" justifyContent="center">
        <Stack width={6} height={6} borderRadius={3} backgroundColor={color} />
      </Stack>
    )
  }
  if (shape === 'cloud') {
    return (
      <Stack alignItems="center" gap={1}>
        <Stack width={14} height={8} borderRadius={7} borderWidth={1.5} borderColor={color} />
        <Stack width={10} height={4} borderRadius={0} backgroundColor={color} opacity={0} />
        <Stack width={14} height={1.5} borderRadius={1} backgroundColor={color} />
      </Stack>
    )
  }
  if (shape === 'export') {
    return (
      <Stack alignItems="center" gap={1}>
        <Stack width={1.5} height={8} borderRadius={1} backgroundColor={color} />
        <Stack width={8} height={1.5} borderRadius={1} backgroundColor={color} />
        <Stack width={12} height={1.5} borderRadius={1} backgroundColor={color} />
      </Stack>
    )
  }
  if (shape === 'notify') {
    return (
      <Stack alignItems="center" gap={0}>
        <Stack width={12} height={12} borderRadius={6} borderWidth={1.5} borderColor={color} borderBottomLeftRadius={2} borderBottomRightRadius={2} />
        <Stack width={4} height={3} borderRadius={2} borderWidth={1.5} borderColor={color} marginTop={-1} />
      </Stack>
    )
  }
  if (shape === 'lock') {
    return (
      <Stack alignItems="center" gap={1}>
        <Stack width={10} height={6} borderRadius={5} borderWidth={1.5} borderColor={color} borderBottomWidth={0} />
        <Stack width={12} height={8} borderRadius={2} borderWidth={1.5} borderColor={color} alignItems="center" justifyContent="center">
          <Stack width={3} height={3} borderRadius={1.5} backgroundColor={color} />
        </Stack>
      </Stack>
    )
  }
  if (shape === 'trash') {
    return (
      <Stack alignItems="center" gap={1}>
        <Stack width={12} height={1.5} borderRadius={1} backgroundColor={color} />
        <Stack width={10} height={12} borderRadius={2} borderWidth={1.5} borderColor={color} />
      </Stack>
    )
  }
  return <Stack width={16} height={16} borderRadius={4} backgroundColor={color} />
}

function SettingsRow({
  label, sub, value, iconBg, iconColor, iconShape, onPress, showDivider = true, danger = false,
}: SettingsRowProps) {
  return (
    <>
      <StyledPressable
        onPress={onPress}
        flexDirection="row"
        alignItems="center"
        gap={spacing[3]}
        paddingVertical={spacing[3] + 2}
        paddingHorizontal={spacing[5]}
      >
        <Stack
          width={34}
          height={34}
          borderRadius={radius.md}
          backgroundColor={iconBg}
          alignItems="center"
          justifyContent="center"
          flexShrink={0}
        >
          <SettingsIcon shape={iconShape} color={iconColor} />
        </Stack>

        <Stack flex={1}>
          <StyledText
            fontFamily={typography.family.medium}
            fontSize={typography.size.base}
            color={danger ? colors.semantic.error : colors.text.primary}
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

        {value && (
          <StyledText
            fontFamily={typography.family.regular}
            fontSize={typography.size.sm}
            color={colors.text.tertiary}
          >
            {value}
          </StyledText>
        )}
        <StyledText fontSize={14} color={colors.text.tertiary}>›</StyledText>
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

// ─── Section label ────────────────────────────────────────────────────────────

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

// ─── Screen ───────────────────────────────────────────────────────────────────

export function ProfileScreen({ navigation }: Props) {
  const { isStudent, modeColors, mode } = useMode()
  const dialogue = useDialogue()

  const name   = isStudent ? 'Jamie Kim'   : 'Alex Hughes'
  const initials = isStudent ? 'JK'        : 'AH'
  const plan   = 'Vanta Pro'
  const planSub = isStudent ? 'Student · £2.99/month' : 'Business · £6.99/month'

  async function handleSignOut() {
    const confirmed = await dialogue.confirm({
      title:        'Sign out?',
      message:      'You will need to sign in again to access your documents.',
      icon:         '👋',
      confirmLabel: 'Sign out',
      cancelLabel:  'Cancel',
      theme:        'light',
    })
    if (confirmed) navigation.replace('Onboarding')
  }

  async function handleDeleteAccount() {
    const confirmed = await dialogue.confirm({
      title:        'Delete account?',
      message:      'All your documents and data will be permanently deleted. This cannot be undone.',
      icon:         '⚠️',
      confirmLabel: 'Delete',
      cancelLabel:  'Keep it',
      destructive:  true,
      theme:        'light',
    })
  }

  return (
    <StyledPage flex={1} backgroundColor={colors.surface.page}>

      {/* ── Header ── */}
      <StyledHeader
        title="Profile"
        titleAlignment="left"
        showStatusBar={false}
        backgroundColor={colors.surface.page}
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

        {/* ── User card ── */}
        <Stack
          flexDirection="row"
          alignItems="center"
          gap={spacing[4]}
          paddingHorizontal={spacing[5]}
          paddingTop={spacing[3]}
          paddingBottom={spacing[4]}
        >
          <Stack
            width={64}
            height={64}
            borderRadius={radius.full}
            backgroundColor={modeColors.accentLight}
            alignItems="center"
            justifyContent="center"
          >
            <StyledText
              fontFamily={typography.family.bold}
              fontSize={typography.size.h4}
              color={modeColors.accentText}
            >
              {initials}
            </StyledText>
          </Stack>

          <Stack flex={1}>
            <StyledText
              fontFamily={typography.family.bold}
              fontSize={typography.size.xl}
              color={colors.text.primary}
            >
              {name}
            </StyledText>
            <StyledText
              fontFamily={typography.family.regular}
              fontSize={typography.size.sm}
              color={colors.text.secondary}
              marginTop={2}
            >
              jamie@example.com
            </StyledText>
            <Stack marginTop={spacing[2]}>
              <ModePill />
            </Stack>
          </Stack>
        </Stack>

        <StyledDivider borderBottomColor={colors.surface.borderLight} />

        {/* ── Subscription card ── */}
        <Stack
          marginHorizontal={spacing[5]}
          marginTop={spacing[4]}
          backgroundColor={modeColors.accentLight}
          borderRadius={radius.xl}
          padding={spacing[4]}
          borderWidth={0.5}
          borderColor={modeColors.accentMid}
        >
          <Stack
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack>
              <StyledText
                fontFamily={typography.family.bold}
                fontSize={typography.size.lg}
                color={modeColors.accentText}
              >
                {plan}
              </StyledText>
              <StyledText
                fontFamily={typography.family.regular}
                fontSize={typography.size.sm}
                color={modeColors.accentText}
                marginTop={2}
                opacity={0.7}
              >
                {planSub}
              </StyledText>
            </Stack>

            <Stack
              paddingHorizontal={spacing[3]}
              paddingVertical={spacing[1]}
              borderRadius={radius.full}
              backgroundColor={modeColors.accent}
            >
              <StyledText
                fontFamily={typography.family.semiBold}
                fontSize={typography.size.xs}
                color={colors.brand.white}
              >
                Active
              </StyledText>
            </Stack>
          </Stack>

          <StyledPressable
            marginTop={spacing[3]}
            paddingVertical={spacing[2] + 2}
            borderRadius={radius.lg}
            alignItems="center"
            backgroundColor="rgba(0,0,0,0.08)"
          >
            <StyledText
              fontFamily={typography.family.semiBold}
              fontSize={typography.size.sm}
              color={modeColors.accentText}
            >
              Manage subscription
            </StyledText>
          </StyledPressable>
        </Stack>

        {/* ── Mode section ── */}
        <SectionLabel label="Mode" />
        <Stack
          backgroundColor={colors.surface.card}
          borderTopWidth={0.5}
          borderBottomWidth={0.5}
          borderColor={colors.surface.borderLight}
        >
          <SettingsRow
            label={isStudent ? 'Student mode' : 'Business mode'}
            sub="Tap to switch modes"
            iconBg={modeColors.accentLight}
            iconColor={modeColors.accent}
            iconShape="mode"
            showDivider={false}
          />
        </Stack>

        {/* ── Storage section ── */}
        <SectionLabel label="Storage & Sync" />
        <Stack
          backgroundColor={colors.surface.card}
          borderTopWidth={0.5}
          borderBottomWidth={0.5}
          borderColor={colors.surface.borderLight}
        >
          <SettingsRow
            label="iCloud backup"
            sub="Last synced: Today 03:41"
            iconBg="#E6F1FB"
            iconColor="#185FA5"
            iconShape="cloud"
          />
          <SettingsRow
            label="Export defaults"
            sub="PDF + Google Drive"
            iconBg={colors.business.accentLight}
            iconColor={colors.business.accent}
            iconShape="export"
            showDivider={false}
          />
        </Stack>

        {/* ── Preferences section ── */}
        <SectionLabel label="Preferences" />
        <Stack
          backgroundColor={colors.surface.card}
          borderTopWidth={0.5}
          borderBottomWidth={0.5}
          borderColor={colors.surface.borderLight}
        >
          <SettingsRow
            label="Notifications"
            value="On"
            iconBg="#FAEEDA"
            iconColor="#854F0B"
            iconShape="notify"
          />
          <SettingsRow
            label="App lock"
            value="Face ID"
            iconBg={colors.surface.secondary}
            iconColor={colors.text.secondary}
            iconShape="lock"
            showDivider={false}
          />
        </Stack>

        {/* ── Account section ── */}
        <SectionLabel label="Account" />
        <Stack
          backgroundColor={colors.surface.card}
          borderTopWidth={0.5}
          borderBottomWidth={0.5}
          borderColor={colors.surface.borderLight}
        >
          <SettingsRow
            label="Sign out"
            iconBg={colors.surface.secondary}
            iconColor={colors.text.secondary}
            iconShape="mode"
            onPress={handleSignOut}
          />
          <SettingsRow
            label="Delete account"
            iconBg={colors.semantic.errorBg}
            iconColor={colors.semantic.error}
            iconShape="trash"
            onPress={handleDeleteAccount}
            showDivider={false}
            danger
          />
        </Stack>

        <StyledSpacer height={spacing[6]} />

        {/* Version */}
        <StyledText
          fontFamily={typography.family.regular}
          fontSize={typography.size.xs}
          color={colors.text.tertiary}
          textAlign="center"
        >
          Vanta v1.0.0
        </StyledText>

      </StyledScrollView>
    </StyledPage>
  )
}

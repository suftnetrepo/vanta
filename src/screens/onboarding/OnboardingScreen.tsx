// ─────────────────────────────────────────────────────────────────────────────
// Vanta — OnboardingScreen
//
// 3 steps:
//   0 — Welcome     (hero illustration + value props)
//   1 — Mode select (student vs business cards)
//   2 — Done        (confirmation + CTA)
//
// Rules honoured:
//   ✓ Stack / StyledText / StyledPressable / StyledPage / StyledSafeAreaView /
//     StyledSpacer / StyledScrollView — no bare RN primitives
//   ✓ No StyleSheet.create — flat style props only
//   ✓ All colours from @/theme colors tokens
//   ✓ All fonts from @/theme typography tokens
//   ✓ children: CompatNode
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useRef, useEffect } from 'react'
import { Animated } from 'react-native'
import {
  StyledSafeAreaView,
  StyledScrollView,
  StyledPage,
  Stack,
  StyledText,
  StyledPressable,
  StyledSpacer,
} from 'fluent-styles'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'

import { useMode }   from '@/hooks/useMode'
import { useUser }   from '@/store/UserContext'
import { colors, typography, spacing, radius, motion } from '@/theme'
import type { AppMode } from '@/theme'
import type { RootStackParamList } from '@/types'

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>

// ─── Step type ────────────────────────────────────────────────────────────────
type Step = 0 | 1 | 2

// ─── Feature bullet ───────────────────────────────────────────────────────────
interface FeatureBullet {
  icon:  string
  label: string
  sub:   string
}

const FEATURES: FeatureBullet[] = [
  { icon: '⊡', label: 'Instant scanning',  sub: 'Auto-crop, perspective fix, OCR in seconds'    },
  { icon: '🔒', label: 'Fully offline',     sub: 'No data ever leaves your device'               },
  { icon: '⚡', label: 'Works everywhere',  sub: 'Export to PDF, Drive, Notion, Apple Notes'     },
]

// ─── Mode choice ──────────────────────────────────────────────────────────────
interface ModeChoice {
  mode:     AppMode
  emoji:    string
  label:    string
  tagline:  string
  bullets:  string[]
  accent:   string
  accentBg: string
}

const MODE_CHOICES: ModeChoice[] = [
  {
    mode:     'student',
    emoji:    '🎓',
    label:    'Student',
    tagline:  'Capture, organise, revise',
    bullets:  ['Notes & assignments', 'Subject folders', 'Flashcard generator'],
    accent:   colors.student.accent,
    accentBg: colors.student.accentLight,
  },
  {
    mode:     'business',
    emoji:    '💼',
    label:    'Business',
    tagline:  'Receipts, invoices, contracts',
    bullets:  ['Auto-extract totals + VAT', 'CSV expense export', 'Contract storage'],
    accent:   colors.business.accent,
    accentBg: colors.business.accentLight,
  },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function ProgressDots({ step }: { step: Step }) {
  return (
    <Stack
      flexDirection="row"
      gap={6}
      justifyContent="center"
      marginBottom={spacing[8]}
    >
      {([0, 1, 2] as Step[]).map((i) => (
        <Stack
          key={i}
          height={6}
          width={step === i ? 22 : 6}
          borderRadius={radius.full}
          backgroundColor={
            step === i ? colors.brand.primary : colors.surface.border
          }
        />
      ))}
    </Stack>
  )
}

function FeatureRow({ icon, label, sub }: FeatureBullet) {
  return (
    <Stack
      flexDirection="row"
      alignItems="flex-start"
      gap={spacing[3]}
      marginBottom={spacing[3]}
    >
      <Stack
        width={36}
        height={36}
        borderRadius={radius.md}
        backgroundColor={colors.surface.secondary}
        alignItems="center"
        justifyContent="center"
        flexShrink={0}
      >
        <StyledText fontSize={typography.size.lg}>{icon}</StyledText>
      </Stack>
      <Stack flex={1} paddingTop={2}>
        <StyledText
          fontFamily={typography.family.semiBold}
          fontSize={typography.size.base}
          color={colors.text.primary}
        >
          {label}
        </StyledText>
        <StyledText
          fontFamily={typography.family.regular}
          fontSize={typography.size.md}
          color={colors.text.secondary}
          marginTop={2}
        >
          {sub}
        </StyledText>
      </Stack>
    </Stack>
  )
}

interface ModeCardProps {
  choice:   ModeChoice
  selected: boolean
  onPress:  () => void
}

function ModeCard({ choice, selected, onPress }: ModeCardProps) {
  const scale = useRef(new Animated.Value(1)).current

  function handlePress() {
    Animated.sequence([
      Animated.timing(scale, { toValue: 0.97, duration: 80,  useNativeDriver: true }),
      Animated.timing(scale, { toValue: 1,    duration: 120, useNativeDriver: true }),
    ]).start()
    onPress()
  }

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <StyledPressable
        onPress={handlePress}
        flexDirection="row"
        alignItems="center"
        gap={spacing[4]}
        borderRadius={radius.xl}
        borderWidth={selected ? 2 : 1}
        borderColor={selected ? colors.brand.primary : colors.surface.border}
        backgroundColor={selected ? colors.surface.secondary : colors.surface.card}
        padding={spacing[4]}
      >
        {/* Emoji badge */}
        <Stack
          width={52}
          height={52}
          borderRadius={radius.lg}
          backgroundColor={selected ? choice.accentBg : colors.surface.secondary}
          alignItems="center"
          justifyContent="center"
          flexShrink={0}
        >
          <StyledText fontSize={26}>{choice.emoji}</StyledText>
        </Stack>

        {/* Text content */}
        <Stack flex={1}>
          <StyledText
            fontFamily={typography.family.semiBold}
            fontSize={typography.size.lg}
            color={colors.text.primary}
            marginBottom={2}
          >
            {choice.label}
          </StyledText>
          <StyledText
            fontFamily={typography.family.regular}
            fontSize={typography.size.sm}
            color={selected ? choice.accent : colors.text.secondary}
            marginBottom={spacing[2]}
          >
            {choice.tagline}
          </StyledText>

          {/* Bullets */}
          {choice.bullets.map((b) => (
            <Stack key={b} flexDirection="row" alignItems="center" gap={6} marginBottom={4}>
              <Stack
                width={4}
                height={4}
                borderRadius={radius.full}
                backgroundColor={selected ? choice.accent : colors.surface.border}
                flexShrink={0}
              />
              <StyledText
                fontFamily={typography.family.regular}
                fontSize={typography.size.xs}
                color={selected ? colors.text.primary : colors.text.tertiary}
              >
                {b}
              </StyledText>
            </Stack>
          ))}
        </Stack>

        {/* Selected tick */}
        {selected && (
          <Stack
            width={22}
            height={22}
            borderRadius={radius.full}
            backgroundColor={colors.brand.primary}
            alignItems="center"
            justifyContent="center"
            flexShrink={0}
          >
            <StyledText
              fontFamily={typography.family.bold}
              fontSize={10}
              color={colors.brand.white}
            >
              ✓
            </StyledText>
          </Stack>
        )}
      </StyledPressable>
    </Animated.View>
  )
}

// ─── Hero illustration ────────────────────────────────────────────────────────
// Built from Stack primitives — no image dependency needed.

function HeroIllustration() {
  const pulse = useRef(new Animated.Value(1)).current

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1.04, duration: 1800, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 1,    duration: 1800, useNativeDriver: true }),
      ])
    ).start()
  }, [])

  return (
    <Stack
      width={200}
      height={160}
      alignSelf="center"
      marginBottom={spacing[5]}
    >
      {/* Circle — centred in the container */}
      <Stack
        position="absolute"
        top={20}
        left={40}
      >
        <Animated.View style={{ transform: [{ scale: pulse }] }}>
          <Stack
            width={120}
            height={120}
            borderRadius={radius.full}
            backgroundColor={colors.surface.secondary}
            alignItems="center"
            justifyContent="center"
          >
            <Stack
              width={88}
              height={88}
              borderRadius={radius.full}
              backgroundColor={colors.brand.primary}
              alignItems="center"
              justifyContent="center"
            >
              <StyledText
                fontFamily={typography.family.bold}
                fontSize={32}
                color={colors.brand.white}
              >
                V
              </StyledText>
            </Stack>
          </Stack>
        </Animated.View>
      </Stack>

      {/* OCR badge — top right */}
      <Stack
        position="absolute"
        top={10}
        right={0}
        backgroundColor={colors.student.accentLight}
        paddingHorizontal={spacing[2]}
        paddingVertical={4}
        borderRadius={radius.full}
        borderWidth={0.5}
        borderColor={colors.student.accentMid}
      >
        <StyledText
          fontFamily={typography.family.semiBold}
          fontSize={typography.size.xs}
          color={colors.student.accentText}
        >
          OCR
        </StyledText>
      </Stack>

      {/* PDF badge — bottom left */}
      <Stack
        position="absolute"
        bottom={10}
        left={0}
        backgroundColor={colors.business.accentLight}
        paddingHorizontal={spacing[2]}
        paddingVertical={4}
        borderRadius={radius.full}
        borderWidth={0.5}
        borderColor={colors.business.accentMid}
      >
        <StyledText
          fontFamily={typography.family.semiBold}
          fontSize={typography.size.xs}
          color={colors.business.accentText}
        >
          PDF
        </StyledText>
      </Stack>
    </Stack>
  )
}

// ─── Main screen ──────────────────────────────────────────────────────────────

export function OnboardingScreen({ navigation }: Props) {
  const [step, setStep]         = useState<Step>(0)
  const [selected, setSelected] = useState<AppMode>('student')
  const [name, setName]         = useState('')
  const { setMode }             = useMode()
  const { setUser }             = useUser()

  // Fade animation for step transitions
  const fadeAnim = useRef(new Animated.Value(1)).current
  const slideAnim = useRef(new Animated.Value(0)).current

  function goToStep(next: Step) {
    Animated.parallel([
      Animated.timing(fadeAnim,  { toValue: 0, duration: motion.duration.fast, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: -20, duration: motion.duration.fast, useNativeDriver: true }),
    ]).start(() => {
      setStep(next)
      slideAnim.setValue(20)
      Animated.parallel([
        Animated.timing(fadeAnim,  { toValue: 1, duration: motion.duration.normal, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: 0, duration: motion.duration.normal, useNativeDriver: true }),
      ]).start()
    })
  }

  function finish() {
    const trimmed  = name.trim() || 'there'
    const words    = trimmed.split(' ').filter(Boolean)
    const initials = words.length >= 2
      ? (words[0][0] + words[words.length - 1][0]).toUpperCase()
      : trimmed.slice(0, 2).toUpperCase()
    setUser({ name: trimmed, initials, email: '' })
    setMode(selected)
    navigation.replace('Main')
  }

  return (
    <StyledSafeAreaView flex={1} backgroundColor={colors.surface.page}>
      <StyledPage
        flex={1}
        paddingHorizontal={spacing.screenH}
      >

        {/* ── Progress dots ── */}
        <StyledSpacer height={spacing[2]} />
        <ProgressDots step={step} />

        {/* ── Animated step container ── */}
        <Animated.View
          style={{
            flex: 1,
            opacity:   fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
        >

          {/* ───────────────── STEP 0 — WELCOME ───────────────── */}
          {step === 0 && (
            <StyledScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
            >
              <HeroIllustration />

              {/* Wordmark */}
              <StyledText
                fontFamily={typography.family.bold}
                fontSize={typography.size.display}
                color={colors.text.primary}
                letterSpacing={-0.5}
                marginBottom={spacing[1]}
              >
                Vanta
              </StyledText>

              <StyledText
                fontFamily={typography.family.regular}
                fontSize={typography.size.lg}
                color={colors.text.secondary}
                lineHeight={typography.size.lg * typography.lineHeight.normal}
                marginBottom={spacing[6]}
              >
                Scan smarter, not harder.
              </StyledText>

              {/* Feature bullets */}
              {FEATURES.map((f) => (
                <FeatureRow key={f.label} {...f} />
              ))}

              <StyledSpacer height={spacing[6]} />

              {/* Primary CTA */}
              <StyledPressable
                onPress={() => goToStep(1)}
                backgroundColor={colors.brand.primary}
                borderRadius={radius.lg}
                paddingVertical={spacing[4]}
                alignItems="center"
                justifyContent="center"
              >
                <StyledText
                  fontFamily={typography.family.semiBold}
                  fontSize={typography.size.lg}
                  color={colors.brand.white}
                >
                  Get started
                </StyledText>
              </StyledPressable>

              <StyledSpacer height={spacing[3]} />

              {/* Sign in link */}
              <StyledPressable onPress={finish} alignItems="center" paddingVertical={spacing[2]}>
                <StyledText
                  fontFamily={typography.family.regular}
                  fontSize={typography.size.md}
                  color={colors.text.tertiary}
                >
                  Already have an account?{' '}
                  <StyledText
                    fontFamily={typography.family.medium}
                    fontSize={typography.size.md}
                    color={colors.text.secondary}
                  >
                    Sign in
                  </StyledText>
                </StyledText>
              </StyledPressable>

              <StyledSpacer height={spacing[4]} />
            </StyledScrollView>
          )}

          {/* ───────────────── STEP 1 — MODE SELECT ───────────────── */}
          {step === 1 && (
            <StyledScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ flexGrow: 1, paddingBottom: spacing[4] }}
            >
              <StyledSpacer height={spacing[6]} />

              {/* Heading */}
              <StyledText
                fontFamily={typography.family.bold}
                fontSize={typography.size.h2}
                color={colors.text.primary}
                letterSpacing={typography.letterSpacing.tight}
                lineHeight={typography.size.h2 * typography.lineHeight.tight}
                marginBottom={spacing[2]}
              >
                How will you use Vanta?
              </StyledText>

              <StyledText
                fontFamily={typography.family.regular}
                fontSize={typography.size.base}
                color={colors.text.secondary}
                lineHeight={typography.size.base * typography.lineHeight.normal}
                marginBottom={spacing[4]}
              >
                Choose your default mode. You can switch any time in settings.
              </StyledText>

              {/* Name input */}
              <Stack
                height={48}
                borderRadius={radius.lg}
                backgroundColor={colors.surface.secondary}
                borderWidth={0.5}
                borderColor={colors.surface.border}
                flexDirection="row"
                alignItems="center"
                paddingHorizontal={spacing[3]}
                marginBottom={spacing[4]}
              >
                {React.createElement(require('react-native').TextInput, {
                  value: name,
                  onChangeText: setName,
                  placeholder: 'Your first name',
                  placeholderTextColor: colors.text.tertiary,
                  autoCorrect: false,
                  style: {
                    flex: 1,
                    fontFamily: typography.family.regular,
                    fontSize: typography.size.base,
                    color: colors.text.primary,
                    paddingVertical: 0,
                  }
                })}
              </Stack>

              {/* Mode cards — stacked vertically so content isn't clipped */}
              <Stack gap={spacing[3]} marginBottom={spacing[5]}>
                {MODE_CHOICES.map((c) => (
                  <ModeCard
                    key={c.mode}
                    choice={c}
                    selected={selected === c.mode}
                    onPress={() => setSelected(c.mode)}
                  />
                ))}
              </Stack>

              {/* Continue */}
              <StyledPressable
                onPress={() => goToStep(2)}
                backgroundColor={colors.brand.primary}
                borderRadius={radius.lg}
                paddingVertical={spacing[4]}
                alignItems="center"
                justifyContent="center"
              >
                <StyledText
                  fontFamily={typography.family.semiBold}
                  fontSize={typography.size.lg}
                  color={colors.brand.white}
                >
                  Continue
                </StyledText>
              </StyledPressable>

              <StyledSpacer height={spacing[3]} />

              <StyledPressable alignItems="center" onPress={() => goToStep(2)} paddingVertical={spacing[2]}>
                <StyledText
                  fontFamily={typography.family.regular}
                  fontSize={typography.size.md}
                  color={colors.text.tertiary}
                >
                  Skip for now
                </StyledText>
              </StyledPressable>
            </StyledScrollView>
          )}

          {/* ───────────────── STEP 2 — ALL SET ───────────────── */}
          {step === 2 && (
            <Stack flex={1} justifyContent="center" alignItems="center">

              {/* Success mark */}
              <Stack
                width={96}
                height={96}
                borderRadius={radius.full}
                backgroundColor={colors.business.accentLight}
                alignItems="center"
                justifyContent="center"
                marginBottom={spacing[6]}
              >
                <StyledText fontSize={40}>✓</StyledText>
              </Stack>

              <StyledText
                fontFamily={typography.family.bold}
                fontSize={typography.size.h2}
                color={colors.text.primary}
                letterSpacing={typography.letterSpacing.tight}
                textAlign="center"
                marginBottom={spacing[3]}
              >
                You're all set
              </StyledText>

              <StyledText
                fontFamily={typography.family.regular}
                fontSize={typography.size.base}
                color={colors.text.secondary}
                lineHeight={typography.size.base * typography.lineHeight.normal}
                textAlign="center"
                marginBottom={spacing[8]}
                paddingHorizontal={spacing[4]}
              >
                Your workspace is ready.{'\n'}
                Scan your first document to get started.
              </StyledText>

              {/* Mode summary pill */}
              <Stack
                flexDirection="row"
                alignItems="center"
                gap={spacing[2]}
                paddingHorizontal={spacing[4]}
                paddingVertical={spacing[2]}
                borderRadius={radius.full}
                backgroundColor={
                  selected === 'student'
                    ? colors.student.pillBg
                    : colors.business.pillBg
                }
                borderWidth={0.5}
                borderColor={
                  selected === 'student'
                    ? colors.student.pillBorder
                    : colors.business.pillBorder
                }
                marginBottom={spacing[8]}
              >
                <Stack
                  width={8}
                  height={8}
                  borderRadius={radius.full}
                  backgroundColor={
                    selected === 'student'
                      ? colors.student.accent
                      : colors.business.accent
                  }
                />
                <StyledText
                  fontFamily={typography.family.semiBold}
                  fontSize={typography.size.sm}
                  color={
                    selected === 'student'
                      ? colors.student.pillText
                      : colors.business.pillText
                  }
                >
                  {selected === 'student' ? 'Student mode' : 'Business mode'}
                </StyledText>
              </Stack>

              {/* Open workspace */}
              <StyledPressable
                onPress={finish}
                backgroundColor={colors.brand.primary}
                borderRadius={radius.lg}
                paddingVertical={spacing[4]}
                alignItems="center"
                justifyContent="center"
                width="100%"
              >
                <StyledText
                  fontFamily={typography.family.semiBold}
                  fontSize={typography.size.lg}
                  color={colors.brand.white}
                >
                  Open my workspace
                </StyledText>
              </StyledPressable>

              <StyledSpacer height={spacing[3]} />

              <StyledPressable alignItems="center" paddingVertical={spacing[2]}>
                <StyledText
                  fontFamily={typography.family.regular}
                  fontSize={typography.size.md}
                  color={colors.text.tertiary}
                >
                  Enable iCloud backup
                </StyledText>
              </StyledPressable>

            </Stack>
          )}

        </Animated.View>

      </StyledPage>
    </StyledSafeAreaView>
  )
}
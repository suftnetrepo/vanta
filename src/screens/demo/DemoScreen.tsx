// ─────────────────────────────────────────────────────────────────────────────
// Vanta — DemoScreen
// Required by project rules: every component needs a matching demo entry.
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react'
import {
  StyledSafeAreaView,
  StyledScrollView,
  Stack,
  StyledText,
  StyledDivider,
  StyledSpacer,
} from 'fluent-styles'

import { ModePill }        from '@/components/shared/ModePill'
import { DocTypeBadge }    from '@/components/shared/DocTypeBadge'
import { DocRow }          from '@/components/shared/DocRow'
import { SectionHeader }   from '@/components/shared/SectionHeader'
import { ScanButton }      from '@/components/home/ScanButton'
import { QuickActionCard } from '@/components/home/QuickActionCard'
import { StatCard }        from '@/components/home/StatCard'
import { ModeProvider }    from '@/store/ModeContext'
import { colors, spacing, typography, radius } from '@/theme'

function DemoSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Stack marginBottom={spacing[6]}>
      <StyledText
        fontFamily={typography.family.semiBold}
        fontSize={typography.size.xs}
        color={colors.text.tertiary}
        marginBottom={spacing[3]}
        marginHorizontal={spacing[5]}
        style={{ textTransform: 'uppercase', letterSpacing: 0.5 }}
      >
        {title}
      </StyledText>
      {children}
    </Stack>
  )
}

export function DemoScreen() {
  return (
    <StyledSafeAreaView flex={1} backgroundColor={colors.surface.page}>
      <StyledScrollView showsVerticalScrollIndicator={false}>
        <StyledSpacer height={spacing[4]} />

        <StyledText
          fontFamily={typography.family.bold}
          fontSize={typography.size.h2}
          color={colors.text.primary}
          marginHorizontal={spacing[5]}
          marginBottom={spacing[6]}
        >
          Component demo
        </StyledText>

        {/* ModePill */}
        <DemoSection title="ModePill — student">
          <Stack marginHorizontal={spacing[5]}>
            <ModeProvider initial="student"><ModePill /></ModeProvider>
          </Stack>
        </DemoSection>

        <DemoSection title="ModePill — business">
          <Stack marginHorizontal={spacing[5]}>
            <ModeProvider initial="business"><ModePill /></ModeProvider>
          </Stack>
        </DemoSection>

        <StyledDivider borderBottomColor={colors.surface.borderLight} marginBottom={spacing[6]} />

        {/* DocTypeBadge */}
        <DemoSection title="DocTypeBadge — all types">
          <Stack flexDirection="row" flexWrap="wrap" gap={spacing[2]} marginHorizontal={spacing[5]}>
            {(['notes','assign','reading','receipt','invoice','contract','pdf','other'] as const).map((t) => (
              <DocTypeBadge key={t} type={t} />
            ))}
          </Stack>
        </DemoSection>

        <StyledDivider borderBottomColor={colors.surface.borderLight} marginBottom={spacing[6]} />

        {/* DocRow */}
        <DemoSection title="DocRow">
          <DocRow name="Lecture notes — Biochem wk 7" meta="Today, 2:14 PM · 3 pages" thumbLabel="PDF" docType="notes" />
          <DocRow name="Invoice — Webflow Pro Oct" meta="Today · £299.00" thumbLabel="INV" docType="invoice" showDivider={false} />
        </DemoSection>

        <StyledDivider borderBottomColor={colors.surface.borderLight} marginBottom={spacing[6]} />

        {/* SectionHeader */}
        <DemoSection title="SectionHeader">
          <SectionHeader label="Recent scans" actionLabel="See all" />
          <SectionHeader label="Quick actions" />
        </DemoSection>

        <StyledDivider borderBottomColor={colors.surface.borderLight} marginBottom={spacing[6]} />

        {/* ScanButton */}
        <DemoSection title="ScanButton — student">
          <ModeProvider initial="student"><ScanButton onPress={() => {}} /></ModeProvider>
        </DemoSection>
        <DemoSection title="ScanButton — business">
          <ModeProvider initial="business"><ScanButton onPress={() => {}} /></ModeProvider>
        </DemoSection>

        <StyledDivider borderBottomColor={colors.surface.borderLight} marginBottom={spacing[6]} />

        {/* QuickActionCard */}
        <DemoSection title="QuickActionCard">
          <Stack flexDirection="row" gap={spacing[2]} marginHorizontal={spacing[5]}>
            <Stack flex={1}>
              <QuickActionCard icon={<StyledText fontSize={17}>📂</StyledText>} iconBg={colors.student.accentLight} label="Subject folders" sub="8 subjects" />
            </Stack>
            <Stack flex={1}>
              <QuickActionCard icon={<StyledText fontSize={17}>🧾</StyledText>} iconBg={colors.student.accentLight} label="Invoices" sub="12 this month" />
            </Stack>
          </Stack>
        </DemoSection>

        <StyledDivider borderBottomColor={colors.surface.borderLight} marginBottom={spacing[6]} />

        {/* StatCard */}
        <DemoSection title="StatCard">
          <Stack flexDirection="row" gap={spacing[2]} marginHorizontal={spacing[5]}>
            <StatCard label="This month" value="£1,842" sub="Expenses logged" />
            <StatCard label="Scans" value="47" sub="Docs this month" />
          </Stack>
        </DemoSection>

        <StyledSpacer height={spacing[8]} />
      </StyledScrollView>
    </StyledSafeAreaView>
  )
}

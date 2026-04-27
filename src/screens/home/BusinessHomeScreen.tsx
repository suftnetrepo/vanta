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
import { StatCard }        from '@/components/home/StatCard'
import { DocRow }          from '@/components/shared/DocRow'
import { SectionHeader }   from '@/components/shared/SectionHeader'
import { useUser, getGreeting } from '@/store/UserContext'
import { colors, spacing, radius, typography } from '@/theme'

type Props = NativeStackScreenProps<RootStackParamList, 'BusinessHome'>

function ActionIcon({ shape, color }: { shape: string; color: string }) {
  if (shape === 'receipt') {
    return (
      <Stack width={14} height={18} borderRadius={2} borderWidth={1.5} borderColor={color} padding={2} gap={2}>
        <Stack width="100%" height={1.5} borderRadius={1} backgroundColor={color} />
        <Stack width="70%"  height={1.5} borderRadius={1} backgroundColor={color} />
        <Stack width="85%"  height={1.5} borderRadius={1} backgroundColor={color} />
      </Stack>
    )
  }
  if (shape === 'chart') {
    return (
      <Stack flexDirection="row" alignItems="flex-end" gap={2} height={16}>
        <Stack width={4} height={8}  borderRadius={1} backgroundColor={color} opacity={0.5} />
        <Stack width={4} height={14} borderRadius={1} backgroundColor={color} opacity={0.8} />
        <Stack width={4} height={10} borderRadius={1} backgroundColor={color} opacity={0.6} />
        <Stack width={4} height={16} borderRadius={1} backgroundColor={color} />
      </Stack>
    )
  }
  if (shape === 'contract') {
    return (
      <Stack width={14} height={18} borderRadius={2} borderWidth={1.5} borderColor={color} padding={3} gap={2}>
        <Stack width="100%" height={1.5} borderRadius={1} backgroundColor={color} />
        <Stack width="80%"  height={1.5} borderRadius={1} backgroundColor={color} />
        <Stack width="60%"  height={1.5} borderRadius={1} backgroundColor={color} />
        <Stack width="90%"  height={1.5} borderRadius={1} backgroundColor={color} />
      </Stack>
    )
  }
  if (shape === 'barcode') {
    return (
      <Stack flexDirection="row" alignItems="stretch" gap={1} height={16}>
        {[3, 1.5, 3, 1.5, 2, 3, 1.5].map((w, i) => (
          <Stack key={i} width={w} backgroundColor={color} borderRadius={0.5}
            opacity={i % 2 === 0 ? 1 : 0.4}
          />
        ))}
      </Stack>
    )
  }
  return <Stack width={18} height={18} borderRadius={4} backgroundColor={color} />
}

const QUICK_ACTIONS = [
  { key: 'invoices',  iconBg: colors.student.accentLight,  iconColor: colors.student.accent,  iconShape: 'receipt',  label: 'Invoices',     sub: '12 this month'     },
  { key: 'expenses',  iconBg: colors.business.accentLight, iconColor: colors.business.accent, iconShape: 'chart',    label: 'Expenses',     sub: 'Export to CSV'     },
  { key: 'contracts', iconBg: '#E6F1FB',                   iconColor: '#185FA5',              iconShape: 'contract', label: 'Contracts',    sub: 'Sign + store'      },
  { key: 'barcode',   iconBg: '#FCEBEB',                   iconColor: '#A32D2D',              iconShape: 'barcode',  label: 'Barcode scan', sub: 'Inventory + stock' },
] as const

const RECENT_DOCS = [
  { name: 'Invoice — Webflow Pro Oct', meta: 'Today · £299.00 · VAT extracted', thumbLabel: 'INV', docType: 'invoice'  as const },
  { name: 'Receipt — Office supplies', meta: 'Yesterday · £47.20',              thumbLabel: 'RCT', docType: 'receipt'  as const },
  { name: 'Contract — Client NDA',     meta: 'Mon · Signed',                    thumbLabel: 'PDF', docType: 'contract' as const },
]

export function BusinessHomeScreen({ navigation }: Props) {
  const { user } = useUser()

  return (
    <StyledPage flex={1} backgroundColor={colors.surface.page} showStatusBar={false}>

      {/* ── Custom header row ── */}
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

        <Stack
          width={38} height={38}
          borderRadius={radius.full}
          backgroundColor={colors.business.accentLight}
          alignItems="center"
          justifyContent="center"
          marginTop={4}
        >
          <StyledText
            fontFamily={typography.family.semiBold}
            fontSize={typography.size.sm}
            color={colors.business.accentText}
          >
            {user.initials}
          </StyledText>
        </Stack>
      </Stack>

      <StyledScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Stat cards */}
        <Stack flexDirection="row" gap={spacing[2]}
          paddingHorizontal={spacing[5]} marginTop={spacing[3]}
        >
          <StatCard label="This month" value="£1,842" sub="Expenses logged" />
          <StatCard label="Scans"      value="47"     sub="Docs this month" />
        </Stack>

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
          label="Recent documents"
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

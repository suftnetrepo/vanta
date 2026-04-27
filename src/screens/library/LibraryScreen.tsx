import React, { useState } from 'react'
import {
  TextInput,
} from 'react-native'
import {
  StyledPage,
  StyledHeader,
  StyledScrollView,
  StyledChip,
  StyledBadge,
  StyledDivider,
  StyledPressable,
  StyledSpacer,
  Stack,
  StyledText,
} from 'fluent-styles'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { RootStackParamList } from '@/types'
import { useMode }      from '@/hooks/useMode'
import { DocRow }       from '@/components/shared/DocRow'
import { colors, spacing, radius, typography } from '@/theme'

type Props = NativeStackScreenProps<RootStackParamList, 'Library'>
type FilterKey = 'all' | 'notes' | 'assign' | 'reading' | 'invoice' | 'receipt' | 'contract' | 'pdf'

interface FilterOption {
  key:   FilterKey
  label: string
  modes: ('student' | 'business' | 'both')[]
}

const FILTERS: FilterOption[] = [
  { key: 'all',      label: 'All',         modes: ['both']     },
  { key: 'notes',    label: 'Notes',       modes: ['student']  },
  { key: 'assign',   label: 'Assignments', modes: ['student']  },
  { key: 'reading',  label: 'Reading',     modes: ['student']  },
  { key: 'invoice',  label: 'Invoices',    modes: ['business'] },
  { key: 'receipt',  label: 'Receipts',    modes: ['business'] },
  { key: 'contract', label: 'Contracts',   modes: ['business'] },
  { key: 'pdf',      label: 'PDF',         modes: ['both']     },
]

const STUDENT_FOLDERS = [
  { key: 'biochem', label: 'Biochemistry',    count: 14, color: colors.student.accent,  bg: colors.student.accentLight  },
  { key: 'cs',      label: 'Computer Science', count: 9, color: '#185FA5',              bg: '#E6F1FB'                   },
  { key: 'maths',   label: 'Mathematics',     count: 22, color: '#C06000',              bg: '#FEF3EC'                   },
  { key: 'english', label: 'English Lit',      count: 6, color: colors.business.accent, bg: colors.business.accentLight },
]

const BUSINESS_FOLDERS = [
  { key: 'invoices',  label: 'Invoices',    count: 47, color: '#C06000',              bg: '#FEF3EC'                   },
  { key: 'receipts',  label: 'Receipts',    count: 83, color: colors.business.accent, bg: colors.business.accentLight },
  { key: 'contracts', label: 'Contracts',   count: 12, color: '#185FA5',              bg: '#E6F1FB'                   },
  { key: 'expenses',  label: 'Q4 Expenses', count: 31, color: colors.student.accent,  bg: colors.student.accentLight  },
]

const STUDENT_DOCS = [
  { name: 'Lecture notes — Biochem wk 7',  meta: 'Today · 3 pages',        thumbLabel: 'PDF', docType: 'notes'   as const },
  { name: 'Assignment brief — CS3',         meta: 'Yesterday · 1 page',      thumbLabel: 'IMG', docType: 'assign'  as const },
  { name: 'Textbook extract — Chapter 12',  meta: 'Mon · 8 pages',           thumbLabel: 'PDF', docType: 'reading' as const },
  { name: 'Lecture notes — Biochem wk 6',  meta: 'Last week · 4 pages',     thumbLabel: 'PDF', docType: 'notes'   as const },
  { name: 'Problem set — Linear Algebra',  meta: 'Last week · 2 pages',     thumbLabel: 'PDF', docType: 'assign'  as const },
  { name: 'Research paper — Cell Biology', meta: '2 weeks ago · 12 pages',  thumbLabel: 'PDF', docType: 'reading' as const },
]

const BUSINESS_DOCS = [
  { name: 'Invoice — Webflow Pro Oct', meta: 'Today · £299.00',        thumbLabel: 'INV', docType: 'invoice'  as const },
  { name: 'Receipt — Office supplies', meta: 'Yesterday · £47.20',     thumbLabel: 'RCT', docType: 'receipt'  as const },
  { name: 'Contract — Client NDA',     meta: 'Mon · Signed',           thumbLabel: 'PDF', docType: 'contract' as const },
  { name: 'Invoice — AWS Oct',         meta: 'Last week · £132.00',    thumbLabel: 'INV', docType: 'invoice'  as const },
  { name: 'Receipt — Team lunch',      meta: 'Last week · £84.50',     thumbLabel: 'RCT', docType: 'receipt'  as const },
  { name: 'Contract — Freelance dev',  meta: '2 weeks ago · Signed',   thumbLabel: 'PDF', docType: 'contract' as const },
]

function FolderCard({ label, count, color, bg, onPress }: {
  label: string; count: number; color: string; bg: string; onPress: () => void
}) {
  return (
    <StyledPressable onPress={onPress}
      width={140} backgroundColor={colors.surface.card}
      borderRadius={radius.lg} padding={spacing[4]}
      borderWidth={0.5} borderColor={colors.surface.border}
      marginRight={spacing[3]}
    >
      <Stack width={36} height={36} borderRadius={radius.md}
        backgroundColor={bg} alignItems="center" justifyContent="center"
        marginBottom={spacing[3]}
      >
        <Stack width={20} height={16} gap={2}>
          <Stack width={10} height={4} borderRadius={2} backgroundColor={color} opacity={0.7} />
          <Stack width={20} height={12} borderRadius={3} backgroundColor={color} opacity={0.9} />
        </Stack>
      </Stack>
      <StyledText fontFamily={typography.family.semiBold} fontSize={typography.size.md}
        color={colors.text.primary} numberOfLines={1}
      >
        {label}
      </StyledText>
      <StyledText fontFamily={typography.family.regular} fontSize={typography.size.xs}
        color={colors.text.secondary} marginTop={2}
      >
        {count} docs
      </StyledText>
    </StyledPressable>
  )
}

export function LibraryScreen({ navigation }: Props) {
  const { isStudent, modeColors } = useMode()
  const [query, setQuery]               = useState('')
  const [activeFilter, setFilter]       = useState<FilterKey>('all')

  const folders    = isStudent ? STUDENT_FOLDERS : BUSINESS_FOLDERS
  const allDocs    = isStudent ? STUDENT_DOCS    : BUSINESS_DOCS

  const filteredDocs = allDocs.filter((d) => {
    const matchQuery  = d.name.toLowerCase().includes(query.toLowerCase())
    const matchFilter = activeFilter === 'all' || d.docType === activeFilter
    return matchQuery && matchFilter
  })

  const visibleFilters = FILTERS.filter(
    (f) => f.modes.includes('both') ||
      (isStudent ? f.modes.includes('student') : f.modes.includes('business'))
  )

  return (
    <StyledPage flex={1} backgroundColor={colors.surface.page} showStatusBar={false}>

      {/* ── Header ── */}
      <StyledHeader
        title="Library"
        titleAlignment="left"
    
        backgroundColor={colors.surface.page}
        titleProps={{
          fontFamily: typography.family.bold,
          fontSize:   typography.size.h3,
          color:      colors.text.primary,
        }}
        rightIcon={
          <StyledPressable paddingRight={spacing[5]} paddingVertical={spacing[2]}>
            <Stack width={32} height={32} borderRadius={radius.md}
              backgroundColor={colors.surface.secondary}
              alignItems="center" justifyContent="center"
            >
              <StyledText fontSize={14} color={colors.text.secondary}>↕</StyledText>
            </Stack>
          </StyledPressable>
        }
      />

      {/* ── Search bar — plain TextInput, no StyledForm wrapper ── */}
      <Stack
        marginHorizontal={spacing[5]}
        marginBottom={spacing[3]}
        height={44}
        borderRadius={radius.lg}
        backgroundColor={colors.surface.secondary}
        borderWidth={0.5}
        borderColor={colors.surface.border}
        flexDirection="row"
        alignItems="center"
        paddingHorizontal={spacing[3]}
        gap={spacing[2]}
      >
        <StyledText fontSize={14} color={colors.text.tertiary}>🔍</StyledText>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search documents…"
          placeholderTextColor={colors.text.tertiary}
          style={{
            flex: 1,
            fontFamily: typography.family.regular,
            fontSize: typography.size.base,
            color: colors.text.primary,
            paddingVertical: 0,
          }}
          clearButtonMode="while-editing"
          returnKeyType="search"
        />
      </Stack>

      {/* ── Filter chips ── */}
      <StyledScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: spacing[5], gap: spacing[2] }}
        style={{ maxHeight: 40, marginBottom: spacing[3] }}
      >
        {visibleFilters.map((f) => (
          <StyledChip
            key={f.key}
            label={f.label}
            variant="smooth"
            size="sm"
            selected={activeFilter === f.key}
            color={activeFilter === f.key ? modeColors.accent : colors.text.secondary}
            bgColor={activeFilter === f.key ? modeColors.accentLight : undefined}
            showCheck={false}
            onPress={() => setFilter(f.key)}
          />
        ))}
      </StyledScrollView>

      <StyledDivider borderBottomColor={colors.surface.borderLight} />

      {/* ── Main content ── */}
      <StyledScrollView
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="never"
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Folders — only when no search/filter active */}
        {!query && activeFilter === 'all' && (
          <>
            <Stack flexDirection="row" alignItems="center" justifyContent="space-between"
              paddingHorizontal={spacing[5]} paddingTop={spacing[4]} paddingBottom={spacing[3]}
            >
              <StyledText fontFamily={typography.family.semiBold} fontSize={typography.size.xs}
                color={colors.text.tertiary} style={{ textTransform: 'uppercase', letterSpacing: 0.5 }}
              >
                Folders
              </StyledText>
              <StyledPressable>
                <StyledText fontFamily={typography.family.medium} fontSize={typography.size.sm}
                  color={colors.palette.blue[500]}
                >
                  Manage
                </StyledText>
              </StyledPressable>
            </Stack>

            <StyledScrollView horizontal showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: spacing[5] }}
            >
              {folders.map((f) => (
                <FolderCard key={f.key} label={f.label} count={f.count}
                  color={f.color} bg={f.bg} onPress={() => {}}
                />
              ))}
            </StyledScrollView>

            <StyledDivider borderBottomColor={colors.surface.borderLight} marginTop={spacing[4]} />
          </>
        )}

        {/* Document count header */}
        <Stack flexDirection="row" alignItems="center" justifyContent="space-between"
          paddingHorizontal={spacing[5]} paddingTop={spacing[4]} paddingBottom={spacing[2]}
        >
          <StyledText fontFamily={typography.family.semiBold} fontSize={typography.size.xs}
            color={colors.text.tertiary} style={{ textTransform: 'uppercase', letterSpacing: 0.5 }}
          >
            {query || activeFilter !== 'all' ? 'Results' : 'All documents'}
          </StyledText>
          <StyledBadge
            backgroundColor={colors.surface.secondary} color={colors.text.secondary}
            paddingHorizontal={8} paddingVertical={3} borderRadius={radius.full}
            fontFamily={typography.family.semiBold} fontSize={typography.size.xs}
          >
            {String(filteredDocs.length)}
          </StyledBadge>
        </Stack>

        {/* Documents */}
        {filteredDocs.length === 0 ? (
          <Stack alignItems="center" paddingVertical={spacing[8]} gap={spacing[3]}>
            <StyledText fontFamily={typography.family.semiBold} fontSize={typography.size.lg}
              color={colors.text.primary}
            >
              No results
            </StyledText>
            <StyledText fontFamily={typography.family.regular} fontSize={typography.size.base}
              color={colors.text.secondary} textAlign="center"
            >
              {`No documents found for "${query}"`}
            </StyledText>
          </Stack>
        ) : (
          filteredDocs.map((doc, i) => (
            <DocRow
              key={doc.name} name={doc.name} meta={doc.meta}
              thumbLabel={doc.thumbLabel} docType={doc.docType}
              showDivider={i < filteredDocs.length - 1}
            />
          ))
        )}
      </StyledScrollView>
    </StyledPage>
  )
}

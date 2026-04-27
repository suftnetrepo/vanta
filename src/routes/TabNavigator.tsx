// ─────────────────────────────────────────────────────────────────────────────
// Vanta — TabNavigator
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import type { BottomTabBarProps }   from '@react-navigation/bottom-tabs'
import type { TabParamList }        from '@/types'

import {
  Stack, StyledText, StyledPressable, StyledSafeAreaView,
} from 'fluent-styles'

import { useMode }             from '@/hooks/useMode'
import { colors, spacing, typography, radius } from '@/theme'

import { StudentHomeScreen }   from '@/screens/home/StudentHomeScreen'
import { BusinessHomeScreen }  from '@/screens/home/BusinessHomeScreen'
import { LibraryScreen }       from '@/screens/library/LibraryScreen'
import { ProfileScreen }       from '@/screens/profile/ProfileScreen'

const Tab = createBottomTabNavigator<TabParamList>()

// ─── History placeholder ──────────────────────────────────────────────────────

function HistoryScreen() {
  return (
    <StyledSafeAreaView flex={1} backgroundColor={colors.surface.page} alignItems="center" justifyContent="center">
      <StyledText fontFamily={typography.family.semiBold} fontSize={typography.size.lg} color={colors.text.secondary}>
        History — coming soon
      </StyledText>
    </StyledSafeAreaView>
  )
}

// ─── Tab icons ────────────────────────────────────────────────────────────────

function HomeIcon({ active, color }: { active: boolean; color: string }) {
  return (
    <Stack width={22} height={20} alignItems="center" justifyContent="center">
      <Stack width={20} height={16} borderRadius={2} borderTopLeftRadius={6} borderTopRightRadius={6} borderWidth={1.5} borderColor={color} borderBottomWidth={0} />
      <Stack width={20} height={10} borderWidth={1.5} borderColor={color} borderTopWidth={0} borderBottomLeftRadius={3} borderBottomRightRadius={3} alignItems="center" justifyContent="flex-end" paddingBottom={1}>
        <Stack width={6} height={7} borderRadius={1} borderWidth={1} borderColor={color} />
      </Stack>
    </Stack>
  )
}

function LibraryIcon({ active, color }: { active: boolean; color: string }) {
  return (
    <Stack width={20} height={20} gap={3}>
      <Stack flexDirection="row" gap={3}>
        <Stack width={8} height={8} borderRadius={2} borderWidth={1.5} borderColor={color} />
        <Stack width={8} height={8} borderRadius={2} borderWidth={1.5} borderColor={color} />
      </Stack>
      <Stack flexDirection="row" gap={3}>
        <Stack width={8} height={8} borderRadius={2} borderWidth={1.5} borderColor={color} />
        <Stack width={8} height={8} borderRadius={2} borderWidth={1.5} borderColor={color} />
      </Stack>
    </Stack>
  )
}

function HistoryIcon({ active, color }: { active: boolean; color: string }) {
  return (
    <Stack width={20} height={20} alignItems="center" justifyContent="center">
      <Stack width={18} height={18} borderRadius={9} borderWidth={1.5} borderColor={color} alignItems="center" justifyContent="center">
        <Stack width={1.5} height={6} borderRadius={1} backgroundColor={color} style={{ position: 'absolute', top: 2 }} />
        <Stack width={5} height={1.5} borderRadius={1} backgroundColor={color} style={{ position: 'absolute', right: 2 }} />
      </Stack>
    </Stack>
  )
}

function ProfileIcon({ active, color }: { active: boolean; color: string }) {
  return (
    <Stack width={20} height={20} alignItems="center" gap={2}>
      <Stack width={10} height={10} borderRadius={5} borderWidth={1.5} borderColor={color} />
      <Stack width={18} height={8} borderRadius={9} borderTopLeftRadius={9} borderTopRightRadius={9} borderWidth={1.5} borderColor={color} borderBottomWidth={0} />
    </Stack>
  )
}

// ─── Tab definitions ──────────────────────────────────────────────────────────

interface TabDef {
  name: keyof TabParamList
  label: string
  Icon: (props: { active: boolean; color: string }) => React.ReactNode
}

const TABS: TabDef[] = [
  { name: 'Home',    label: 'Home',    Icon: HomeIcon    },
  { name: 'Library', label: 'Library', Icon: LibraryIcon },
  { name: 'History', label: 'History', Icon: HistoryIcon },
  { name: 'Profile', label: 'Profile', Icon: ProfileIcon },
]

// ─── Custom tab bar ───────────────────────────────────────────────────────────

function VantaTabBar({ state, navigation }: BottomTabBarProps) {
  const { modeColors } = useMode()

  return (
    <Stack
      flexDirection="row"
      backgroundColor={colors.surface.card}
      borderTopWidth={0.5}
      borderTopColor={colors.surface.border}
      paddingBottom={spacing[4]}
      paddingTop={spacing[2]}
    >
      {state.routes.map((route, index) => {
        const def     = TABS.find((t) => t.name === route.name)
        if (!def) return null
        const focused = state.index === index
        const color   = focused ? modeColors.accent : colors.text.tertiary

        function onPress() {
          const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true })
          if (!focused && !event.defaultPrevented) navigation.navigate(route.name)
        }

        return (
          <StyledPressable
            key={route.key}
            flex={1}
            alignItems="center"
            justifyContent="center"
            paddingVertical={spacing[1]}
            onPress={onPress}
          >
            {/* Active indicator dot */}
            <Stack width={4} height={4} borderRadius={radius.full}
              backgroundColor={focused ? modeColors.accent : 'transparent'}
              marginBottom={4}
            />
            <def.Icon active={focused} color={color} />
            <StyledText
              fontFamily={focused ? typography.family.semiBold : typography.family.regular}
              fontSize={typography.size.xs}
              color={color}
              marginTop={3}
            >
              {def.label}
            </StyledText>
          </StyledPressable>
        )
      })}
    </Stack>
  )
}

// ─── Home wrapper ─────────────────────────────────────────────────────────────

function HomeScreenWrapper(props: any) {
  const { isStudent } = useMode()
  return isStudent
    ? <StudentHomeScreen  {...props} />
    : <BusinessHomeScreen {...props} />
}

// ─── Navigator ────────────────────────────────────────────────────────────────

export function TabNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <VantaTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home"    component={HomeScreenWrapper} />
      <Tab.Screen name="Library" component={LibraryScreen}    />
      <Tab.Screen name="History" component={HistoryScreen}    />
      <Tab.Screen name="Profile" component={ProfileScreen}    />
    </Tab.Navigator>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Vanta — RootNavigator (final)
// All screens registered.
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import type { RootStackParamList } from '@/types'

import { OnboardingScreen }    from '@/screens/onboarding/OnboardingScreen'
import { TabNavigator }        from '@/routes/TabNavigator'
import { CameraScreen }        from '@/screens/scan/CameraScreen'
import { CropScreen }          from '@/screens/scan/CropScreen'
import { TagSaveScreen }       from '@/screens/scan/TagSaveScreen'
import { DocDetailScreen }     from '@/screens/detail/DocDetailScreen'
import { FolderDetailScreen }  from '@/screens/detail/FolderDetailScreen'
import { SettingsScreen }      from '@/screens/settings/SettingsScreen'
import { DemoScreen }          from '@/screens/demo/DemoScreen'

const Stack = createNativeStackNavigator<RootStackParamList>()

export function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Onboarding"
      screenOptions={{ headerShown: false }}
    >
      {/* Onboarding */}
      <Stack.Screen name="Onboarding"   component={OnboardingScreen} />

      {/* Main tab shell */}
      <Stack.Screen name="Main"         component={TabNavigator}     />

      {/* Scan flow */}
      <Stack.Screen
        name="Camera"
        component={CameraScreen}
        options={{ animation: 'fade' }}
      />
      <Stack.Screen
        name="Crop"
        component={CropScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="TagSave"
        component={TagSaveScreen}
        options={{ animation: 'slide_from_bottom' }}
      />

      {/* Detail screens */}
      <Stack.Screen
        name="DocDetail"
        component={DocDetailScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="FolderDetail"
        component={FolderDetailScreen}
        options={{ animation: 'slide_from_right' }}
      />

      {/* Settings */}
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ animation: 'slide_from_right' }}
      />

      {/* Dev */}
      <Stack.Screen name="DemoComponents" component={DemoScreen} />
    </Stack.Navigator>
  )
}

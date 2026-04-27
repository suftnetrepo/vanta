import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { GlobalPortalProvider, PortalManager } from 'fluent-styles'
import * as SplashScreen from 'expo-splash-screen'

import { ModeProvider } from './src/store/ModeContext'
import { UserProvider } from './src/store/UserContext'
import { useFonts }     from './src/hooks/useFonts'
import { RootNavigator } from './src/routes'

SplashScreen.preventAutoHideAsync()

export default function App() {
  const { fontsLoaded, fontError } = useFonts()

  useEffect(() => {
    if (fontsLoaded || fontError) SplashScreen.hideAsync()
  }, [fontsLoaded, fontError])

  if (!fontsLoaded && !fontError) return null

  return (
    <GlobalPortalProvider>
      <PortalManager>
        <UserProvider>
          <ModeProvider initial="student">
            <NavigationContainer>
              <RootNavigator />
            </NavigationContainer>
          </ModeProvider>
        </UserProvider>
      </PortalManager>
    </GlobalPortalProvider>
  )
}

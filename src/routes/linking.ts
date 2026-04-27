// ─────────────────────────────────────────────────────────────────────────────
// Vanta — Deep link configuration
// ─────────────────────────────────────────────────────────────────────────────

import type { LinkingOptions } from '@react-navigation/native'
import type { RootStackParamList } from '@/types'

export const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ['vanta://', 'https://vanta.app'],
  config: {
    screens: {
      Onboarding:     'onboarding',
      Main:           'home',
      Camera:         'scan',
      DocDetail:      'doc/:docId',
      FolderDetail:   'folder/:folderKey',
      DemoComponents: 'demo',
    },
  },
}

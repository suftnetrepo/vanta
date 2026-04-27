# Vanta

Scan app for students and small businesses. Built with Expo (bare workflow) + fluent-styles.

---

## Setup

### 1. Add fonts

Download [Inter](https://rsms.me/inter/) and place these files in `assets/fonts/`:

```
assets/fonts/Inter-Regular.ttf
assets/fonts/Inter-Medium.ttf
assets/fonts/Inter-SemiBold.ttf
assets/fonts/Inter-Bold.ttf
```

### 2. Install dependencies

```bash
yarn install
```

### 3. Run

```bash
# iOS
npx expo run:ios

# Android
npx expo run:android
```

---

## Project structure

```
src/
  theme/        — colors, typography, spacing, radius, shadows, motion
  hooks/        — useFonts, useTheme, useMode
  store/        — ModeContext, DocumentContext
  types/        — shared TypeScript types
  routes/       — RootNavigator, TabNavigator, linking
  screens/      — grouped by feature (onboarding/, home/, scan/, ...)
  components/   — shared/, home/, scan/
  services/     — ocr, pdf, storage, export
assets/
  fonts/        — Inter .ttf files (add manually, see above)
```

## Rules

- Always use `Stack`, `StyledText`, `StyledPressable`, `StyledCard`, `StyledDivider`, `StyledSpacer`, `StyledScrollView`, `StyledPage`, `StyledSafeAreaView` — never bare RN primitives
- Never use `StyleSheet.create` — use flat style props
- All colours from `colors` token (imported from `@/theme`)
- All font families from `typography.family` (imported from `@/theme`)
- Children props use `CompatNode` not `ReactNode`
- Every new component needs a matching entry in `src/screens/demo/DemoScreen.tsx`
# vanta

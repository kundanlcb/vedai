# VEDAI Student App - Quick Reference Card

## 🚀 Quick Start (30 seconds)

```bash
npm install
cd ios && pod install && cd ..
npm start              # Terminal 1
npm run ios            # Terminal 2
```

## 📱 App Structure at a Glance

```
Login Screen
    ↓
Bottom Tab Navigation (5 Tabs)
├─ Home          (Dashboard)
├─ Exams         (Exam List)
├─ Chat          (Messages)
├─ Alerts        (Notifications)
└─ Profile       (Settings)
```

## 🎨 Design System Quick Reference

### Primary Colors
- **Primary**: `#6200EE` (Purple)
- **Secondary**: `#03DAC6` (Teal)
- **Success**: `#4CAF50`, **Warning**: `#FFC107`, **Error**: `#F44336`

### Spacing (4px base)
```
xs=4px, sm=8px, md=16px, lg=24px, xl=32px, xxl=48px
```

## 🧩 Component Usage

### Button
```tsx
<Button
  title="Login"
  onPress={handleLogin}
  variant="primary"
  size="large"
  loading={isLoading}
/>
```

### TextInputField
```tsx
<TextInputField
  label="Email"
  value={email}
  onChangeText={setEmail}
  error={error}
  iconName="email"
/>
```

### Card
```tsx
<Card variant="elevated">
  <Text>Content</Text>
</Card>
```

## 🪝 Hook Usage

### useForm
```tsx
const form = useForm({ email: '', password: '' });
form.values.email
form.setValue('email', 'test@example.com')
form.errors.email
```

### useValidation
```tsx
const { validateEmail, validatePassword } = useValidation();
const error = validateEmail(email);
```

### useAuth
```tsx
const { user, isSignedIn, login, logout } = useAuth();
```

## 📂 File Organization

```
src/
├── components/        ← UI building blocks
├── constants/         ← Design tokens
├── context/          ← Global state
├── hooks/            ← Custom logic
├── navigation/       ← App routing
├── screens/          ← Full screens
└── types/            ← TypeScript defs
```

## 🔄 Data Flow

```
User Action
    ↓
Event Handler
    ↓
Update State (useState, useForm, useAuth)
    ↓
Component Re-render
    ↓
New UI Display
```

## ✅ Common Tasks

### Add a New Screen
1. Create file in `src/screens/main/ScreenName.tsx`
2. Add to `BottomTabNavigator.tsx`
3. Export from `src/screens/main/index.ts`

### Add a New Component
1. Create in `src/components/forms/` or `common/`
2. Export from `src/components/index.ts`
3. Use with `import { Component } from '@/components'`

### Add Validation
1. Add function to `useValidation.ts`
2. Use in form with `form.setError()`
3. Display with `error` prop in `TextInputField`

### Integrate API
1. Update `AuthContext.tsx` login/signup
2. Replace mock data in screens
3. Add error handling with try/catch
4. Show loading states

## 🎯 Key Files to Modify for API

| Feature | File | Location |
|---------|------|----------|
| Authentication | AuthContext.tsx | Line 56 |
| Home Data | HomeScreen.tsx | Line 50 |
| Exams Data | ExamsScreen.tsx | Line 40 |
| Messages | ChatScreen.tsx | Line 40 |
| Notifications | NotificationsScreen.tsx | Line 35 |
| Profile | ProfileScreen.tsx | Line 30 |

## 🔐 Authentication Pattern

```tsx
// 1. Get auth context
const { user, login } = useAuth();

// 2. Create form
const form = useForm({ email: '', password: '' });

// 3. Validate
const error = validateEmail(form.values.email);

// 4. Call login
await login(email, password);

// 5. Navigation happens automatically
```

## 🎨 Styling Pattern

```tsx
import { Colors, Spacing, FontSizes } from '@/constants';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    padding: Spacing.lg,
  },
  title: {
    fontSize: FontSizes.headlineLarge,
    color: Colors.textPrimary,
  },
});
```

## 🚨 Error Handling

```tsx
try {
  await login(email, password);
} catch (error) {
  setError('Login failed. Please try again.');
}
```

## ⚡ Performance Tips

- Memoize expensive components with `React.memo()`
- Use `useMemo` for heavy calculations
- Use `useCallback` for event handlers
- Keep StyleSheets outside components
- Use `FlatList` instead of `ScrollView` for long lists

## 📚 Documentation Files

- **README.md** - Project overview
- **STRUCTURE.md** - File organization
- **IMPLEMENTATION_GUIDE.md** - Detailed guide
- **CHECKLIST.md** - Feature checklist
- **PROJECT_SUMMARY.md** - Architecture overview
- **FILE_MANIFEST.md** - Complete file list
- **setup.sh** - Setup script

## 🔗 Important Links

- [React Native Docs](https://reactnative.dev)
- [React Navigation](https://reactnavigation.org)
- [Material Design 3](https://m3.material.io)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

## ✨ Code Quality

- ✅ **ESLint**: `npm run lint` (No errors)
- ✅ **TypeScript**: Full type coverage
- ✅ **Navigation**: Type-safe with params
- ✅ **Components**: All props typed
- ✅ **Forms**: Validation integrated
- ✅ **Material Design**: All 3 compliant

## 📱 Screen Templates

### New Screen Template
```tsx
import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, FontSizes, Spacing } from '@/constants';
import { Header } from '@/components';

export const MyScreen: React.FC = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Header title="My Screen" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Content here */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
```

## 🎯 Before Deployment

- [ ] Replace all mock data with API calls
- [ ] Test all screens thoroughly
- [ ] Add error boundaries
- [ ] Implement proper loading states
- [ ] Add AsyncStorage for tokens
- [ ] Test on real devices
- [ ] Update app icon and splash
- [ ] Configure build settings
- [ ] Add analytics
- [ ] Set up monitoring

## 🆘 Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| Metro cache issues | `npm start -- --reset-cache` |
| Pod install fails | `cd ios && rm -rf Pods && pod install` |
| Type errors | Check TypeScript in `tsconfig.json` |
| Navigation issues | Verify params in `RootStackParamList` |
| Style not applying | Use `!important` or check cascade |

## 💡 Pro Tips

1. Use constants for all colors/spacing
2. Create reusable components early
3. Type everything with TypeScript
4. Test forms with various inputs
5. Handle network errors gracefully
6. Use loading states for async operations
7. Validate all user inputs
8. Document custom components
9. Keep screens focused on one thing
10. Use proper error boundaries

## 📞 Support Resources

- Check IMPLEMENTATION_GUIDE.md for detailed info
- Review CHECKLIST.md for feature status
- Look at PROJECT_SUMMARY.md for architecture
- Check FILE_MANIFEST.md for file locations
- Review existing screens for patterns

---

**Last Updated**: November 2025
**Status**: ✅ Ready to Use
**Version**: 1.0.0

🎉 **Happy Coding!**


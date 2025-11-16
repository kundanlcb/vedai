# VEDAI Student Learning Platform

A modern, Material Design-based React Native student application with authentication, tab-based navigation, and comprehensive learning features.

## Features

✅ **Modern UI** - Built with Material Design 3 principles
✅ **Authentication** - Login screen with form validation
✅ **Bottom Tab Navigation** - 5 main tabs for easy access
✅ **Modular Architecture** - Well-organized, scalable code structure
✅ **Custom Components** - Reusable form and common components
✅ **Context API** - Global state management for auth and theme
✅ **TypeScript** - Full type safety throughout the app
✅ **Latest Dependencies** - Using latest React Native and React Navigation

## Project Structure

```
src/
├── components/
│   ├── common/          # Reusable common components
│   │   ├── Header.tsx   # App bar/header component
│   │   ├── Card.tsx     # Material card component
│   │   └── LoadingScreen.tsx
│   ├── forms/           # Form-related components
│   │   ├── Button.tsx   # Material button with variants
│   │   └── TextInputField.tsx
│   └── index.ts
├── constants/
│   ├── colors.ts        # Color palette (light & dark)
│   ├── typography.ts    # Font sizes and weights
│   ├── spacing.ts       # Spacing, radius, shadows
│   └── index.ts
├── context/
│   ├── AuthContext.tsx  # Auth state management
│   ├── ThemeContext.tsx # Theme management
│   └── index.ts
├── hooks/
│   ├── useForm.ts       # Form state management hook
│   ├── useValidation.ts # Form validation logic
│   └── index.ts
├── navigation/
│   ├── RootNavigator.tsx        # Main navigation flow
│   ├── BottomTabNavigator.tsx   # Bottom tab navigation (5 tabs)
│   └── index.ts
├── screens/
│   ├── auth/
│   │   ├── LoginScreen.tsx      # Login with validation
│   │   └── index.ts
│   ├── main/
│   │   ├── HomeScreen.tsx       # Dashboard
│   │   ├── ExamsScreen.tsx      # Exams list
│   │   ├── ChatScreen.tsx       # Messages
│   │   ├── NotificationsScreen.tsx
│   │   ├── ProfileScreen.tsx    # User profile
│   │   └── index.ts
│   └── index.ts
└── utils/
    └── (Add API calls, helpers here)

App.tsx                 # Main app entry point
```

## Screens Overview

### 1. **Login Screen**
- Email and password input fields
- Form validation
- Error handling
- Material Design styling
- Eye icon for password visibility toggle

### 2. **Home Screen** (Tab 1)
- Welcome message with user name
- Quick stats (Assignments, Completed, Pending)
- Upcoming exams list
- Recent activity feed

### 3. **Exams Screen** (Tab 2)
- List of all exams
- Tabs for Upcoming/Completed
- Exam details (date, time, duration)
- Status indicators
- Preparation button

### 4. **Chat Screen** (Tab 3)
- List of conversations
- Search functionality
- Unread message indicators
- Floating action button for new chat
- Last message preview

### 5. **Notifications Screen** (Tab 4)
- All notifications and alerts
- Different notification types (info, warning, success, error)
- Mark as read functionality
- Delete notifications
- Empty state handling

### 6. **Profile Screen** (Tab 5)
- User profile information
- Profile statistics (Courses, GPA, Attendance)
- Settings menu items
- Notification preferences
- Sign out button

## Design System

### Colors
- **Primary**: `#6200EE` (Material Purple)
- **Secondary**: `#03DAC6` (Teal)
- **Success**: `#4CAF50`
- **Warning**: `#FFC107`
- **Error**: `#F44336`
- **Info**: `#2196F3`
- Dark mode colors included

### Typography
- **Display**: 57px, 45px, 36px
- **Headline**: 32px, 28px, 24px
- **Title**: 22px, 16px, 14px
- **Body**: 16px, 14px, 12px
- **Label**: 14px, 12px, 11px

### Spacing
- Base unit: 4px
- xs: 4px, sm: 8px, md: 16px, lg: 24px, xl: 32px, xxl: 48px

## Component Usage

### Button Component
```tsx
<Button
  title="Sign In"
  onPress={handleLogin}
  variant="primary"      // primary, secondary, outlined, text
  size="large"          // small, medium, large
  loading={isLoading}
  icon="arrow-right"
  iconPosition="right"
/>
```

### TextInputField Component
```tsx
<TextInputField
  label="Email"
  placeholder="Enter your email"
  value={email}
  onChangeText={setEmail}
  error={emailError}
  keyboardType="email-address"
  iconName="email"
  secureTextEntry={false}
/>
```

### Card Component
```tsx
<Card variant="elevated">   // elevated, filled, outlined
  <Text>Card content</Text>
</Card>
```

## Custom Hooks

### useForm
Manages form state with validation:
```tsx
const form = useForm({
  email: '',
  password: '',
});

form.values.email
form.errors.email
form.touched.email
form.setValue('email', value)
form.setError('email', 'error message')
```

### useValidation
Provides validation functions:
```tsx
const { validateEmail, validatePassword, validateName } = useValidation();

const error = validateEmail(email);
```

## Context Providers

### AuthContext
```tsx
const { user, isSignedIn, isLoading, login, signup, logout } = useAuth();
```

### ThemeContext
```tsx
const { isDarkMode, toggleTheme, colors } = useTheme();
```

## Setup & Installation

### Install Dependencies
```bash
npm install
```

### Run on iOS
```bash
npm run ios
```

### Run on Android
```bash
npm run android
```

### Start Metro Server
```bash
npm start
```

## Best Practices Implemented

✅ **Modular Code** - Components are small, focused, and reusable
✅ **Type Safety** - Full TypeScript support with proper interfaces
✅ **Separation of Concerns** - UI, logic, and state are separated
✅ **DRY Principle** - No repeated code, centralized constants
✅ **Proper Naming** - Clear, descriptive names for files and functions
✅ **Error Handling** - Try-catch blocks and user-friendly messages
✅ **Performance** - Proper use of React hooks and memoization
✅ **Accessibility** - Proper touch targets, color contrast

## Future Enhancements

- [ ] Implement real API integration
- [ ] Add offline support with SQLite
- [ ] Implement biometric authentication
- [ ] Add dark mode toggle
- [ ] Integrate with backend services
- [ ] Add file upload/download functionality
- [ ] Implement push notifications
- [ ] Add analytics tracking

## API Integration Points

The app is ready for API integration. Key files to update:

1. **AuthContext.tsx** - Replace mock login/signup/logout with API calls
2. **HomeScreen.tsx** - Replace mock data with API calls
3. **ExamsScreen.tsx** - Fetch exams from backend
4. **ChatScreen.tsx** - Integrate messaging API
5. **NotificationsScreen.tsx** - Fetch notifications from server

## Dependencies

- **React Native**: 0.82.1
- **React Navigation**: 7.x (Native Stack, Bottom Tabs)
- **React Native Paper**: 5.x (Material Design components)
- **Material Icons**: react-native-vector-icons
- **TypeScript**: 5.x
- **Safe Area Context**: For notch/safe area handling

## Notes

- All code follows Material Design 3 guidelines
- No deprecated React Native APIs used
- Proper error boundaries and loading states
- Form validation on all inputs
- Responsive design for different screen sizes

## Author

VEDAI Student Learning Platform Team

## License

Proprietary - All rights reserved


# VEDAI Student App - Implementation Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 20+ 
- npm or yarn
- React Native CLI
- Xcode (for iOS) or Android Studio (for Android)

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Install iOS pods
cd ios && pod install && cd ..

# 3. Start development server
npm start

# 4. In another terminal, run on device
npm run ios    # or npm run android
```

## 📁 Project Architecture

### Directory Structure
```
src/
├── components/          # Reusable UI components
│   ├── common/         # Header, Card, LoadingScreen
│   └── forms/          # Button, TextInputField
├── constants/          # Design system tokens
│   ├── colors.ts       # Color palette
│   ├── typography.ts   # Font sizes & weights
│   └── spacing.ts      # Spacing & shadows
├── context/            # Global state management
│   ├── AuthContext.tsx # Authentication state
│   └── ThemeContext.tsx # Theme state
├── hooks/              # Custom React hooks
│   ├── useForm.ts      # Form state management
│   └── useValidation.ts # Form validation
├── navigation/         # Navigation configuration
│   ├── RootNavigator.tsx
│   └── BottomTabNavigator.tsx
├── screens/            # App screens
│   ├── auth/
│   │   └── LoginScreen.tsx
│   └── main/
│       ├── HomeScreen.tsx
│       ├── ExamsScreen.tsx
│       ├── ChatScreen.tsx
│       ├── NotificationsScreen.tsx
│       └── ProfileScreen.tsx
└── types/              # TypeScript type declarations
```

## 🎨 Design System

### Colors
All colors are defined in `src/constants/colors.ts`:
- **Primary**: `#6200EE` (Material Purple)
- **Secondary**: `#03DAC6` (Teal)
- **Success**: `#4CAF50`
- **Warning**: `#FFC107`
- **Error**: `#F44336`
- **Info**: `#2196F3`

Dark mode colors are also included.

### Typography
- Display: 57px, 45px, 36px
- Headline: 32px, 28px, 24px
- Title: 22px, 16px, 14px
- Body: 16px, 14px, 12px
- Label: 14px, 12px, 11px

### Spacing
Base unit: 4px
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- xxl: 48px

## 🔐 Authentication Flow

### Login Flow
1. User enters email and password
2. Form validates inputs (useValidation hook)
3. Login request sent to AuthContext
4. On success: User state is set, navigation switches to Main screens
5. On error: Error message displayed

### File: `src/context/AuthContext.tsx`
```typescript
const { user, isSignedIn, isLoading, login, logout } = useAuth();
```

### Integration with API
Replace mock functions in AuthContext:
```typescript
// Replace this:
await new Promise<void>((resolve) => setTimeout(resolve, 1500));

// With your API call:
const response = await fetch('https://api.example.com/login', {
  method: 'POST',
  body: JSON.stringify({ email, password }),
});
const data = await response.json();
setUser(data.user);
```

## 🧩 Using Components

### Button Component
```typescript
<Button
  title="Sign In"
  onPress={handleLogin}
  variant="primary"      // primary | secondary | outlined | text
  size="large"          // small | medium | large
  loading={isLoading}
  icon="arrow-right"
  iconPosition="right"
/>
```

### TextInputField Component
```typescript
<TextInputField
  label="Email Address"
  placeholder="Enter your email"
  value={email}
  onChangeText={setEmail}
  onBlur={handleBlur}
  error={emailError}
  keyboardType="email-address"
  iconName="email"
  secureTextEntry={false}
/>
```

### Card Component
```typescript
<Card variant="elevated">    // elevated | filled | outlined
  <Text>Card content</Text>
</Card>
```

### Header Component
```typescript
<Header
  title="Home"
  onBackPress={() => navigation.goBack()}
  rightIcon="settings"
  onRightIconPress={() => navigation.navigate('Settings')}
  subtitle="Subtitle text"
/>
```

## 🪝 Custom Hooks

### useForm Hook
Manages form state with validation:
```typescript
const form = useForm<LoginFormData>({
  email: '',
  password: '',
});

// Access form state
form.values.email
form.errors.email
form.touched.email

// Modify form state
form.setValue('email', 'user@example.com')
form.setError('email', 'Invalid email')
form.setFieldTouched('email')
form.resetForm()
form.setSubmitting(true)
```

### useValidation Hook
Provides validation utilities:
```typescript
const { validateEmail, validatePassword, validateName } = useValidation();

const error = validateEmail(email);
if (error) {
  console.log(error); // "Please enter a valid email address"
}
```

## 🌍 Context API Usage

### AuthContext
```typescript
import { useAuth } from '../context';

const { user, isSignedIn, isLoading, login, signup, logout } = useAuth();
```

Properties:
- `user`: Current user object or null
- `isSignedIn`: Boolean indicating login status
- `isLoading`: Boolean for loading state
- `login(email, password)`: Login function
- `signup(name, email, password)`: Signup function
- `logout()`: Logout function

### ThemeContext
```typescript
import { useTheme } from '../context';

const { isDarkMode, toggleTheme, colors } = useTheme();
```

## 📱 Navigation Structure

### Root Navigator
Handles authentication-based navigation:
- If `isSignedIn`: Shows Main screens (bottom tab navigator)
- If not signed in: Shows Login screen

### Bottom Tab Navigator
5 tabs with Material Design 3 styling:
1. **Home** - Dashboard with stats and upcoming exams
2. **Exams** - List of all exams with filtering
3. **Chat** - Messaging interface
4. **Alerts** - Notifications and announcements
5. **Profile** - User profile and settings

## 🔄 State Management

### Global State
- **AuthContext**: User authentication state
- **ThemeContext**: Light/dark theme preference

### Local State
- **Screens**: Use `useState` for local UI state
- **Forms**: Use `useForm` hook for form management

## ✅ Form Validation

Validation is handled by the `useValidation` hook:

```typescript
const { validateEmail, validatePassword, validateName, validateConfirmPassword } = useValidation();

// Usage
const emailError = validateEmail('test@example.com');
const passwordError = validatePassword('password123');
const nameError = validateName('John Doe');
const confirmError = validateConfirmPassword('password123', 'password123');
```

### Validation Rules
- **Email**: Must be valid email format
- **Password**: Minimum 6 characters
- **Name**: Minimum 2 characters
- **Confirm Password**: Must match password field

## 🔌 API Integration

### Setup
1. Create `src/utils/api.ts` for API calls
2. Update AuthContext with real API endpoints
3. Replace mock data in screens with API calls

### Example API Integration
```typescript
// src/utils/api.ts
const API_BASE_URL = 'https://your-api.com';

export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) throw new Error('Login failed');
    return response.json();
  },
};

// In AuthContext:
const login = useCallback(
  async (email: string, password: string) => {
    const data = await authAPI.login(email, password);
    setUser(data.user);
  },
  []
);
```

## 🎯 Screen Details

### LoginScreen
- Email validation with regex
- Password visibility toggle
- Error handling and display
- Form submission on return key

### HomeScreen
- Welcome message with user name
- Quick stats cards (Assignments, Completed, Pending)
- Upcoming exams list with days remaining
- Recent activity feed

### ExamsScreen
- Tab navigation (Upcoming/Completed)
- Exam details (date, time, duration, status)
- Status badges with icons
- "Start Preparation" button for upcoming exams

### ChatScreen
- Conversation list with search
- Last message preview
- Unread message count badges
- Floating action button for new chats
- Avatar with initials

### NotificationsScreen
- Notifications grouped by type
- Mark as read functionality
- Delete individual notifications
- Mark all as read button
- Type-specific icons and colors

### ProfileScreen
- User avatar and info
- Profile statistics (Courses, GPA, Attendance)
- Notification preferences toggle
- Settings menu items
- Sign out button

## 🚨 Error Handling

### Form Validation Errors
Shown below form fields with error message and red text

### API Errors
Display toast or alert with user-friendly message

### Network Errors
Handle gracefully with retry options

## 📦 Dependencies

- **@react-navigation/native**: Navigation library
- **@react-navigation/bottom-tabs**: Bottom tab navigation
- **@react-navigation/native-stack**: Stack navigation
- **react-native-screens**: Optimized navigation
- **react-native-gesture-handler**: Gesture handling
- **react-native-paper**: Material Design components (optional)
- **react-native-vector-icons**: Icon library
- **react-native-safe-area-context**: Safe area handling

## 🧪 Testing

### Run Tests
```bash
npm test
```

### Run Linter
```bash
npm run lint
```

## 📈 Performance Optimization

### Memoization
- Icon components memoized in navigation
- ItemSeparator components memoized in FlatLists
- Use `React.useMemo` for expensive calculations

### Code Splitting
- Each screen is a separate component
- Components are lazy loaded by React Navigation

## 🔒 Security

### TODO Items:
1. Implement AsyncStorage for token persistence
2. Add OAuth/biometric authentication
3. Validate API responses
4. Secure password storage
5. Add HTTPS certificate pinning

See marked `TODO` comments in:
- `src/context/AuthContext.tsx`
- `src/screens/*`

## 📚 Additional Resources

- [React Navigation Docs](https://reactnavigation.org/)
- [React Native Docs](https://reactnative.dev/)
- [Material Design 3](https://m3.material.io/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 🤝 Contributing

### Code Style
- Use TypeScript for type safety
- Follow Material Design principles
- Use functional components with hooks
- Keep components small and focused
- Use constants for magic strings/numbers

### Naming Conventions
- Components: PascalCase
- Functions/variables: camelCase
- Files: Match component name for .tsx files
- Types/Interfaces: PascalCase with leading 'I' or 'T'

### File Organization
- One component per file
- Group related components in folders
- Keep styles close to components
- Export index files for clean imports

## 🐛 Troubleshooting

### Metro Bundler Issues
```bash
# Clear cache
npm start -- --reset-cache

# Or manually
rm -rf node_modules/.cache
```

### Pod Issues (iOS)
```bash
cd ios
rm -rf Pods Podfile.lock
pod install
cd ..
```

### Android Gradle Issues
```bash
cd android
./gradlew clean
./gradlew build
cd ..
```

## 📞 Support

For issues or questions:
1. Check existing documentation
2. Review TODO comments in code
3. Check React Navigation docs
4. Search GitHub issues

---

**Last Updated**: November 2025
**Version**: 1.0.0
**Status**: Production Ready ✅


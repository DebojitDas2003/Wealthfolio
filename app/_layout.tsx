import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import 'react-native-reanimated'

import { useColorScheme } from '@/hooks/useColorScheme'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false, statusBarBackgroundColor: '#d4f5d4' }}
        />
        <Stack.Screen
          name="(auth)"
          options={{ headerShown: false, statusBarBackgroundColor: '#d4f5d4' }}
        />
        <Stack.Screen
          name="index"
          options={{ headerShown: false, statusBarBackgroundColor: '#d4f5d4' }}
        />
        <Stack.Screen name="+not-found" />
        <Stack.Screen
          name="AccountDetailScreen"
          options={{
            headerStyle: { backgroundColor: '#d4f5d4' },
            headerTintColor: '#000000',
            statusBarBackgroundColor: '#d4f5d4',
          }}
        />
        <Stack.Screen name="RewardScreen"
          options={{
            headerTitle: 'Rewards',
            headerStyle: { backgroundColor: '#d4f5d4' },
            headerTintColor: '#000000',
            statusBarBackgroundColor: '#d4f5d4',
          }} />
        <Stack.Screen
          name="AccountDetailScreens"
          options={{
            headerTitle: 'Account Detail',
            headerStyle: { backgroundColor: '#d4f5d4' },
            headerTintColor: '#000000',
            statusBarBackgroundColor: '#d4f5d4',
          }}
        />
        <Stack.Screen name="AddNewCardScreen" />
        <Stack.Screen name="CreateAccountScreen" />
        <Stack.Screen name="ForgotPasswordScreen" />
        <Stack.Screen name="LoanCalculatorScreen"
          options={{
            headerTitle: 'Loan Calculator',
            headerStyle: { backgroundColor: '#d4f5d4' },
            headerTintColor: '#000000',
            statusBarBackgroundColor: '#d4f5d4',
          }} />
        <Stack.Screen name="LoanPaymentBreakDownScreen" />
        <Stack.Screen name="LoginScreen" />
        <Stack.Screen
          name="Notifications"
          options={{
            headerStyle: { backgroundColor: '#d4f5d4' },
            headerTintColor: '#000000',
            statusBarBackgroundColor: '#d4f5d4',
          }}
        />
        <Stack.Screen name="TotalDebtsScreen"
          options={{
            headerTitle: 'Total Debts',
            headerStyle: { backgroundColor: '#d4f5d4' },
            headerTintColor: '#000000',
            statusBarBackgroundColor: '#d4f5d4',
          }} />
        <Stack.Screen name="UpdateUserProfileScreen"
          options={{
            headerTitle: 'Update Profile',
            headerStyle: { backgroundColor: '#d4f5d4' },
            headerTintColor: '#000000',
            statusBarBackgroundColor: '#d4f5d4',
          }} />
        <Stack.Screen name="YourAccountScreens"
          options={{
            headerTitle: 'Your Accounts',
            headerStyle: { backgroundColor: '#d4f5d4' },
            headerTintColor: '#000000',
            statusBarBackgroundColor: '#d4f5d4',
          }} />
        <Stack.Screen
          name="YourCardScreen"
          options={{
            headerTitle: 'Your Cards',
            headerStyle: { backgroundColor: '#d4f5d4' },
            headerTintColor: '#000000',
            statusBarBackgroundColor: '#d4f5d4',
          }}
        />
        <Stack.Screen name="YourGoalsProgressScreen"
          options={{
            headerTitle: 'Your Goals',
            headerStyle: { backgroundColor: '#d4f5d4' },
            headerTintColor: '#000000',
            statusBarBackgroundColor: '#d4f5d4',
          }} />
        <Stack.Screen name="YourGoalsScreen" />
        <Stack.Screen name="YourLoansScreen" />
        <Stack.Screen name="YourReferralScreen"
          options={{
            headerTitle: 'Referral',
            headerStyle: { backgroundColor: '#d4f5d4' },
            headerTintColor: '#000000',
            statusBarBackgroundColor: '#d4f5d4',
          }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  )
}

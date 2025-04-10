"use client"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { StyleSheet } from "react-native"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { Toaster } from "sonner-native"
import { AuthProvider, useAuth } from "./context/AuthContext"
import { HomeIcon, UserIcon, ClockIcon, HeartIcon, SettingsIcon } from "./components/icons"

// Auth Screens
import OnboardingScreen from "./screens/auth/OnboardingScreen"
import LoginScreen from "./screens/auth/LoginScreen"
import SignupScreen from "./screens/auth/SignupScreen"
import ForgotPasswordScreen from "./screens/auth/ForgotPasswordScreen"

// Main Screens
import HomeScreen from "./screens/HomeScreen"
import QuestionsScreen from "./screens/QuestionsScreen"
import AdviceScreen from "./screens/AdviceScreen"
import ProfileScreen from "./screens/ProfileScreen"
import HistoryScreen from "./screens/HistoryScreen"
import SettingsScreen from "./screens/SettingsScreen"
import PricingScreen from "./screens/PricingScreen"
import SavedAdviceScreen from "./screens/SavedAdviceScreen"

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  )
}

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="Questions" component={QuestionsScreen} />
      <Stack.Screen name="Advice" component={AdviceScreen} />
      <Stack.Screen name="Pricing" component={PricingScreen} />
    </Stack.Navigator>
  )
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#121212",
          borderTopColor: "rgba(255,255,255,0.1)",
          height: 60,
          paddingBottom: 10,
        },
        tabBarActiveTintColor: "#8A2BE2",
        tabBarInactiveTintColor: "rgba(255,255,255,0.5)",
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarIcon: ({ color, size }) => {
          if (route.name === "Home") {
            return <HomeIcon color={color} size={size} />
          } else if (route.name === "Profile") {
            return <UserIcon color={color} size={size} />
          } else if (route.name === "History") {
            return <ClockIcon color={color} size={size} />
          } else if (route.name === "Saved") {
            return <HeartIcon color={color} size={size} />
          } else if (route.name === "Settings") {
            return <SettingsIcon color={color} size={size} />
          }
          // Default return to avoid undefined
          return <HomeIcon color={color} size={size} />
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Saved" component={SavedAdviceScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  )
}

function AppNavigator() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return null // You could add a splash screen here
  }

  return <NavigationContainer>{user ? <MainTabs /> : <AuthStack />}</NavigationContainer>
}

export default function App() {
  return (
    <SafeAreaProvider style={styles.container}>
      <AuthProvider>
        <Toaster />
        <AppNavigator />
      </AuthProvider>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

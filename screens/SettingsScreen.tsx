"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"
import { toast } from "sonner-native"
import { useAuth } from "../context/AuthContext"
import Card from "../components/Card"
import Button from "../components/Button"

export default function SettingsScreen() {
  const navigation = useNavigation()
  const { logout } = useAuth()

  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(true)
  const [saveHistory, setSaveHistory] = useState(true)

  const toggleNotifications = () => setNotifications(!notifications)
  const toggleDarkMode = () => setDarkMode(!darkMode)
  const toggleSaveHistory = () => setSaveHistory(!saveHistory)

  const handleClearHistory = () => {
    Alert.alert("Clear History", "Are you sure you want to clear your advice history? This action cannot be undone.", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Clear",
        onPress: () => {
          // In a real app, this would clear the history from storage
          toast.success("History cleared successfully")
        },
        style: "destructive",
      },
    ])
  }

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? All your data will be permanently removed. This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            // In a real app, this would delete the account from the backend
            logout()
            toast.success("Account deleted successfully")
          },
          style: "destructive",
        },
      ],
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
        </View>

        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>Preferences</Text>

          <View style={styles.settingRow}>
            <Text style={styles.settingText}>Push Notifications</Text>
            <Switch
              value={notifications}
              onValueChange={toggleNotifications}
              trackColor={{ false: "#333", true: "rgba(138, 43, 226, 0.4)" }}
              thumbColor={notifications ? "#8A2BE2" : "#f4f3f4"}
            />
          </View>

          <View style={styles.settingRow}>
            <Text style={styles.settingText}>Dark Mode</Text>
            <Switch
              value={darkMode}
              onValueChange={toggleDarkMode}
              trackColor={{ false: "#333", true: "rgba(138, 43, 226, 0.4)" }}
              thumbColor={darkMode ? "#8A2BE2" : "#f4f3f4"}
            />
          </View>

          <View style={styles.settingRow}>
            <Text style={styles.settingText}>Save History</Text>
            <Switch
              value={saveHistory}
              onValueChange={toggleSaveHistory}
              trackColor={{ false: "#333", true: "rgba(138, 43, 226, 0.4)" }}
              thumbColor={saveHistory ? "#8A2BE2" : "#f4f3f4"}
            />
          </View>
        </Card>

        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>Account</Text>

          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Profile")}>
            <Text style={styles.menuText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Pricing")}>
            <Text style={styles.menuText}>Subscription</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handleClearHistory}>
            <Text style={styles.menuText}>Clear History</Text>
          </TouchableOpacity>
        </Card>

        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>Support</Text>

          <TouchableOpacity style={styles.menuItem} onPress={() => toast.info("Help & Support not implemented")}>
            <Text style={styles.menuText}>Help & Support</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => toast.info("Privacy Policy not implemented")}>
            <Text style={styles.menuText}>Privacy Policy</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => toast.info("Terms of Service not implemented")}>
            <Text style={styles.menuText}>Terms of Service</Text>
          </TouchableOpacity>
        </Card>

        <View style={styles.dangerZone}>
          <Text style={styles.dangerTitle}>Danger Zone</Text>
          <Button
            title="Delete Account"
            variant="outline"
            onPress={handleDeleteAccount}
            style={styles.deleteButton}
            textStyle={styles.deleteButtonText}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  content: {
    padding: 20,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  card: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 16,
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
  },
  settingText: {
    fontSize: 16,
    color: "#FFFFFF",
  },
  menuItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
  },
  menuText: {
    fontSize: 16,
    color: "#FFFFFF",
  },
  dangerZone: {
    marginTop: 8,
    marginBottom: 40,
  },
  dangerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FF3B30",
    marginBottom: 16,
  },
  deleteButton: {
    borderColor: "#FF3B30",
  },
  deleteButtonText: {
    color: "#FF3B30",
  },
})

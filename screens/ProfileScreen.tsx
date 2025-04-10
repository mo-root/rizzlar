"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"
import { toast } from "sonner-native"
import { useAuth } from "../context/AuthContext"
import Button from "../components/Button"
import Card from "../components/Card"
import Input from "../components/Input"

export default function ProfileScreen() {
  const { user, logout, updateUser } = useAuth()
  const navigation = useNavigation()
  const [name, setName] = useState(user?.name || "")
  const [email, setEmail] = useState(user?.email || "")
  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleEdit = () => {
    setEditing(true)
  }

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error("Name cannot be empty")
      return
    }

    setLoading(true)
    try {
      await updateUser({ name, email })
      toast.success("Profile updated successfully")
      setEditing(false)
    } catch (error) {
      toast.error("Failed to update profile")
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setName(user?.name || "")
    setEmail(user?.email || "")
    setEditing(false)
  }

  const handleLogout = async () => {
    await logout()
    toast.info("Logged out successfully")
  }

  const getPlanLabel = () => {
    switch (user?.plan) {
      case "premium":
        return "Premium"
      case "pro":
        return "Pro"
      default:
        return "Free"
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
        </View>

        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>{user?.name?.charAt(0) || "U"}</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{user?.name}</Text>
            <View style={styles.planBadge}>
              <Text style={styles.planText}>{getPlanLabel()}</Text>
            </View>
          </View>
        </View>

        <Card style={styles.card}>
          {editing ? (
            <View style={styles.form}>
              <Input label="Name" value={name} onChangeText={setName} placeholder="Enter your name" />
              <Input
                label="Email"
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                editable={false}
              />
              <View style={styles.buttonRow}>
                <Button title="Cancel" variant="outline" onPress={handleCancel} style={styles.buttonHalf} />
                <Button title="Save" onPress={handleSave} loading={loading} style={styles.buttonHalf} />
              </View>
            </View>
          ) : (
            <>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Name</Text>
                <Text style={styles.infoValue}>{user?.name}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Email</Text>
                <Text style={styles.infoValue}>{user?.email}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Plan</Text>
                <Text style={styles.infoValue}>{getPlanLabel()}</Text>
              </View>
              <Button title="Edit Profile" variant="outline" onPress={handleEdit} style={styles.editButton} />
            </>
          )}
        </Card>

        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Subscription</Text>
          <View style={styles.subscriptionInfo}>
            <Text style={styles.subscriptionText}>
              {user?.plan === "free"
                ? "You are currently on the Free plan"
                : `You are subscribed to the ${getPlanLabel()} plan`}
            </Text>
            <Button
              title={user?.plan === "free" ? "Upgrade" : "Manage Subscription"}
              size="small"
              onPress={() => navigation.navigate("Pricing")}
              style={styles.subscriptionButton}
            />
          </View>
        </Card>

        <Button title="Logout" variant="outline" onPress={handleLogout} style={styles.logoutButton} />
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
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#8A2BE2",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  planBadge: {
    backgroundColor: "rgba(138, 43, 226, 0.2)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    alignSelf: "flex-start",
  },
  planText: {
    color: "#8A2BE2",
    fontWeight: "600",
  },
  card: {
    marginBottom: 24,
  },
  form: {
    gap: 8,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    gap: 12,
  },
  buttonHalf: {
    flex: 1,
  },
  infoRow: {
    marginBottom: 16,
  },
  infoLabel: {
    fontSize: 14,
    color: "rgba(255,255,255,0.6)",
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: "#FFFFFF",
  },
  editButton: {
    marginTop: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 16,
  },
  subscriptionInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  subscriptionText: {
    flex: 1,
    color: "#FFFFFF",
  },
  subscriptionButton: {
    marginLeft: 16,
  },
  logoutButton: {
    marginTop: 8,
  },
})

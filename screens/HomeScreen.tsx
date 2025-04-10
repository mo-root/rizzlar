"use client"

import { useState } from "react"
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"
import { toast } from "sonner-native"
import { useTheme } from "../context/ThemeContext"
import { useAuth } from "../context/AuthContext"
import Button from "../components/Button"
import Card from "../components/Card"
import Input from "../components/Input"

export default function HomeScreen() {
  const [situation, setSituation] = useState("")
  const navigation = useNavigation()
  const { colors } = useTheme()
  const { user } = useAuth()

  const handleStart = () => {
    if (situation.trim().length < 3) {
      toast.error("Please describe the situation first")
      return
    }
    navigation.navigate("Questions", { situation })
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.content}>
          <View style={styles.header}>
            <Text style={[styles.greeting, { color: colors.text }]}>
              Hello, {user?.name?.split(" ")[0] || "there"}!
            </Text>
            <Text style={[styles.title, { color: colors.text }]}>Social Confidence</Text>
            <Text style={[styles.subtitle, { color: colors.subtext }]}>
              Let's help you make a great first impression
            </Text>
          </View>

          <Card style={styles.card}>
            <Text style={[styles.label, { color: colors.text }]}>What's the situation?</Text>
            <Input
              placeholder="E.g., I'm at a coffee shop and..."
              multiline
              numberOfLines={4}
              value={situation}
              onChangeText={setSituation}
              style={styles.inputWrapper}
            />

            <Button title="Let's Go" onPress={handleStart} size="medium" style={styles.button} />
          </Card>

          <View style={styles.featuresContainer}>
            <Text style={[styles.featuresTitle, { color: colors.text }]}>Features</Text>

            <View style={styles.features}>
              <Card style={styles.featureCard}>
                <Image
                  source={{ uri: "https://img.icons8.com/fluency/96/000000/chat.png" }}
                  style={styles.featureIcon}
                />
                <Text style={[styles.featureTitle, { color: colors.text }]}>Personalized Advice</Text>
                <Text style={[styles.featureDescription, { color: colors.subtext }]}>
                  Get tailored suggestions based on your specific situation
                </Text>
              </Card>

              <Card style={styles.featureCard}>
                <Image
                  source={{ uri: "https://img.icons8.com/fluency/96/000000/bookmark-ribbon.png" }}
                  style={styles.featureIcon}
                />
                <Text style={[styles.featureTitle, { color: colors.text }]}>Save Favorites</Text>
                <Text style={[styles.featureDescription, { color: colors.subtext }]}>
                  Keep track of advice that works for you
                </Text>
              </Card>

              <Card style={styles.featureCard}>
                <Image
                  source={{ uri: "https://img.icons8.com/fluency/96/000000/time-machine.png" }}
                  style={styles.featureIcon}
                />
                <Text style={[styles.featureTitle, { color: colors.text }]}>History</Text>
                <Text style={[styles.featureDescription, { color: colors.subtext }]}>
                  Review past situations and advice
                </Text>
              </Card>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 24,
  },
  greeting: {
    fontSize: 16,
    marginBottom: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
  },
  card: {
    marginBottom: 24,
  },
  label: {
    fontSize: 18,
    marginBottom: 12,
    fontWeight: "500",
  },
  inputWrapper: {
    marginBottom: 16,
  },
  button: {
    alignSelf: "flex-end",
  },
  featuresContainer: {
    marginBottom: 24,
  },
  featuresTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
  features: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  featureCard: {
    width: "48%",
    marginBottom: 16,
    alignItems: "center",
    padding: 16,
  },
  featureIcon: {
    width: 48,
    height: 48,
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    textAlign: "center",
  },
  featureDescription: {
    fontSize: 14,
    textAlign: "center",
  },
})

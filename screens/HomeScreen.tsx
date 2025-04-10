"use client"

import { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"
import { toast } from "sonner-native"
import { useAuth } from "../context/AuthContext"
import Button from "../components/Button"
import Card from "../components/Card"
import Input from "../components/Input"

export default function HomeScreen() {
  const [situation, setSituation] = useState("")
  const navigation = useNavigation()
  const { user } = useAuth()

  const handleStart = () => {
    if (situation.trim().length < 3) {
      toast.error("Please describe the situation first")
      return
    }
    navigation.navigate("Questions", { situation })
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.greeting}>Hello, {user?.name?.split(" ")[0] || "there"}!</Text>
            <Text style={styles.title}>Social Confidence</Text>
            <Text style={styles.subtitle}>Let's help you make a great first impression</Text>
          </View>

          <Card style={styles.card}>
            <Text style={styles.label}>What's the situation?</Text>
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
            <Text style={styles.featuresTitle}>Features</Text>

            <View style={styles.features}>
              <TouchableOpacity style={styles.featureCard}>
                <Image
                  source={{ uri: "https://img.icons8.com/fluency/96/000000/chat.png" }}
                  style={styles.featureIcon}
                />
                <Text style={styles.featureTitle}>Personalized Advice</Text>
                <Text style={styles.featureDescription}>Get tailored suggestions based on your specific situation</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.featureCard} onPress={() => navigation.navigate("Saved")}>
                <Image
                  source={{ uri: "https://img.icons8.com/fluency/96/000000/bookmark-ribbon.png" }}
                  style={styles.featureIcon}
                />
                <Text style={styles.featureTitle}>Save Favorites</Text>
                <Text style={styles.featureDescription}>Keep track of advice that works for you</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.featureCard} onPress={() => navigation.navigate("History")}>
                <Image
                  source={{ uri: "https://img.icons8.com/fluency/96/000000/time-machine.png" }}
                  style={styles.featureIcon}
                />
                <Text style={styles.featureTitle}>History</Text>
                <Text style={styles.featureDescription}>Review past situations and advice</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.featureCard} onPress={() => navigation.navigate("Pricing")}>
                <Image
                  source={{ uri: "https://img.icons8.com/fluency/96/000000/diamond.png" }}
                  style={styles.featureIcon}
                />
                <Text style={styles.featureTitle}>Premium Plans</Text>
                <Text style={styles.featureDescription}>Unlock advanced features and unlimited advice</Text>
              </TouchableOpacity>
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
    backgroundColor: "#121212",
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
    color: "rgba(255,255,255,0.8)",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#FFFFFF",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
    color: "rgba(255,255,255,0.7)",
  },
  card: {
    marginBottom: 24,
  },
  label: {
    fontSize: 18,
    marginBottom: 12,
    fontWeight: "500",
    color: "#FFFFFF",
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
    color: "#FFFFFF",
  },
  features: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  featureCard: {
    width: "48%",
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    alignItems: "center",
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
    color: "#FFFFFF",
  },
  featureDescription: {
    fontSize: 14,
    textAlign: "center",
    color: "rgba(255,255,255,0.7)",
  },
})

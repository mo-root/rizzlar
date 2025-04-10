"use client"

import { useEffect, useState, useCallback } from "react"
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Share } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useRoute, useNavigation } from "@react-navigation/native"
import { toast } from "sonner-native"
import { useAuth } from "../context/AuthContext"
import { ArrowLeftIcon, HeartIcon, ShareIcon } from "../components/icons"
import Button from "../components/Button"
import Card from "../components/Card"

export default function AdviceScreen() {
  const route = useRoute()
  const navigation = useNavigation()
  const { situation, answers } = route.params
  const [advice, setAdvice] = useState("")
  const [loading, setLoading] = useState(true)
  const [saved, setSaved] = useState(false)
  const { user } = useAuth()

  // Define generateAdvice as a useCallback to avoid ESLint warnings
  const generateAdvice = useCallback(async () => {
    setLoading(true)
    try {
      const prompt = `Given this situation: "${situation}". 
The person is ${answers[0]}. 
The environment is ${answers[1]}. 
Eye contact situation: ${answers[2]}. 
Please provide a short, respectful, and practical suggestion (max 4 sentences) on how to approach and start a conversation. Focus on being genuine and respectful.`

      const response = await fetch("https://api.a0.dev/ai/llm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content: "You are a respectful dating coach focused on helping people make genuine connections.",
            },
            { role: "user", content: prompt },
          ],
        }),
      })

      const data = await response.json()
      setAdvice(data.completion)
    } catch (error) {
      setAdvice("I apologize, but I couldn't generate advice at the moment. Please try again.")
    } finally {
      setLoading(false)
    }
  }, [situation, answers])

  useEffect(() => {
    generateAdvice()
  }, [generateAdvice])

  const handleSave = () => {
    setSaved(!saved)
    if (!saved) {
      toast.success("Advice saved to favorites")
    } else {
      toast.info("Removed from favorites")
    }
  }

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Social Confidence Advice:\n\n${advice}\n\nShared from Social Confidence App`,
      })
    } catch (error) {
      toast.error("Couldn't share advice")
    }
  }

  const handleUpgrade = () => {
    navigation.navigate("Pricing")
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ArrowLeftIcon color="#FFFFFF" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Advice</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Your Approach Strategy</Text>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#8A2BE2" />
            <Text style={styles.loadingText}>Generating personalized advice...</Text>
          </View>
        ) : (
          <>
            <Card style={styles.adviceContainer}>
              <Text style={styles.adviceText}>{advice}</Text>

              <View style={styles.actionsRow}>
                <TouchableOpacity onPress={handleSave} style={styles.actionButton}>
                  <HeartIcon
                    color={saved ? "#FF6B6B" : "rgba(255,255,255,0.7)"}
                    fill={saved ? "#FF6B6B" : "none"}
                    size={20}
                  />
                </TouchableOpacity>

                <TouchableOpacity onPress={handleShare} style={styles.actionButton}>
                  <ShareIcon color="rgba(255,255,255,0.7)" size={20} />
                </TouchableOpacity>
              </View>
            </Card>

            {user?.plan === "free" && (
              <Card style={styles.upgradeCard}>
                <Text style={styles.upgradeTitle}>Want more personalized advice?</Text>
                <Text style={styles.upgradeText}>Upgrade to Premium for unlimited advice and advanced features.</Text>
                <Button title="Upgrade Now" onPress={handleUpgrade} size="small" style={styles.upgradeButton} />
              </Card>
            )}

            <View style={styles.buttonContainer}>
              <Button
                title="Start Over"
                onPress={() => navigation.navigate("HomeMain")}
                variant="outline"
                size="medium"
                style={styles.button}
              />

              <Button title="Get Another Suggestion" onPress={generateAdvice} size="medium" style={styles.button} />
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  content: {
    padding: 20,
    flexGrow: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
    color: "#FFFFFF",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    color: "rgba(255,255,255,0.7)",
  },
  adviceContainer: {
    marginVertical: 24,
  },
  adviceText: {
    fontSize: 18,
    lineHeight: 28,
    color: "#FFFFFF",
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 16,
  },
  actionButton: {
    padding: 8,
    marginLeft: 16,
  },
  upgradeCard: {
    marginBottom: 24,
    backgroundColor: "rgba(138, 43, 226, 0.1)",
  },
  upgradeTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    color: "#FFFFFF",
  },
  upgradeText: {
    fontSize: 14,
    marginBottom: 16,
    color: "rgba(255,255,255,0.7)",
  },
  upgradeButton: {
    alignSelf: "flex-end",
  },
  buttonContainer: {
    gap: 16,
    marginTop: 8,
  },
  button: {
    width: "100%",
  },
})

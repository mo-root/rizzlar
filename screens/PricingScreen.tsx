"use client"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"
import { toast } from "sonner-native"
import { ArrowLeftIcon, CheckIcon } from "../components/icons"
import { useAuth } from "../context/AuthContext"
import Button from "../components/Button"
import Card from "../components/Card"

export default function PricingScreen() {
  const navigation = useNavigation()
  const { user, updateUser } = useAuth()

  const handleSubscribe = (plan) => {
    // In a real app, this would handle payment processing
    toast.success(`Subscribed to ${plan} plan`)
    updateUser({ plan })
    navigation.goBack()
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ArrowLeftIcon color="#FFFFFF" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pricing Plans</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Choose Your Plan</Text>
        <Text style={styles.subtitle}>Unlock premium features and get unlimited advice</Text>

        <View style={styles.plansContainer}>
          <Card style={styles.planCard}>
            <View style={styles.planHeader}>
              <Text style={styles.planName}>Free</Text>
              <Text style={styles.planPrice}>$0</Text>
              <Text style={styles.planBilling}>Forever</Text>
            </View>

            <View style={styles.planFeatures}>
              <View style={styles.featureRow}>
                <CheckIcon color="#8A2BE2" size={16} />
                <Text style={styles.featureText}>3 advice generations per day</Text>
              </View>
              <View style={styles.featureRow}>
                <CheckIcon color="#8A2BE2" size={16} />
                <Text style={styles.featureText}>Basic advice customization</Text>
              </View>
              <View style={styles.featureRow}>
                <CheckIcon color="#8A2BE2" size={16} />
                <Text style={styles.featureText}>Save up to 10 favorite advice</Text>
              </View>
            </View>

            <Button
              title={user?.plan === "free" ? "Current Plan" : "Select Plan"}
              variant={user?.plan === "free" ? "outline" : "primary"}
              disabled={user?.plan === "free"}
              onPress={() => handleSubscribe("free")}
              style={styles.planButton}
            />
          </Card>

          <Card style={[styles.planCard, styles.premiumCard]}>
            <View style={styles.planHeader}>
              <Text style={styles.planName}>Premium</Text>
              <Text style={styles.planPrice}>$4.99</Text>
              <Text style={styles.planBilling}>per month</Text>
            </View>

            <View style={styles.planFeatures}>
              <View style={styles.featureRow}>
                <CheckIcon color="#8A2BE2" size={16} />
                <Text style={styles.featureText}>Unlimited advice generations</Text>
              </View>
              <View style={styles.featureRow}>
                <CheckIcon color="#8A2BE2" size={16} />
                <Text style={styles.featureText}>Advanced customization options</Text>
              </View>
              <View style={styles.featureRow}>
                <CheckIcon color="#8A2BE2" size={16} />
                <Text style={styles.featureText}>Unlimited saved advice</Text>
              </View>
              <View style={styles.featureRow}>
                <CheckIcon color="#8A2BE2" size={16} />
                <Text style={styles.featureText}>Priority support</Text>
              </View>
            </View>

            <Button
              title={user?.plan === "premium" ? "Current Plan" : "Subscribe"}
              variant={user?.plan === "premium" ? "outline" : "primary"}
              disabled={user?.plan === "premium"}
              onPress={() => handleSubscribe("premium")}
              style={styles.planButton}
            />
          </Card>

          <Card style={styles.planCard}>
            <View style={styles.planHeader}>
              <Text style={styles.planName}>Pro</Text>
              <Text style={styles.planPrice}>$9.99</Text>
              <Text style={styles.planBilling}>per month</Text>
            </View>

            <View style={styles.planFeatures}>
              <View style={styles.featureRow}>
                <CheckIcon color="#8A2BE2" size={16} />
                <Text style={styles.featureText}>All Premium features</Text>
              </View>
              <View style={styles.featureRow}>
                <CheckIcon color="#8A2BE2" size={16} />
                <Text style={styles.featureText}>AI-powered conversation practice</Text>
              </View>
              <View style={styles.featureRow}>
                <CheckIcon color="#8A2BE2" size={16} />
                <Text style={styles.featureText}>Personalized coaching sessions</Text>
              </View>
              <View style={styles.featureRow}>
                <CheckIcon color="#8A2BE2" size={16} />
                <Text style={styles.featureText}>Advanced analytics and insights</Text>
              </View>
            </View>

            <Button
              title={user?.plan === "pro" ? "Current Plan" : "Subscribe"}
              variant={user?.plan === "pro" ? "outline" : "primary"}
              disabled={user?.plan === "pro"}
              onPress={() => handleSubscribe("pro")}
              style={styles.planButton}
            />
          </Card>
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
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#FFFFFF",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 32,
    color: "rgba(255,255,255,0.7)",
    textAlign: "center",
  },
  plansContainer: {
    gap: 24,
  },
  planCard: {
    padding: 0,
    overflow: "hidden",
  },
  premiumCard: {
    borderWidth: 2,
    borderColor: "#8A2BE2",
  },
  planHeader: {
    padding: 20,
    backgroundColor: "rgba(255,255,255,0.05)",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.05)",
  },
  planName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#FFFFFF",
  },
  planPrice: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#8A2BE2",
  },
  planBilling: {
    fontSize: 14,
    color: "rgba(255,255,255,0.7)",
  },
  planFeatures: {
    padding: 20,
    gap: 12,
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  featureText: {
    fontSize: 14,
    color: "#FFFFFF",
  },
  planButton: {
    margin: 20,
    marginTop: 0,
  },
})

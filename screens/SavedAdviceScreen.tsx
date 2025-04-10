"use client"

import { useState } from "react"
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"
import { HeartIcon } from "../components/icons"
import Card from "../components/Card"

// Mock data for saved advice
const savedAdviceData = [
  {
    id: "1",
    date: "Oct 18, 2023",
    situation: "I'm at a coffee shop and there's a girl reading a book I love",
    advice:
      "Since you noticed she's reading a book you love, you have a natural conversation starter. Approach with a friendly smile and say, 'I couldn't help but notice you're reading [book title]. It's one of my favorites! What do you think of it so far?' This shows genuine interest in her thoughts and creates an opportunity for meaningful conversation based on shared interests.",
  },
  {
    id: "2",
    date: "Oct 10, 2023",
    situation: "At a networking event, want to approach a potential mentor",
    advice:
      "Prepare a brief introduction about yourself and your interest in their work. Approach them during a break with a confident smile and say, 'Hi, I'm [your name]. I've followed your work on [specific project/topic] and found it really inspiring. I'd love to hear more about your experience with [specific aspect].' Be respectful of their time and have a specific question ready to make the conversation meaningful.",
  },
]

export default function SavedAdviceScreen() {
  const navigation = useNavigation()
  const [savedAdvice, setSavedAdvice] = useState(savedAdviceData)

  const handleRemove = (id) => {
    Alert.alert("Remove from Saved", "Are you sure you want to remove this advice from your saved list?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Remove",
        onPress: () => {
          setSavedAdvice(savedAdvice.filter((item) => item.id !== id))
        },
        style: "destructive",
      },
    ])
  }

  const renderSavedItem = ({ item }) => (
    <Card style={styles.savedCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.dateText}>{item.date}</Text>
        <TouchableOpacity onPress={() => handleRemove(item.id)}>
          <HeartIcon color="#FF6B6B" fill="#FF6B6B" size={20} />
        </TouchableOpacity>
      </View>
      <Text style={styles.situationText} numberOfLines={2}>
        {item.situation}
      </Text>
      <Text style={styles.adviceText} numberOfLines={3}>
        {item.advice}
      </Text>
      <TouchableOpacity
        style={styles.viewButton}
        onPress={() => {
          navigation.navigate("Advice", {
            situation: item.situation,
            answers: ["N/A", "N/A", "N/A"], // Placeholder
            advice: item.advice,
          })
        }}
      >
        <Text style={styles.viewButtonText}>View Details</Text>
      </TouchableOpacity>
    </Card>
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Saved Advice</Text>
      </View>

      {savedAdvice.length > 0 ? (
        <FlatList
          data={savedAdvice}
          renderItem={renderSavedItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>No Saved Advice</Text>
          <Text style={styles.emptyText}>
            When you find advice you like, tap the heart icon to save it for later reference.
          </Text>
        </View>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  header: {
    padding: 20,
    paddingBottom: 0,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 16,
  },
  listContent: {
    padding: 20,
    paddingTop: 0,
  },
  savedCard: {
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  dateText: {
    fontSize: 14,
    color: "rgba(255,255,255,0.6)",
  },
  situationText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  adviceText: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
    marginBottom: 12,
  },
  viewButton: {
    alignSelf: "flex-end",
  },
  viewButtonText: {
    fontSize: 14,
    color: "#8A2BE2",
    fontWeight: "600",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    color: "rgba(255,255,255,0.7)",
    textAlign: "center",
  },
})

import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"
import Card from "../components/Card"

// Mock data for history
const historyData = [
  {
    id: "1",
    date: "Today, 2:30 PM",
    situation: "I'm at a coffee shop and there's a girl reading a book I love",
    advice:
      "Since you noticed she's reading a book you love, you have a natural conversation starter. Approach with a friendly smile and say, 'I couldn't help but notice you're reading [book title]. It's one of my favorites! What do you think of it so far?' This shows genuine interest in her thoughts and creates an opportunity for meaningful conversation based on shared interests.",
  },
  {
    id: "2",
    date: "Yesterday, 5:15 PM",
    situation: "At a party where I only know the host",
    advice:
      "Look for people who are also alone or in small groups that seem approachable. Introduce yourself with a simple, 'Hi, I'm [your name]. I only know [host's name] here. How do you know them?' This is a natural conversation starter at parties and can help you find common connections. Remember to maintain good eye contact and ask follow-up questions to keep the conversation flowing.",
  },
  {
    id: "3",
    date: "Oct 15, 11:20 AM",
    situation: "Gym situation, girl I see regularly",
    advice:
      "Since you've seen each other regularly, a simple acknowledgment can break the ice. Wait for a natural moment when she's not mid-exercise, make brief eye contact, smile, and say something like, 'I've noticed we're often here at the same time. I'm [your name].' Keep it light and respectful, and be prepared to continue your workout if she seems busy or uninterested.",
  },
]

export default function HistoryScreen() {
  const navigation = useNavigation()

  const renderHistoryItem = ({ item }) => (
    <Card style={styles.historyCard}>
      <Text style={styles.dateText}>{item.date}</Text>
      <Text style={styles.situationText} numberOfLines={2}>
        {item.situation}
      </Text>
      <Text style={styles.adviceText} numberOfLines={3}>
        {item.advice}
      </Text>
      <TouchableOpacity
        style={styles.viewButton}
        onPress={() => {
          // In a real app, this would navigate to a detail view
          // or recreate the advice screen with this data
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
        <Text style={styles.title}>History</Text>
      </View>

      {historyData.length > 0 ? (
        <FlatList
          data={historyData}
          renderItem={renderHistoryItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>No History Yet</Text>
          <Text style={styles.emptyText}>Your advice history will appear here once you start getting advice.</Text>
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
  historyCard: {
    marginBottom: 16,
  },
  dateText: {
    fontSize: 14,
    color: "rgba(255,255,255,0.6)",
    marginBottom: 8,
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

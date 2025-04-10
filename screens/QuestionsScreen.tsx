"use client"

import { useState, useRef, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated, Dimensions } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation, useRoute } from "@react-navigation/native"
import { ArrowLeftIcon } from "../components/icons"
import Button from "../components/Button"

const questions = [
  {
    id: 1,
    question: "Who is she with?",
    options: ["Alone", "With another girl", "With another guy", "With a group of girls", "With a mixed group"],
  },
  {
    id: 2,
    question: `What's the environment like?`,
    options: ["Quiet and calm", "Moderately busy", "Very busy and loud", "Social/party setting"],
  },
  {
    id: 3,
    question: "Has there been any eye contact?",
    options: ["Yes, multiple times", "Yes, once", "No, not yet", "Not sure"],
  },
]

export default function QuestionsScreen() {
  const navigation = useNavigation()
  const route = useRoute()
  const { situation } = route.params
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(Dimensions.get("window").width)).current

  useEffect(() => {
    // Animate the question transition
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start()
  }, [currentQuestion, fadeAnim, slideAnim])

  const handleAnswer = (answer) => {
    const newAnswers = { ...answers, [currentQuestion]: answer }
    setAnswers(newAnswers)

    if (currentQuestion === questions.length - 1) {
      navigation.navigate("Advice", {
        situation,
        answers: Object.values(newAnswers),
      })
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: -Dimensions.get("window").width,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setCurrentQuestion(currentQuestion + 1)
        slideAnim.setValue(Dimensions.get("window").width)
      })
    }
  }

  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    } else {
      navigation.goBack()
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <ArrowLeftIcon color="#FFFFFF" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Question {currentQuestion + 1}</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progress,
                {
                  width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                },
              ]}
            />
          </View>
          <Text style={styles.progressText}>
            {currentQuestion + 1} of {questions.length}
          </Text>
        </View>

        <Animated.View
          style={[
            styles.questionContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateX: slideAnim }],
            },
          ]}
        >
          <Text style={styles.question}>{questions[currentQuestion].question}</Text>

          <View style={styles.optionsContainer}>
            {questions[currentQuestion].options.map((option, index) => (
              <Button
                key={index}
                title={option}
                variant={index % 2 === 0 ? "primary" : "secondary"}
                size="small"
                style={styles.optionButton}
                onPress={() => handleAnswer(option)}
              />
            ))}
          </View>
        </Animated.View>
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
    justifyContent: "center",
  },
  progressContainer: {
    marginBottom: 40,
  },
  progressBar: {
    height: 6,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 3,
    marginBottom: 8,
    overflow: "hidden",
  },
  progress: {
    height: "100%",
    backgroundColor: "#8A2BE2",
    borderRadius: 3,
  },
  progressText: {
    fontSize: 14,
    textAlign: "center",
    color: "rgba(255,255,255,0.7)",
  },
  questionContainer: {
    flex: 1,
    justifyContent: "center",
  },
  question: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center",
    color: "#FFFFFF",
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    marginBottom: 8,
  },
})

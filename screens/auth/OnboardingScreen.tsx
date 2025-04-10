"use client"

import { useState, useRef } from "react"
import { View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"
import { useTheme } from "../../context/ThemeContext"
import Button from "../../components/Button"

const { width } = Dimensions.get("window")

const slides = [
  {
    id: "1",
    title: "Welcome to Social Confidence",
    description: "Your personal coach for navigating social situations with confidence and authenticity.",
    image: "https://img.icons8.com/fluency/240/000000/chat.png",
  },
  {
    id: "2",
    title: "Personalized Advice",
    description: "Get tailored suggestions based on your specific situation and preferences.",
    image: "https://img.icons8.com/fluency/240/000000/idea.png",
  },
  {
    id: "3",
    title: "Track Your Progress",
    description: "Save your favorite advice and review past situations to see how far you've come.",
    image: "https://img.icons8.com/fluency/240/000000/positive-dynamic.png",
  },
]

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const flatListRef = useRef(null)
  const navigation = useNavigation()
  const { colors } = useTheme()

  const renderItem = ({ item }) => {
    return (
      <View style={[styles.slide, { width }]}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <Text style={[styles.title, { color: colors.text }]}>{item.title}</Text>
        <Text style={[styles.description, { color: colors.subtext }]}>{item.description}</Text>
      </View>
    )
  }

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      })
    } else {
      navigation.navigate("Login")
    }
  }

  const handleSkip = () => {
    navigation.navigate("Login")
  }

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x
    const index = Math.round(contentOffsetX / width)
    setCurrentIndex(index)
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.skipContainer}>
        <TouchableOpacity onPress={handleSkip}>
          <Text style={[styles.skipText, { color: colors.primary }]}>Skip</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        keyExtractor={(item) => item.id}
      />

      <View style={styles.indicatorContainer}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              {
                backgroundColor: index === currentIndex ? colors.primary : colors.border,
                width: index === currentIndex ? 24 : 8,
              },
            ]}
          />
        ))}
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title={currentIndex === slides.length - 1 ? "Get Started" : "Next"}
          onPress={handleNext}
          style={styles.button}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  skipContainer: {
    alignItems: "flex-end",
    padding: 20,
  },
  skipText: {
    fontSize: 16,
    fontWeight: "600",
  },
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  indicator: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  button: {
    width: "100%",
  },
})

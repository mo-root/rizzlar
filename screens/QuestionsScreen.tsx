import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';

const questions = [
  {
    id: 1,
    question: 'Who is she with?',
    options: [
      'Alone',
      'With another girl',
      'With another guy',
      'With a group of girls',
      'With a mixed group'
    ]
  },
  {
    id: 2,    question: `What's the environment like?`,
    options: [
      'Quiet and calm',
      'Moderately busy',
      'Very busy and loud',
      'Social/party setting'
    ]
  },
  {
    id: 3,
    question: 'Has there been any eye contact?',
    options: [
      'Yes, multiple times',
      'Yes, once',
      'No, not yet',
      'Not sure'
    ]
  }
];

export default function QuestionsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { situation } = route.params;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleAnswer = (answer) => {
    const newAnswers = { ...answers, [currentQuestion]: answer };
    setAnswers(newAnswers);
    
    if (currentQuestion === questions.length - 1) {
      navigation.navigate('Advice', { 
        situation,
        answers: newAnswers
      });
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progress, 
                { width: `${((currentQuestion + 1) / questions.length) * 100}%` }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>
            {currentQuestion + 1} of {questions.length}
          </Text>
        </View>

        <Text style={styles.question}>
          {questions[currentQuestion].question}
        </Text>

        <View style={styles.optionsContainer}>
          {questions[currentQuestion].options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionButton}
              onPress={() => handleAnswer(option)}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  content: {
    padding: 20,
    flexGrow: 1,
    justifyContent: 'center',
  },
  progressContainer: {
    marginBottom: 40,
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 2,
    marginBottom: 8,
  },
  progress: {
    height: '100%',
    backgroundColor: '#8A2BE2',
    borderRadius: 2,
  },
  progressText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.7,
  },
  question: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 40,
    textAlign: 'center',
  },
  optionsContainer: {
    gap: 16,
  },
  optionButton: {
    backgroundColor: '#8A2BE2',
    padding: 20,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#8A2BE2',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  optionText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
});
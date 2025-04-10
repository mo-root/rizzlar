import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function AdviceScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { situation, answers } = route.params;
  const [advice, setAdvice] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    generateAdvice();
  }, []);

  const generateAdvice = async () => {
    setLoading(true);
    try {
      const prompt = `Given this situation: "${situation}". 
The person is ${answers[0]}. 
The environment is ${answers[1]}. 
Eye contact situation: ${answers[2]}. 
Please provide a short, respectful, and practical suggestion (max 4 sentences) on how to approach and start a conversation. Focus on being genuine and respectful.`;

      const response = await fetch('https://api.a0.dev/ai/llm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: 'You are a respectful dating coach focused on helping people make genuine connections.' },
            { role: 'user', content: prompt }
          ]
        })
      });

      const data = await response.json();
      setAdvice(data.completion);
    } catch (error) {
      setAdvice("I apologize, but I couldn't generate advice at the moment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Your Approach Strategy</Text>
        
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.loadingText}>Generating personalized advice...</Text>
          </View>
        ) : (
          <>
            <View style={styles.adviceContainer}>
              <Text style={styles.adviceText}>{advice}</Text>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={styles.button}
                onPress={() => navigation.navigate('Home')}
              >
                <Text style={styles.buttonText}>Start Over</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.button, styles.secondaryButton]}
                onPress={generateAdvice}
              >
                <Text style={[styles.buttonText, styles.secondaryButtonText]}>
                  Get Another Suggestion
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
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
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 20,
    fontSize: 18,
    color: 'rgba(255,255,255,0.7)',
  },
  adviceContainer: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 25,
    borderRadius: 20,
    marginVertical: 25,
  },
  adviceText: {
    fontSize: 20,
    lineHeight: 30,
    color: '#fff',
  },
  buttonContainer: {
    gap: 16,
  },
  button: {
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
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: 'rgba(138,43,226,0.2)',
    borderWidth: 0,
  },
  secondaryButtonText: {
    color: '#fff',
  },
});
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { toast } from 'sonner-native';

export default function HomeScreen() {
  const [situation, setSituation] = useState('');
  const navigation = useNavigation();

  const handleStart = () => {
    if (situation.trim().length < 3) {
      toast.error('Please describe the situation first');
      return;
    }
    navigation.navigate('Questions', { situation });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >
        <Text style={styles.title}>Social Confidence</Text>
        <Text style={styles.subtitle}>Let's help you make a great first impression</Text>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>What's the situation?</Text>
          <TextInput
            style={styles.input}
            placeholder="E.g., I'm at a coffee shop and..."
            multiline
            numberOfLines={4}
            value={situation}
            onChangeText={setSituation}
            placeholderTextColor="#666"
          />
        </View>

        <TouchableOpacity 
          style={styles.button}
          onPress={handleStart}
        >
          <Text style={styles.buttonText}>Let's Go</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 50,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 40,
  },
  label: {
    fontSize: 20,
    marginBottom: 16,
    color: '#fff',
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
    padding: 20,
    minHeight: 120,
    fontSize: 18,
    color: '#fff',
    textAlignVertical: 'top',
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
});
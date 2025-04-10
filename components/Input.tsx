"use client"

import { useState } from "react"
import { View, TextInput, Text, StyleSheet, TouchableOpacity, type ViewStyle, type TextStyle } from "react-native"
import { Eye, EyeOff } from "react-native-feather"
import { useTheme } from "../context/ThemeContext"

interface InputProps {
  label?: string
  placeholder?: string
  value: string
  onChangeText: (text: string) => void
  secureTextEntry?: boolean
  error?: string
  multiline?: boolean
  numberOfLines?: number
  style?: ViewStyle
  inputStyle?: TextStyle
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad" | "number-pad"
  autoCapitalize?: "none" | "sentences" | "words" | "characters"
  autoCorrect?: boolean
  maxLength?: number
  editable?: boolean
  onBlur?: () => void
  onFocus?: () => void
}

export default function Input({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  error,
  multiline = false,
  numberOfLines = 1,
  style,
  inputStyle,
  keyboardType = "default",
  autoCapitalize = "none",
  autoCorrect = false,
  maxLength,
  editable = true,
  onBlur,
  onFocus,
}: InputProps) {
  const { colors, isDark } = useTheme()
  const [isFocused, setIsFocused] = useState(false)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const handleFocus = () => {
    setIsFocused(true)
    if (onFocus) onFocus()
  }

  const handleBlur = () => {
    setIsFocused(false)
    if (onBlur) onBlur()
  }

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={[styles.label, { color: colors.text }]}>{label}</Text>}
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: error ? colors.error : isFocused ? colors.primary : colors.border,
            backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
          },
        ]}
      >
        <TextInput
          style={[
            styles.input,
            {
              color: colors.text,
              height: multiline ? numberOfLines * 24 : undefined,
              textAlignVertical: multiline ? "top" : "center",
            },
            inputStyle,
          ]}
          placeholder={placeholder}
          placeholderTextColor={isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)"}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          multiline={multiline}
          numberOfLines={multiline ? numberOfLines : undefined}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          maxLength={maxLength}
          editable={editable}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
            {isPasswordVisible ? (
              <EyeOff width={20} height={20} color={colors.subtext} />
            ) : (
              <Eye width={20} height={20} color={colors.subtext} />
            )}
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={[styles.error, { color: colors.error }]}>{error}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "500",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 12,
    overflow: "hidden",
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 12,
  },
  error: {
    fontSize: 12,
    marginTop: 4,
  },
})

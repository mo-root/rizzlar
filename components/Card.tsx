"use client"

import type React from "react"
import { View, Text, StyleSheet, type ViewStyle, type TextStyle } from "react-native"
import { useTheme } from "../context/ThemeContext"

interface CardProps {
  title?: string
  subtitle?: string
  children: React.ReactNode
  style?: ViewStyle
  titleStyle?: TextStyle
  subtitleStyle?: TextStyle
  contentStyle?: ViewStyle
}

export default function Card({ title, subtitle, children, style, titleStyle, subtitleStyle, contentStyle }: CardProps) {
  const { colors, isDark } = useTheme()

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: isDark ? colors.card : "#FFFFFF",
          shadowColor: isDark ? "#000000" : "#000000",
        },
        style,
      ]}
    >
      {(title || subtitle) && (
        <View style={styles.header}>
          {title && <Text style={[styles.title, { color: colors.text }, titleStyle]}>{title}</Text>}
          {subtitle && <Text style={[styles.subtitle, { color: colors.subtext }, subtitleStyle]}>{subtitle}</Text>}
        </View>
      )}
      <View style={[styles.content, contentStyle]}>{children}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    overflow: "hidden",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.05)",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
  },
  content: {
    padding: 16,
  },
})

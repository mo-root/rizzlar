import type React from "react"
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, type ViewStyle, type TextStyle } from "react-native"

interface ButtonProps {
  title: string
  onPress: () => void
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "small" | "medium" | "large"
  loading?: boolean
  disabled?: boolean
  style?: ViewStyle
  textStyle?: TextStyle
  icon?: React.ReactNode
}

export default function Button({
  title,
  onPress,
  variant = "primary",
  size = "medium",
  loading = false,
  disabled = false,
  style,
  textStyle,
  icon,
}: ButtonProps) {
  const getButtonStyle = () => {
    const baseStyle: ViewStyle = {
      ...styles.button,
      ...getSizeStyle(),
    }

    if (disabled) {
      return {
        ...baseStyle,
        backgroundColor: variant === "outline" || variant === "ghost" ? "transparent" : "rgba(138, 43, 226, 0.3)",
        borderColor: variant === "outline" ? "rgba(138, 43, 226, 0.3)" : "transparent",
        opacity: 0.7,
      }
    }

    switch (variant) {
      case "primary":
        return {
          ...baseStyle,
          backgroundColor: "#8A2BE2",
        }
      case "secondary":
        return {
          ...baseStyle,
          backgroundColor: "#6A1CB2",
        }
      case "outline":
        return {
          ...baseStyle,
          backgroundColor: "transparent",
          borderWidth: 1,
          borderColor: "#8A2BE2",
        }
      case "ghost":
        return {
          ...baseStyle,
          backgroundColor: "transparent",
        }
      default:
        return baseStyle
    }
  }

  const getTextStyle = () => {
    const baseStyle: TextStyle = {
      ...styles.text,
      fontSize: size === "small" ? 14 : size === "medium" ? 16 : 18,
    }

    switch (variant) {
      case "outline":
      case "ghost":
        return {
          ...baseStyle,
          color: "#8A2BE2",
        }
      default:
        return {
          ...baseStyle,
          color: "#FFFFFF",
        }
    }
  }

  const getSizeStyle = (): ViewStyle => {
    switch (size) {
      case "small":
        return {
          paddingVertical: 8,
          paddingHorizontal: 16,
          borderRadius: 16,
        }
      case "medium":
        return {
          paddingVertical: 12,
          paddingHorizontal: 24,
          borderRadius: 20,
        }
      case "large":
        return {
          paddingVertical: 16,
          paddingHorizontal: 32,
          borderRadius: 24,
        }
      default:
        return {}
    }
  }

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={variant === "outline" || variant === "ghost" ? "#8A2BE2" : "#FFFFFF"} />
      ) : (
        <>
          {icon && icon}
          <Text style={[getTextStyle(), icon ? { marginLeft: 8 } : {}, textStyle]}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#8A2BE2",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  text: {
    fontWeight: "600",
  },
})

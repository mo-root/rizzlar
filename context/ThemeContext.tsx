"use client"

import type React from "react"
import { createContext, useState, useContext, useEffect } from "react"
import { useColorScheme } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"

type ThemeMode = "light" | "dark" | "system"

interface ThemeColors {
  background: string
  card: string
  text: string
  subtext: string
  primary: string
  secondary: string
  border: string
  error: string
  success: string
}

interface ThemeContextType {
  mode: ThemeMode
  setMode: (mode: ThemeMode) => void
  colors: ThemeColors
  isDark: boolean
}

const lightColors: ThemeColors = {
  background: "#FFFFFF",
  card: "#F5F5F5",
  text: "#121212",
  subtext: "#666666",
  primary: "#8A2BE2",
  secondary: "#6A1CB2",
  border: "#E0E0E0",
  error: "#FF3B30",
  success: "#34C759",
}

const darkColors: ThemeColors = {
  background: "#121212",
  card: "#1E1E1E",
  text: "#FFFFFF",
  subtext: "#BBBBBB",
  primary: "#8A2BE2",
  secondary: "#9D4EDD",
  border: "#333333",
  error: "#FF453A",
  success: "#30D158",
}

const ThemeContext = createContext<ThemeContextType>({
  mode: "system",
  setMode: () => {},
  colors: darkColors,
  isDark: true,
})

export const useTheme = () => useContext(ThemeContext)

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme()
  const [mode, setMode] = useState<ThemeMode>("system")
  const [colors, setColors] = useState<ThemeColors>(darkColors)

  useEffect(() => {
    // Load saved theme preference
    const loadTheme = async () => {
      try {
        const savedMode = await AsyncStorage.getItem("themeMode")
        if (savedMode) {
          setMode(savedMode as ThemeMode)
        }
      } catch (error) {
        console.log("Error loading theme:", error)
      }
    }

    loadTheme()
  }, [])

  useEffect(() => {
    // Save theme preference
    const saveTheme = async () => {
      try {
        await AsyncStorage.setItem("themeMode", mode)
      } catch (error) {
        console.log("Error saving theme:", error)
      }
    }

    saveTheme()

    // Set colors based on mode
    const effectiveMode = mode === "system" ? systemColorScheme : mode
    setColors(effectiveMode === "dark" ? darkColors : lightColors)
  }, [mode, systemColorScheme])

  const isDark = mode === "system" ? systemColorScheme === "dark" : mode === "dark"

  return <ThemeContext.Provider value={{ mode, setMode, colors, isDark }}>{children}</ThemeContext.Provider>
}

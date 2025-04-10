"use client"

import type React from "react"
import { createContext, useState, useContext, useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"

type User = {
  id: string
  name: string
  email: string
  plan: "free" | "premium" | "pro"
} | null

type AuthContextType = {
  user: User
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  signup: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  forgotPassword: (email: string) => Promise<boolean>
  updateUser: (userData: Partial<NonNullable<User>>) => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: async () => false,
  signup: async () => false,
  logout: () => {},
  forgotPassword: async () => false,
  updateUser: () => {},
})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const checkUser = async () => {
      try {
        const userData = await AsyncStorage.getItem("user")
        if (userData) {
          setUser(JSON.parse(userData))
        }
      } catch (error) {
        console.log("Error retrieving user data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkUser()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      // In a real app, you would make an API call here
      // For demo purposes, we'll simulate a successful login
      const mockUser = {
        id: "user-123",
        name: "John Doe",
        email,
        plan: "free" as const,
      }

      await AsyncStorage.setItem("user", JSON.stringify(mockUser))
      setUser(mockUser)
      return true
    } catch (error) {
      console.log("Login error:", error)
      return false
    }
  }

  const signup = async (name: string, email: string, password: string) => {
    try {
      // In a real app, you would make an API call here
      const mockUser = {
        id: "user-" + Math.floor(Math.random() * 1000),
        name,
        email,
        plan: "free" as const,
      }

      await AsyncStorage.setItem("user", JSON.stringify(mockUser))
      setUser(mockUser)
      return true
    } catch (error) {
      console.log("Signup error:", error)
      return false
    }
  }

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("user")
      setUser(null)
    } catch (error) {
      console.log("Logout error:", error)
    }
  }

  const forgotPassword = async (email: string) => {
    try {
      // In a real app, you would make an API call here
      // For demo purposes, we'll simulate a successful password reset
      return true
    } catch (error) {
      console.log("Forgot password error:", error)
      return false
    }
  }

  const updateUser = async (userData: Partial<NonNullable<User>>) => {
    try {
      if (!user) return

      const updatedUser = { ...user, ...userData }
      await AsyncStorage.setItem("user", JSON.stringify(updatedUser))
      setUser(updatedUser)
    } catch (error) {
      console.log("Update user error:", error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout, forgotPassword, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

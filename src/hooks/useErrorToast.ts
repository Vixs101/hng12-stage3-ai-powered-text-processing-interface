"use client"

import { useState, useCallback } from "react"
import toast from "react-hot-toast"

export function useErrorToast() {
  const [error, setError] = useState<string | null>(null)

  const showError = useCallback((message: string) => {
    setError(message)
    toast.error(message)
  }, [])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return { error, showError, clearError }
}


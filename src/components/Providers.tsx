"use client"

import type React from "react"
import { Provider } from "react-redux"
import { store } from "@/src/store"

interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
      <Provider store={store}>{children}</Provider>
  )
}

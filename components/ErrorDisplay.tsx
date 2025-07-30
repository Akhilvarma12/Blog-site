"use client"

import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

interface ErrorDisplayProps {
  message: string
  onRetry?: () => void
}

export function ErrorDisplay({ message, onRetry }: ErrorDisplayProps) {
  return (
    <div className="max-w-md mx-auto">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription className="flex items-center justify-between">
          <span>{message}</span>
          {onRetry && (
            <Button variant="outline" size="sm" onClick={onRetry} className="ml-4 bg-transparent">
              Retry
            </Button>
          )}
        </AlertDescription>
      </Alert>
    </div>
  )
}

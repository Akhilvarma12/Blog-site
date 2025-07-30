import { Loader2 } from "lucide-react"

interface LoaderProps {
  size?: "sm" | "md" | "lg"
  text?: string
}

export function Loader({ size = "md", text = "Loading..." }: LoaderProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  }

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <Loader2 className={`animate-spin ${sizeClasses[size]} text-primary`} />
      <p className="mt-2 text-sm text-muted-foreground">{text}</p>
    </div>
  )
}

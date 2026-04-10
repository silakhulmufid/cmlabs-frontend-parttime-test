import { cn } from "@/lib/utils"

export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "aspect-video w-full animate-pulse rounded-xl bg-gray-200",
        className
      )}
    />
  )
}

export default CardSkeleton

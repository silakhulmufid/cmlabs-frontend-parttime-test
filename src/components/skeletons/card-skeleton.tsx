import { cn } from "@/lib/utils"

export function CardSkeleton({className}:{className?: string}) {
  return <div className={cn("aspect-video w-full rounded-xl bg-gray-200 animate-pulse", className)} />
}

export default CardSkeleton

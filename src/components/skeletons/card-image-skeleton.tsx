import { Card, CardContent, CardHeader } from "../ui/card"

export function CardPortraitSkeleton() {
  return (
    <Card className="grid animate-pulse grid-rows-[auto_auto_1fr_auto]">
      <div className="aspect-video w-full rounded-t bg-gray-200" />
      <CardHeader className="py-3">
        <div className="h-6 w-full rounded bg-gray-200" />
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="h-4 w-1/2 rounded bg-gray-200" />
          <div className="h-4 w-3/4 rounded bg-gray-200" />
          <div className="h-4 w-1/2 rounded bg-gray-200" />
        </div>
      </CardContent>
    </Card>
  )
}

export default CardPortraitSkeleton

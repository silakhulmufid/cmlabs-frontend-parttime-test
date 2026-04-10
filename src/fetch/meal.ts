import { API_BASE_URL } from "@/constants"
import { MealDetailResponse } from "@/types/meal"

export async function getMealDetail({
  id,
}: {
  id: string
}): Promise<MealDetailResponse | null> {
  const url = `${API_BASE_URL}/lookup.php?i=${id}`

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    return null
  }

  return response.json()
}

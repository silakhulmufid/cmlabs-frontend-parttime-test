"use client"

import HeaderWavesImage from "@/components/custom/header-waves-image"
import { modifiedMealHelper } from "@/lib/meal"
import { useGetMealDetailQuery } from "@/store/meal/api"

export default function MealDetail(params: { id: string }) {
  const { data, isFetching } = useGetMealDetailQuery(params.id, {
    refetchOnMountOrArgChange: true,
  })
  const modifiedData = data?.meals.map((item) => modifiedMealHelper(item))[0]
  return (
    <div className="relative flex min-h-screen">
      <div className="flex-1">
        <HeaderWavesImage
          title={modifiedData?.strMeal || "Meal Detail"}
          imageUrl={modifiedData?.strMealThumb || ""}
        />
      </div>
    </div>
  )
}

"use client"

import ContentCard from "@/components/custom/content-card"
import HeaderWaves from "@/components/custom/header-waves"
import { CardSkeleton } from "@/components/skeletons"
import { Button } from "@/components/ui/button"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { useGetMealListQuery } from "@/store/meal/api"
import {
  selectMealFilter,
  selectMealMaxData,
  setMealFilter,
  setMealMaxData,
} from "@/store/meal/meal-slice"
import { RotateCcw } from "lucide-react"

export default function Home() {
  const dispatch = useAppDispatch()
  const filter = useAppSelector((state) => selectMealFilter(state))
  const maxData = useAppSelector((state) => selectMealMaxData(state))
  const { data, isFetching: isLoading } = useGetMealListQuery(
    { ...filter },
    { refetchOnMountOrArgChange: true }
  )

  return (
    <div className="relative flex min-h-screen">
      {filter.filterValue && (
        <Button
          size="icon"
          className="absolute top-4 left-4 cursor-pointer"
          onClick={() => {
            dispatch(setMealFilter({ filterBy: "i", filterValue: "" }))
            dispatch(setMealMaxData(20))
          }}
        >
          <RotateCcw />
        </Button>
      )}
      <div className="flex-1">
        <HeaderWaves title={`${filter.filterValue ? filter.filterValue : "All"} Meal List`} />
        <div className="grid grid-cols-1 gap-4 px-4 pb-20 md:grid-cols-2 md:px-16 lg:grid-cols-3 lg:px-32">
          {isLoading &&
            Array.from({ length: 10 }).map((_, i) => <CardSkeleton key={i} />)}
          {!isLoading &&
            data?.meals
              .filter((_, i) => i <= maxData)
              .map((meal, i) => (
                <ContentCard
                  key={i}
                  title={meal.strMeal}
                  url={`/meal/${meal.idMeal}`}
                  image={meal.strMealThumb}
                  classnames={{
                    textContainer: "p-4",
                  }}
                />
              ))}
          {!isLoading && (data?.meals.length || 0) > maxData && (
            <Button
              className="col-span-3"
              size="lg"
              onClick={() => dispatch(setMealMaxData(maxData + 20))}
            >
              Tampilkan lebih banyak
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

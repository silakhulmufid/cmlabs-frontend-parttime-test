"use client"

import ContentCard from "@/components/custom/content-card"
import HeaderWaves from "@/components/custom/header-waves"
import { CardSkeleton } from "@/components/skeletons"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { useGetMealListQuery } from "@/store/meal/api"
import {
  selectMealFilter,
  selectMealMaxData,
  setMealFilter,
  setMealMaxData,
} from "@/store/meal/meal-slice"
import { selectToggleSidebar } from "@/store/util/util-slice"
import { RotateCcw } from "lucide-react"

export default function Home() {
  const dispatch = useAppDispatch()
  const filter = useAppSelector((state) => selectMealFilter(state))
  const maxData = useAppSelector((state) => selectMealMaxData(state))
  const isSidebarOpen = useAppSelector((state) => selectToggleSidebar(state))
  const { data, isFetching: isLoading } = useGetMealListQuery(
    { ...filter },
    { refetchOnMountOrArgChange: true }
  )

  return (
    <div className="relative flex min-h-screen">
      {filter.filterValue && (
        <Button
          size="icon"
          className="absolute top-4 right-4 cursor-pointer"
          onClick={() => {
            dispatch(setMealFilter({ filterBy: "i", filterValue: "" }))
            dispatch(setMealMaxData(20))
          }}
        >
          <RotateCcw />
        </Button>
      )}
      <div className="flex-1">
        <HeaderWaves
          title={`${filter.filterValue ? filter.filterValue : "All"} Meal List`}
        />
        <div
          className={cn(
            "grid grid-cols-1 gap-4 px-4 pb-20 sm:grid-cols-2 sm:px-16 md:grid-cols-3 lg:grid-cols-4",
            isSidebarOpen && "lg:grid-cols-3"
          )}
        >
          {isLoading &&
            Array.from({ length: 10 }).map((_, i) => <CardSkeleton key={i} />)}
          {!isLoading &&
            data?.meals
              .filter((_, i) => i <= maxData)
              .map((meal, i) => (
                <div key={i}>
                  <ContentCard
                    title={meal.strMeal}
                    url={`/meal/${meal.idMeal}`}
                    image={meal.strMealThumb}
                    classnames={{
                      textContainer: "p-4",
                      text: "md:text-xl",
                    }}
                  />
                </div>
              ))}
          {!isLoading && (data?.meals.length || 0) > maxData && (
            <Button
              className="col-span-full"
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

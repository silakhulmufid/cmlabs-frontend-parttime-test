"use client"

import ContentCard from "@/components/custom/content-card"
import HeaderWaves from "@/components/custom/header-waves"
import { CardSkeleton } from "@/components/skeletons"
import { Button } from "@/components/ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
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
import { debounce } from "lodash"
import { RotateCcw, Search } from "lucide-react"
import { useMemo, useState } from "react"

export default function Home() {
  const dispatch = useAppDispatch()
  const filter = useAppSelector((state) => selectMealFilter(state))
  const maxData = useAppSelector((state) => selectMealMaxData(state))
  const isSidebarOpen = useAppSelector((state) => selectToggleSidebar(state))

  const [inputSearch, setInputSearch] = useState<string>("")
  const [debouncedSearch, setDebouncedSearch] = useState<string>("")

  const { data, isFetching: isLoading } = useGetMealListQuery(
    { ...filter },
    { refetchOnMountOrArgChange: true }
  )

  const filteredData =
    data?.meals.filter((item) =>
      item.strMeal.toLowerCase().includes(debouncedSearch.toLowerCase())
    ) || []

  const handleResetFilter = () => {
    dispatch(setMealFilter({ filterBy: "i", filterValue: "" }))
    dispatch(setMealMaxData(20))
  }

  const debouncedUpdateSearch = useMemo(
    () =>
      debounce((value: string) => {
        setDebouncedSearch(value)
        dispatch(setMealMaxData(20))
      }, 500),
    [dispatch]
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setInputSearch(val)
    debouncedUpdateSearch(val)
  }

  return (
    <div className="relative flex min-h-screen">
      {filter.filterValue && (
        <Button
          size="icon"
          className="absolute top-4 right-4 cursor-pointer"
          onClick={handleResetFilter}
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
          <InputGroup className="mb-4 col-span-full h-12 bg-white">
            <InputGroupInput
              value={inputSearch}
              placeholder="Go Search Your Favorite Meal"
              onChange={handleInputChange}
            />
            <InputGroupAddon className="pr-2 pl-4">
              <Search />
            </InputGroupAddon>
            {inputSearch && (
              <InputGroupAddon align="inline-end" className="pr-4 pl-2">{`${filteredData.length} results`}</InputGroupAddon>
            )}
          </InputGroup>
          {isLoading &&
            Array.from({ length: 10 }).map((_, i) => <CardSkeleton key={i} />)}
          {!isLoading &&
            filteredData
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
          {!isLoading && !filteredData.length && (
            <div className="col-span-full flex h-28 items-center justify-center rounded-xl bg-rose-100">
              <h2 className="font-medium text-rose-400">No Data Found</h2>
            </div>
          )}
          {!isLoading && filteredData.length > maxData && (
            <Button
              className="col-span-full"
              size="lg"
              onClick={() => dispatch(setMealMaxData(maxData + 20))}
            >
              Load more
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

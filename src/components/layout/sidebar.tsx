"use client"

import { CookingPot, LayoutGrid, MapPinned, Search } from "lucide-react"

import ContentCard from "@/components/custom/content-card"
import { CardSkeleton } from "@/components/skeletons"
import { Button } from "@/components/ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { useGetAreaListQuery } from "@/store/area/api"
import { useGetCategoryListQuery } from "@/store/category/api"
import { useGetIngredientListQuery } from "@/store/ingredient/api"
import { setMealFilter, setMealMaxData } from "@/store/meal/meal-slice"
import { setToggleSidebar } from "@/store/util/util-slice"
import { debounce } from "lodash"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useDispatch } from "react-redux"

export function Sidebar({ className }: { className?: string }) {
  const [tab, setTab] = useState<string>("i")
  const [search, setSearch] = useState<string>("")
  const [maxData, setMaxData] = useState<number>(20)
  const dispatch = useDispatch()
  const router = useRouter()

  const { data: ingredientData, isFetching: ingredientIsFetching } =
    useGetIngredientListQuery({ search: tab === "i" ? search : "" })
  const { data: categoryData, isFetching: categoryIsFetching } =
    useGetCategoryListQuery()
  const { data: areaData, isFetching: areaIsFetching } = useGetAreaListQuery()

  const isLoading = ingredientIsFetching || categoryIsFetching || areaIsFetching

  const tabItems = [
    {
      label: "Ingredient",
      value: "i",
      icon: <CookingPot />,
    },
    {
      label: "Category",
      value: "c",
      icon: <LayoutGrid />,
    },
    {
      label: "Area",
      value: "a",
      icon: <MapPinned />,
    },
  ]

  const handleSearch = debounce((value: string) => {
    setSearch(value)
    setMaxData(20)
  }, 500)

  return (
    <div
      className={cn(
        "fixed inset-x-0 left-0 z-[100] h-screen w-80 space-y-4 overflow-y-auto bg-rose-400 p-4 shadow-lg",
        className
      )}
    >
      <Link href="/">
        <h1 className="mb-4 text-2xl font-bold text-white">GoGoMeals</h1>
      </Link>
      <Tabs defaultValue="i" onValueChange={setTab}>
        <TabsList>
          {tabItems.map((item) => (
            <TabsTrigger
              key={item.value}
              value={item.value}
              className="cursor-pointer data-active:bg-rose-400 data-active:text-white hover:data-active:text-white"
            >
              {item.icon}
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      {tab === "i" && (
        <InputGroup className="w-full bg-white">
          <InputGroupInput
            placeholder="Search..."
            onChange={(e) => handleSearch(e.target.value)}
          />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>
      )}
      {isLoading && (
        <div className="grid grid-cols-2 gap-2">
          {Array.from({ length: 10 }).map((_, i) => (
            <CardSkeleton key={i} className="aspect-2/1" />
          ))}
        </div>
      )}
      <div className="grid grid-cols-2 gap-x-2">
        {!isLoading &&
          tab === "i" &&
          ingredientData?.meals
            .filter((_, i) => i < maxData)
            .map((ingredient, i) => (
              <ContentCard
                key={i}
                title={ingredient.strIngredient}
                onClick={() => {
                  router.push("/")
                  dispatch(
                    setMealFilter({
                      filterBy: "i",
                      filterValue: ingredient.strIngredient,
                    })
                  )
                  dispatch(setMealMaxData(20))
                  dispatch(setToggleSidebar(false))
                }}
                image={ingredient.strThumb}
                classnames={{
                  image: "aspect-2/1",
                  textContainer: "p-2",
                  text: "text-sm leading-[100%]",
                }}
              />
            ))}
        {!isLoading &&
          tab === "c" &&
          categoryData?.categories
            .filter((_, i) => i < maxData)
            .map((category, i) => (
              <ContentCard
                key={i}
                title={category.strCategory}
                onClick={() => {
                  router.push("/")
                  dispatch(
                    setMealFilter({
                      filterBy: "c",
                      filterValue: category.strCategory,
                    })
                  )
                  dispatch(setMealMaxData(20))
                  dispatch(setToggleSidebar(false))
                }}
                image={category.strCategoryThumb}
                classnames={{
                  image: "aspect-2/1",
                  textContainer: "p-2",
                  text: "text-sm leading-[100%]",
                }}
              />
            ))}
        {!isLoading &&
          tab === "a" &&
          areaData?.meals
            .filter((_, i) => i < maxData)
            .map((area, i) => (
              <ContentCard
                key={i}
                title={area.strArea}
                onClick={() => {
                  router.push("/")
                  dispatch(
                    setMealFilter({ filterBy: "a", filterValue: area.strArea })
                  )
                  dispatch(setMealMaxData(20))
                  dispatch(setToggleSidebar(false))
                }}
                classnames={{
                  image: "aspect-2/1",
                  textContainer: "p-2",
                  text: "text-sm leading-[100%]",
                }}
              />
            ))}
        {!isLoading &&
          (tab === "i"
            ? ingredientData?.meals.length || 0
            : tab === "c"
              ? categoryData?.categories.length || 0
              : areaData?.meals.length || 0) > maxData && (
            <Button
              variant="outline"
              className="col-span-2 border-none text-rose-600 hover:text-rose-600"
              onClick={() => setMaxData(maxData + 20)}
            >
              Load More
            </Button>
          )}
      </div>
    </div>
  )
}

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
import { useMemo, useState } from "react"
import { useDispatch } from "react-redux"

export function Sidebar({ className }: { className?: string }) {
  const [tab, setTab] = useState<string>("i")
  const [inputSearch, setInputSearch] = useState<string>("")
  const [debouncedSearch, setDebouncedSearch] = useState<string>("")
  const [maxData, setMaxData] = useState<number>(20)
  const dispatch = useDispatch()
  const router = useRouter()

  const { data: ingredientData, isFetching: ingredientIsFetching } =
    useGetIngredientListQuery()
  const { data: categoryData, isFetching: categoryIsFetching } =
    useGetCategoryListQuery()
  const { data: areaData, isFetching: areaIsFetching } = useGetAreaListQuery()

  const isLoading = ingredientIsFetching || categoryIsFetching || areaIsFetching

  const filteredIngredientData =
    ingredientData?.meals.filter((item) =>
      item.strIngredient.toLowerCase().includes(debouncedSearch.toLowerCase())
    ) || []
  const filteredCategoryData =
    categoryData?.categories.filter((item) =>
      item.strCategory.toLowerCase().includes(debouncedSearch.toLowerCase())
    ) || []
  const filteredAreaData =
    areaData?.meals.filter((item) =>
      item.strArea.toLowerCase().includes(debouncedSearch.toLowerCase())
    ) || []

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

  const debouncedUpdateSearch = useMemo(
    () =>
      debounce((value: string) => {
        setDebouncedSearch(value)
        setMaxData(20)
      }, 500),
    []
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setInputSearch(val)
    debouncedUpdateSearch(val)
  }

  const handleTabChange = (value: string) => {
    setTab(value)
    setInputSearch("")
    setDebouncedSearch("")
    setMaxData(20)
  }

  const handleClickItem = ({
    filterBy,
    filterValue,
  }: {
    filterBy: "i" | "c" | "a"
    filterValue: string
  }) => {
    router.push("/")
    dispatch(
      setMealFilter({
        filterBy,
        filterValue,
      })
    )
    dispatch(setMealMaxData(20))
    dispatch(setToggleSidebar(false))
  }

  return (
    <div
      className={cn(
        "fixed inset-x-0 left-0 z-[100] h-screen w-80 space-y-4 overflow-y-auto bg-rose-400 p-4 shadow-lg",
        className
      )}
    >
      <Link
        href="/"
        onClick={() =>
          dispatch(setMealFilter({ filterBy: "i", filterValue: "" }))
        }
      >
        <h1 className="mb-4 text-2xl font-bold text-white">GoGoMeals</h1>
      </Link>
      <Tabs defaultValue="i" onValueChange={handleTabChange}>
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
      <InputGroup className="w-full bg-white">
        <InputGroupInput
          value={inputSearch}
          placeholder={`Search ${tabItems.find((item) => item.value === tab)?.label}`}
          onChange={handleInputChange}
        />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
      </InputGroup>
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
          filteredIngredientData
            .filter((_, i) => i < maxData)
            .map((ingredient, i) => (
              <ContentCard
                key={i}
                title={ingredient.strIngredient}
                onClick={() =>
                  handleClickItem({
                    filterBy: "i",
                    filterValue: ingredient.strIngredient,
                  })
                }
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
          filteredCategoryData
            .filter((_, i) => i < maxData)
            .map((category, i) => (
              <ContentCard
                key={i}
                title={category.strCategory}
                onClick={() =>
                  handleClickItem({
                    filterBy: "c",
                    filterValue: category.strCategory,
                  })
                }
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
          filteredAreaData
            .filter((_, i) => i < maxData)
            .map((area, i) => (
              <ContentCard
                key={i}
                title={area.strArea}
                onClick={() =>
                  handleClickItem({
                    filterBy: "a",
                    filterValue: area.strArea,
                  })
                }
                classnames={{
                  image: "aspect-2/1",
                  textContainer: "p-2",
                  text: "text-sm leading-[100%]",
                }}
              />
            ))}
        {!isLoading &&
          ((tab === "i" && !filteredIngredientData.length) ||
            (tab === "c" && !filteredCategoryData.length) ||
            (tab === "a" && !filteredAreaData.length)) && (
            <div className="col-span-2 flex h-28 items-center justify-center rounded-xl bg-rose-100">
              <h2 className="font-medium text-rose-400">No Data Found</h2>
            </div>
          )}
        {!isLoading &&
          (tab === "i"
            ? filteredIngredientData.length || 0
            : tab === "c"
              ? filteredCategoryData.length || 0
              : filteredAreaData.length || 0) > maxData && (
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

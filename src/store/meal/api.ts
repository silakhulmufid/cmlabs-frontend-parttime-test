
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { API_BASE_URL } from "@/constants"
import { MealDetailResponse, MealListResponse } from "@/types/meal"

export const mealApi = createApi({
  reducerPath: "mealApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  tagTypes: ["meal"],
  endpoints: (builder) => ({
    getMealList: builder.query<MealListResponse, {
      filterBy: "i" | "c" | "a",
      filterValue: string
    }>({
      query: ({ filterBy, filterValue }) =>
        `${API_BASE_URL}/filter.php?${filterBy}=${filterValue}`,
      providesTags: [{ type: "meal", id: "LIST" }],
    }),
    searchMealList: builder.query<MealDetailResponse, {
      search: string
    }>({
      query: ({ search }) =>
        `${API_BASE_URL}/search.php?s=${search}`,
      providesTags: [{ type: "meal", id: "SEARCH_LIST" }],
    }),
    getMealDetail: builder.query<MealDetailResponse, string>({
      query: (id) =>
        `${API_BASE_URL}/lookup.php?i=${id}`,
      providesTags: [{ type: "meal", id: "DETAIL" }],
    }),
  }),
})

export const { useGetMealListQuery, useSearchMealListQuery, useGetMealDetailQuery } = mealApi

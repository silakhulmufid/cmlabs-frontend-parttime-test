import { API_BASE_URL } from "@/constants"
import { IngredientListResponse } from "@/types/ingredient"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const ingredientApi = createApi({
  reducerPath: "ingredientApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  tagTypes: ["ingredient"],
  endpoints: (builder) => ({
    getIngredientList: builder.query<
      IngredientListResponse,
      { search: string } | void
    >({
      query: (params) =>
        `${API_BASE_URL}/list.php?i=${encodeURIComponent(params?.search || "")}`,
      providesTags: ["ingredient"],
    }),
  }),
})

export const { useGetIngredientListQuery } = ingredientApi

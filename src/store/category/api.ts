
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { API_BASE_URL } from "@/constants"
import { CategoryListResponse } from "@/types/category"

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  tagTypes: ["category"],
  endpoints: (builder) => ({
    getCategoryList: builder.query<CategoryListResponse, void>({
      query: (params) =>
        `${API_BASE_URL}/categories.php`,
      providesTags: ["category"],
    }),
  }),
})

export const { useGetCategoryListQuery } = categoryApi

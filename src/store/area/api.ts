
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { API_BASE_URL } from "@/constants"
import { AreaListResponse } from "@/types/area"

export const areaApi = createApi({
  reducerPath: "areaApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  tagTypes: ["area"],
  endpoints: (builder) => ({
    getAreaList: builder.query<AreaListResponse, { search: string } | void>({
      query: (params) =>
        `${API_BASE_URL}/list.php?a=${encodeURIComponent(params?.search || "")}`,
      providesTags: ["area"],
    }),
  }),
})

export const { useGetAreaListQuery } = areaApi

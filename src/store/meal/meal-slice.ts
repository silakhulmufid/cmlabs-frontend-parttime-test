// app/store/meal/meal-slice.ts
import type { RootState } from "@/store"
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface MealStore {
  filter: {
    filterBy: "i" | "c" | "a"
    filterValue: string
  }
  maxData: number
}

const initialState: MealStore = {
  filter: {
    filterBy: "i",
    filterValue: "",
  },
  maxData: 20,
}

export const mealSlice = createSlice({
  name: "meal",
  initialState,
  reducers: {
    setMealFilter: (
      state,
      action: PayloadAction<{ filterBy: "i" | "c" | "a"; filterValue: string }>
    ) => {
      state.filter.filterBy = action.payload.filterBy
      state.filter.filterValue = action.payload.filterValue
    },
    setMealMaxData: (state, action: PayloadAction<number>) => {
      state.maxData = action.payload
    },
  },
})

export const { setMealFilter, setMealMaxData } = mealSlice.actions

// Selectors
export const selectMealFilter = (state: RootState) => state.meal.filter

export const selectMealMaxData = (state: RootState) => state.meal.maxData

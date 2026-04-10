import { combineReducers } from "@reduxjs/toolkit"
import { areaApi } from "./area/api"
import { categoryApi } from "./category/api"
import { ingredientApi } from "./ingredient/api"
import { mealApi } from "./meal/api"
import { mealSlice } from "./meal/meal-slice"
import { utilSlice } from "./util/util-slice"

export const rootReducer = combineReducers({
  meal: mealSlice.reducer,
  util: utilSlice.reducer,
  [areaApi.reducerPath]: areaApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [ingredientApi.reducerPath]: ingredientApi.reducer,
  [mealApi.reducerPath]: mealApi.reducer,
})

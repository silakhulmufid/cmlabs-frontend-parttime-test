import { areaApi } from "./area/api"
import { categoryApi } from "./category/api"
import { ingredientApi } from "./ingredient/api"
import { mealApi } from "./meal/api"

export const rootMiddleware = [
  areaApi.middleware,
  categoryApi.middleware,
  mealApi.middleware,
  ingredientApi.middleware,
]

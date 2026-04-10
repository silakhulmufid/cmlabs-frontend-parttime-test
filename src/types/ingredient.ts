export interface Ingredient {
  idIngredient: string
  strIngredient: string
  strDescription: string
  strThumb: string
  strType: null
}

export interface IngredientListResponse {
  meals: Ingredient[]
}

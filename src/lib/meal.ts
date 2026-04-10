import { MealDetail, ModifiedMealData } from "@/types/meal"

export const modifiedMealHelper = (meal: MealDetail): ModifiedMealData => {
  const ingredients: string[] = []
  const measures: string[] = []

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}` as keyof MealDetail]
    const measure = meal[`strMeasure${i}` as keyof MealDetail]

    if (ingredient && ingredient.trim() !== "") {
      ingredients.push(ingredient.trim())
      measures.push(measure ? measure.trim() : "")
    }
  }

  return {
    ...meal,
    strIngredient: ingredients,
    strMeasure: measures,
  }
}

import { MealDetail, ModifiedMealData } from "@/types/meal";

export const modifiedMealHelper = (meal: MealDetail): ModifiedMealData => {
  const combinedIngredients: string[] = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}` as keyof MealDetail];
    const measure = meal[`strMeasure${i}` as keyof MealDetail];

    if (ingredient && ingredient.trim() !== "") {
      const combined = `${measure || ""} ${ingredient}`.trim();
      combinedIngredients.push(combined);
    }
  }

  return {
    idMeal: meal.idMeal,
    strMeal: meal.strMeal,
    strMealAlternate: meal.strMealAlternate,
    strCategory: meal.strCategory,
    strArea: meal.strArea,
    strInstructions: meal.strInstructions,
    strMealThumb: meal.strMealThumb,
    strTags: meal.strTags,
    strYoutube: meal.strYoutube,
    strSource: meal.strSource,
    strImageSource: meal.strImageSource,
    strCreativeCommonsConfirmed: meal.strCreativeCommonsConfirmed,
    dateModified: meal.dateModified,
    ingredients: combinedIngredients,
  };
};
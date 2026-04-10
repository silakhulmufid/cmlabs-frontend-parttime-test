import MealDetail from "@/components/pages/meal/detail"
import { BASE_URL } from "@/constants"
import { getMealDetail } from "@/fetch/meal"
import { Metadata } from "next"
import { notFound } from "next/navigation"

export async function generateMetadata(props: {
  params: Promise<{ id: string }>
}): Promise<Metadata | undefined> {
  const { id } = await props.params
  const meal = await getMealDetail({ id })
  if (!meal) return

  const data = meal.meals[0]

  const publishedAt = data?.dateModified
  const modifiedAt = data.dateModified

  const ogImages = data?.strMealThumb ? [data?.strMealThumb] : []

  return {
    title: data.strMeal,
    description: data.strTags,
    openGraph: {
      title: data.strMeal,
      description: data.strTags || "",
      siteName: "Sakaloka Digital",
      locale: "en_US",
      type: "article",
      publishedTime: publishedAt || undefined,
      modifiedTime: modifiedAt || undefined,
      url: "./",
      images: ogImages,
      authors: "GoGoMeals",
    },
    twitter: {
      card: "summary_large_image",
      title: data.strMeal,
      description: data.strTags,
      images: ogImages,
    },
  }
}

export default async function MealDetailPage(props: {
  params: Promise<{ id: string }>
}) {
  const { id } = await props.params

  const mealData = await getMealDetail({ id })

  if (!mealData) {
    notFound()
  }

  const meal = mealData.meals[0]

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/meal/${id}`,
    },
    headline: meal?.strMeal,
    image: meal?.strMealThumb
      ? {
          "@type": "ImageObject",
          url: meal?.strMealThumb,
        }
      : undefined,
    datePublished: meal?.dateModified || undefined,
    dateModified: meal?.dateModified || undefined,
    author: {
      "@type": "Person",
      name: "GoGoMeals",
    },
  }

  return <MealDetail id={id} data={mealData} />
}

import MealDetail from "@/components/pages/meal/detail"
import { BASE_URL } from "@/constants"
import { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata | undefined> {
  return {
    title: "GOGOMEALS",
    description: "Meal Detail page description",
    openGraph: {
      title: "GOGOMEALS",
      description: "Meal Detail page description",
      siteName: "GOGOMEALS",
      locale: "en_US",
      type: "website",
      url: `${BASE_URL}`,
      images: [],
    },
    twitter: {
      card: "summary_large_image",
      title: "GOGOMEALS",
      description: "Meal Detail page description",
      images: [],
    },
  }
}

export default async function MealDetailPage(props: {
  params: Promise<{ id: string }>
}) {
  const { id } = await props.params

  return <MealDetail id={id} />
}

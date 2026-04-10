import Home from "@/components/pages/home"
import { BASE_URL } from "@/constants"
import { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata | undefined> {
  return {
    title: "GoGoMeals",
    description: "Home page description",
    openGraph: {
      title: "GoGoMeals",
      description: "Home page description",
      siteName: "GoGoMeals",
      locale: "en_US",
      type: "website",
      url: `${BASE_URL}`,
      images: [],
    },
    twitter: {
      card: "summary_large_image",
      title: "GoGoMeals",
      description: "Home page description",
      images: [],
    },
  }
}

export default async function HomePage() {
  return <Home />
}

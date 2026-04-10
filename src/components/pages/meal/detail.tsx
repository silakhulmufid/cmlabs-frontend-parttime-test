"use client"

import HeaderWavesImage from "@/components/custom/header-waves-image"
import { modifiedMealHelper } from "@/lib/meal"
import { MealDetailResponse } from "@/types/meal"

export default function MealDetail(params: {
  id: string
  data: MealDetailResponse | null
}) {
  const modifiedData = params.data?.meals.map((item) =>
    modifiedMealHelper(item)
  )[0]

  return (
    <div className="relative flex min-h-screen">
      <div className="flex-1">
        <HeaderWavesImage
          title={modifiedData?.strMeal || "Meal Detail"}
          description={modifiedData?.strArea}
          imageUrl={modifiedData?.strMealThumb || ""}
        />
        <div className="space-y-10 px-20 pb-20">
          <div className="grid grid-cols-3">
            <div className="col-span-1">
              <h2 className="mb-4 text-2xl font-bold">Ingredients</h2>
              <ul className="list-disc pl-5">
                {modifiedData?.ingredients.map((ingredient, i) => (
                  <li key={i}>{ingredient}</li>
                ))}
              </ul>
            </div>
            <div className="col-span-2">
              <h2 className="mb-4 text-2xl font-bold">Instructions</h2>
              <p className="whitespace-pre-line">
                {modifiedData?.strInstructions}
              </p>
            </div>
          </div>
          <div className="">
            <h2 className="mb-4 text-2xl font-bold">Video Tutorial</h2>
            {modifiedData?.strYoutube ? (
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${modifiedData.strYoutube.split("v=")[1]}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <div className="flex h-64 items-center justify-center rounded-lg bg-gray-100">
                <p>No video tutorial available.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

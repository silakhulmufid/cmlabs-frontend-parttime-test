import SmartImage from "./smart-image"

export default function HeaderWavesImage({
  title,
  imageUrl,
  description,
}: {
  title: string
  imageUrl: string
  description?: string
}) {
  return (
    <div className="relative">
      <div className="px-4 pt-40 pb-10 text-primary-foreground md:px-16 lg:px-32">
        <h2 className="text-2xl font-bold text-rose-500">{description}</h2>
        <h1 className="text-4xl font-bold text-white">{title}</h1>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="text-white"
      >
        <path
          fill="currentColor"
          fillOpacity="1"
          d="M0,192L48,192C96,192,192,192,288,176C384,160,480,128,576,122.7C672,117,768,139,864,144C960,149,1056,139,1152,117.3C1248,96,1344,64,1392,48L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
      <div className="absolute inset-0 -z-1 h-full w-full overflow-hidden rounded-none bg-black/60"></div>
      <SmartImage
        src={imageUrl}
        alt={title}
        containerClassName="absolute inset-0 overflow-hidden w-full h-full rounded-none -z-10"
        className="transition-transform duration-500 ease-in-out group-hover:scale-110"
        hideImageFallback
      />
    </div>
  )
}

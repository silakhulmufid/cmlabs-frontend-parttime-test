export default function HeaderWaves({ title }: { title: string }) {
  return (
    <div>
      <div className="bg-rose-200 px-4 pt-20 text-rose-500 md:px-16 lg:px-32">
        <h1 className="text-4xl font-bold">{title}</h1>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="text-rose-200"
      >
        <path
          fill="currentColor"
          fillOpacity="1"
          d="M0,192L48,192C96,192,192,192,288,176C384,160,480,128,576,122.7C672,117,768,139,864,144C960,149,1056,139,1152,117.3C1248,96,1344,64,1392,48L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        ></path>
      </svg>
    </div>
  )
}

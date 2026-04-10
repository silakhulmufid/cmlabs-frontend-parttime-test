export default function Footer() {
  return (
    <footer className="flex h-9 w-full items-center justify-center bg-rose-200 text-sm text-rose-500">
      <p>&copy; {new Date().getFullYear()} GoGoMeals. All rights reserved.</p>
    </footer>
  )
}

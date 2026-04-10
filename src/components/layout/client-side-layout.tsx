"use client"

import { cn } from "@/lib/utils"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { selectToggleSidebar, setToggleSidebar } from "@/store/util/util-slice"
import { Menu } from "lucide-react"
import { ReactNode } from "react"
import { Button } from "../ui/button"
import Footer from "./footer"
import { Sidebar } from "./sidebar"

export default function ClientSideLayout({
  children,
}: {
  children: ReactNode
}) {
  const dispatch = useAppDispatch()
  const isSidebarOpen = useAppSelector((state) => selectToggleSidebar(state))

  return (
    <>
      <Sidebar
        className={cn(
          "transition-all duration-200",
          !isSidebarOpen && "-translate-x-[100%]"
        )}
      />
      <div className={cn("relative flex-1 ml-0 translate-all duration-200", isSidebarOpen && "lg:ml-80")}>
        <Button
          size="icon-lg"
          className="absolute top-4 left-4 z-[90] cursor-pointer"
          onClick={() => {
            dispatch(setToggleSidebar(!isSidebarOpen))
          }}
        >
          <Menu />
        </Button>
        {isSidebarOpen && (
          <button
            className="absolute inset-0 z-[90] h-full w-full overflow-hidden rounded-none bg-black/60 backdrop-blur lg:hidden"
            onClick={() => dispatch(setToggleSidebar(false))}
          ></button>
        )}
        {children}
        <Footer />
      </div>
    </>
  )
}

"use client"

import { cn } from "@/lib/utils"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { selectToggleSidebar, setToggleSidebar } from "@/store/util/util-slice"
import { ReactNode } from "react"
import { Sidebar } from "./sidebar"
import { Button } from "../ui/button"
import { Menu } from "lucide-react"
import Footer from "./footer"

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
          "w-80 overflow-hidden transition-all duration-200",
          !isSidebarOpen && "w-0 p-0"
        )}
      />
      <div
        className={cn(
          "w-80 overflow-hidden transition-all duration-200",
          !isSidebarOpen && "w-0 p-0"
        )}
      ></div>
      <div className="relative flex-1">
        <Button
          size="icon-lg"
          className="absolute top-4 left-4 cursor-pointer z-[100]"
          onClick={() => {
            dispatch(setToggleSidebar(!isSidebarOpen))
          }}
        >
          <Menu />
        </Button>
        {children}
        <Footer />
      </div>
    </>
  )
}

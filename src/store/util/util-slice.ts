// app/store/util/util-slice.ts
import type { RootState } from "@/store"
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface UtilStore {
  isSidebarOpen: boolean
}

const initialState: UtilStore = {
  isSidebarOpen: true,
}

export const utilSlice = createSlice({
  name: "util",
  initialState,
  reducers: {
    setToggleSidebar: (state, action: PayloadAction<boolean>) => {
      state.isSidebarOpen = action.payload
    },
  },
})

export const { setToggleSidebar } = utilSlice.actions

// Selectors
export const selectToggleSidebar = (state: RootState) => state.util.isSidebarOpen

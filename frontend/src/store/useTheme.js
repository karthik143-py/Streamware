// import {create} from 'zustand';

// export const useTheme = create((set) => ({
//       theme: localStorage.getItem("streamify-theme") || "coffee",
//       setTheme: (newTheme) => set({theme: newTheme}),
// }));
import { create } from "zustand";

export const useTheme = create((set) => ({
  theme: localStorage.getItem("streamify-theme") || "coffee",
  setTheme: (theme) => {
    localStorage.setItem("streamify-theme", theme);
    set({ theme });
  },
}));

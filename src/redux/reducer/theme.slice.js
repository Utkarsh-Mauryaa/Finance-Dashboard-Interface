import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: localStorage.getItem("fin_theme") ?? "dark",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "dark" ? "light" : "dark";
      localStorage.setItem("fin_theme", state.theme);
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem("fin_theme", action.payload);
    },
  },
});

export default themeSlice;
export const { toggleTheme, setTheme } = themeSlice.actions;
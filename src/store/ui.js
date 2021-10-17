import { createSlice } from "@reduxjs/toolkit";

const initialUiState = {
  themeIsLight: true,
};

const uiSlice = createSlice({
  name: "ui",
  initialState: initialUiState,
  reducers: {
    changeTheme(state, action) {
      state.themeIsLight = !state.themeIsLight;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;

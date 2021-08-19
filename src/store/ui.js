import { createSlice } from "@reduxjs/toolkit";

const initialUiState = {
  themeIsLight: true,
  loading:false
};

const uiSlice = createSlice({
  name: "ui",
  initialState: initialUiState,
  reducers: {
    changeTheme(state, action) {
      state.themeIsLight = !state.themeIsLight;
    },
    loadingStart(state,action){
      console.log('loading start')
      state.loading = true
    },
    loadingEnd(state,action){
      console.log('loading end')
      state.loading = false
    }
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;

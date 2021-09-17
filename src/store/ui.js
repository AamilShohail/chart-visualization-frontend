import { createSlice } from "@reduxjs/toolkit";

const initialUiState = {
  themeIsLight: false,
  loading: true,
  authError: false,
  sheetMetaLoad: false,
  sheetUpload:false
};

const uiSlice = createSlice({
  name: "ui",
  initialState: initialUiState,
  reducers: {
    changeTheme(state, action) {
      state.themeIsLight = !state.themeIsLight;
    },
    loadingStart(state, action) {
      console.debug("ui slice =>loading start");
      state.loading = true;
    },
    loadingEnd(state, action) {
      console.debug("loading end");
      state.loading = false;
    },
    loginError(state, action) {
      state.authError = true;
    },
    SheetMetaLoadingChange(state, action) {
      state.sheetMetaLoad = action.payload;
    },
    uploadSheetLoadingChange(state, action) {
      state.sheetUpload = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;

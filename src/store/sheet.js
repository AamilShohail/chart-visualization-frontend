import { createSlice } from "@reduxjs/toolkit";

const initialSheetState = {
  sheets: [
    { id: 1, code: "TAF", name: "Telecoms Adspend Forecasts" },
    { id: 2, code: "UKT", name: "United Kingdom Tables" },
    // { id: 3, code: "FBM", name: "Forecast By Market" },
  ],
  sheetData: {},
  //tabList <- all tab id and relevant value 
  tabList: [],
  //selected tab
  selectedTabName: "",
  // all tabs data
  tabData: [],
  //single tab data
  rows: [],

  barChart: {},
};

const sheetSlice = createSlice({
  name: "sheet",
  initialState: initialSheetState,
  reducers: {
    ChangeSheet(state, action) {
      state.sheetData = action.payload.sheetData;
      state.tabList = action.payload.dropDownValues;
      state.tabData = action.payload.tabsData;
      state.selectedTabName = state.tabList[0].tab_name;

      const selectedSheetData = state.tabData.find(
        (el) => el.tab_name === state.selectedTabName
      );

      const visualizeDataRows = [];

      selectedSheetData.data_set.forEach((element) => {
        visualizeDataRows.push(element.data);
      });

      state.rows = visualizeDataRows;
    },
    // changeSheet(state, action) {},
    changeTab(state, action) {
      state.selectedTabName = action.payload.selectedTab;
      const selectedSheetData = state.tabData.find(
        (el) => el.tab_name === action.payload.selectedTab
      );
      const visualizeDataRows = [];
      selectedSheetData.data_set.forEach((element) => {
        visualizeDataRows.push(element.data);
      });
      state.rows = visualizeDataRows;
    },
    changeBarChartDropdown(state, action) {
      state.barChart = action.payload.barChartData;
    },
  },
});

export const sheetActions = sheetSlice.actions;
export default sheetSlice.reducer;

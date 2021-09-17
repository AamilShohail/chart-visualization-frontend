import { createSlice } from "@reduxjs/toolkit";

const initialSheetState = {
  //system sheets detail
  sheets: [],
  //selected sheet meta data
  sheetData: {},
  //tabList <- all tab id and relevant value
  tabList: [],
  //selected tab
  selectedTabName: "",
  // all tabs data
  tabData: [],
  //selected tab data
  rows: [],

  barChart: {},
};

const sheetSlice = createSlice({
  name: "sheet",
  initialState: initialSheetState,
  reducers: {
    SetSheetsMeta(state, action) {
      state.sheets = action.payload.sheet_list;
      // state.sheets = action.payload.sheet_list[1].sheet_name;
    },
    ChangeSheet(state, action) {
      //console.log('change sheet action ',{...action.payload})
      state.sheetData = action.payload.sheetData;
      state.tabList = action.payload.dropDownValues;
      state.tabData = action.payload.tabsData;
      state.selectedTabName = action.payload.tabsData[0].tab_name;

      const selectedSheetData =action.payload.tabsData.find((el) => el.tab_name ===action.payload.tabsData[0].tab_name);

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

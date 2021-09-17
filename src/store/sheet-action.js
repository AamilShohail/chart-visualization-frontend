import { Sheet } from "../api/agent";
import { sheetActions } from "./sheet-slice";
import { getTabList, changeResponseStructure } from "../helpers/helper";
import { uiActions } from "./ui";

//get all system sheets data
export const getSheetMeta = () => {
  return async (dispatch) => {
    try {
      //console.log("getSheetMeta started")
      dispatch(uiActions.SheetMetaLoadingChange(true));
      const sheets = await fetchSheetMeta();
      dispatch(
        sheetActions.SetSheetsMeta({
          sheet_list: sheets.data,
        })
      );
      dispatch(uiActions.SheetMetaLoadingChange(false));
    } catch (e) {
      dispatch(uiActions.SheetMetaLoadingChange(false));
    }
  };
};
//set user selected node to visualize graph
export const setSheet = (sheetId) => {
  return async (dispatch) => {
    try {
      const sheetPayload = await fetchSheetById(sheetId);
      dispatch(sheetActions.ChangeSheet(sheetPayload));
    } catch (e) {
      //console.log(e);
    }
  };
};

const fetchSheetById = async (sheetId) => {
  const response = await Sheet.fetchSheetById(sheetId);
  if (!response) {
    throw new Error("Could not login right now");
  }
  //console.log(response.data[0].sheet_meta.sheet_name);
  const sheetData = {
    uploadedDate: response.data[0].uploaded_date,
    id: response.data[0].sheet_id,
    name: response.data[0].sheet_meta.sheet_name,
    code: response.data[0].sheet_meta.sheet_code,
  };
  const sheet = changeResponseStructure(response);
  const dropDownValues = getTabList(sheet.tabs);
  const sheetPayload = {
    sheetData,
    dropDownValues,
    tabsData: sheet.tabs,
  };
  return sheetPayload;
};
const fetchSheetMeta = async () => {
  const response = await Sheet.fetchSheetsMeta();
  if (!response) {
    throw new Error("Could not login right now");
  }
  //console.log("fetch sheets", { response });
  return response;
};

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sheetActions } from "../../store/sheet-slice";
import { Dropdown } from "semantic-ui-react";

import tafResponse from "../../assets/telecom_adspend_forecasts.json";
import uktResponse from "../../assets/united_kingdom_tables.json";

import { changeResponseStructure, getTabList } from "../../helpers/helper";

import { getSheetMeta, setSheet } from "../../store/sheet-action";

import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

export default function DataControl() {
  const dispatch = useDispatch();

  const sheetDropdownValues = useSelector((state) => state.sheet.sheets);
  const tabDropdownValues = useSelector((state) => state.sheet.tabList);

  const handleTabChangeHandler = (e, data) => {
    dispatch(sheetActions.changeTab({ selectedTab: data.value }));
  };
  const handleSheetChangeHandler = (e, data) => {
    //console.log(data.value)
    // fetchSheetById(data.value)
    dispatch(setSheet(data.value));
    // let response;
    // if (data.value === "United Kingdom Tables") {
    //   response = uktResponse;
    // }
    // if (data.value === "Telecom Adspend Forecast") {
    //   response = tafResponse;
    // }
    // else{
    //   response = tafResponse;
    // }
    // // if(data.value==="Forecast By Market"){
    // //   response = tafResponse
    // // }

    // const sheetData = {
    //   uploadedDate: response.data.uploaded_date,
    //   id: response.data.sheet_id,
    //   name: response.data.sheet_meta.sheet_name,
    //   code: response.data.sheet_meta.sheet_code,
    // };
    // const sheet = changeResponseStructure(response);
    // const dropDownValues = getTabList(sheet.tabs);
    // const initialPayload = {
    //   sheetData,
    //   dropDownValues,
    //   tabsData: sheet.tabs,
    // };
    // dispatch(sheetActions.ChangeSheet(initialPayload));
  };

  const [scrolled, setScrolled] = React.useState(false);
  const [TabOptions, setTabOptions] = useState();
  const [SheetOptions, setSheetOptions] = useState();

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 50) {
      // //console.log(offset)
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };
  useEffect(() => {}, []);

  // useEffect(() => {
  // dispatch(getSheetMeta());
  //   //set sheet id 3 as default
  //   const response = uktResponse;
  //   // let response;
  //   const sheetData = {
  //     uploadedDate: response.data.uploaded_date,
  //     id: response.data.sheet_id,
  //     name: response.data.sheet_meta.sheet_name,
  //     code: response.data.sheet_meta.sheet_code,
  //   };
  //   const sheet = changeResponseStructure(response);
  //   const dropDownValues = getTabList(sheet.tabs);
  //   const initialPayload = {
  //     sheetData,
  //     dropDownValues,
  //     tabsData: sheet.tabs,
  //   };
  //   dispatch(sheetActions.ChangeSheet(initialPayload));
  // }, [dispatch]);
  useEffect(() => {
    const sheetDropdown = sheetDropdownValues.map((sh) => ({
      key: sh.id,
      value: sh.id,
      text: sh.sheet_name,
    }));
    const tabDropdown = tabDropdownValues.map((co) => ({
      key: co.tab_name,
      value: co.tab_name,
      text: co.tab_name,
    }));
    setSheetOptions(sheetDropdown);
    setTabOptions([...tabDropdown]);
  }, [tabDropdownValues, sheetDropdownValues]);
  useEffect(() => {
    //console.log({sheetDropdownValues})
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  });

  return (
    <div
      style={
        scrolled
          ? {
              position: "fixed",
              zIndex: "2",
              marginTop: "-30px",
              width: "100%",
              marginLeft: "-100px",
              display: "flex",
              justifyContent: "center",
            }
          : {
              width: "100%",
              marginBottom: "10px",
              display: "flex",
              justifyContent: "center",
            }
      }
    >
      <div
        style={{
          display: "flex",
        }}
      >
        <Dropdown
          placeholder="Select Sheet"
          button
          className="icon"
          floating
          labeled
          icon="file"
          options={SheetOptions}
          search
          onChange={handleSheetChangeHandler}
          style={{
            margin: "10px",
            width: 250,
          }}
        />
        <Dropdown
          placeholder="Select Tab"
          button
          className="icon"
          floating
          labeled
          icon="world"
          options={TabOptions}
          search
          onChange={handleTabChangeHandler}
          style={{
            margin: "10px",
            width: 250,
          }}
        />
      </div>
    </div>
  );
}

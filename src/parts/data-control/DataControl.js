import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sheetActions } from "../../store/sheet";
import {  Dropdown } from "semantic-ui-react";

import tafResponse from "../../assets/telecom_adspend_forecasts.json";
import uktResponse from "../../assets/united_kingdom_tables.json";

import { changeResponseStructure, getTabList } from "../../helpers/helper";

export default function DataControl() {
  const dispatch = useDispatch();

  const sheetDropdownValues = useSelector((state) => state.sheet.sheets);
  const tabDropdownValues = useSelector((state) => state.sheet.tabList);

  const handleTabChangeHandler = (e, data) => {
    dispatch(sheetActions.changeTab({ selectedTab: data.value }));
  };
  const handleSheetChangeHandler = (e, data) => {
    let response;
    if (data.value === "United Kingdom Tables") {
      response = uktResponse;
    }
    if (data.value === "Telecoms Adspend Forecasts") {
      response = tafResponse;
    }
    // if(data.value==="Forecast By Market"){
    //   response = tafResponse
    // }

    const sheetData = {
      uploadedDate: response.data.uploaded_date,
      id: response.data.sheet_id,
      name: response.data.sheet_meta.sheet_name,
      code: response.data.sheet_meta.sheet_code,
    };
    const sheet = changeResponseStructure(response);
    const dropDownValues = getTabList(sheet.tabs);
    const initialPayload = {
      sheetData,
      dropDownValues,
      tabsData: sheet.tabs,
    };
    dispatch(sheetActions.ChangeSheet(initialPayload));
  };

  const [scrolled, setScrolled] = React.useState(false);
  const [TabOptions, setTabOptions] = useState();
  const [SheetOptions, setSheetOptions] = useState();

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 50) {
      console.log(offset)
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    const response = uktResponse;
    const sheetData = {
      uploadedDate: response.data.uploaded_date,
      id: response.data.sheet_id,
      name: response.data.sheet_meta.sheet_name,
      code: response.data.sheet_meta.sheet_code,
    };
    const sheet = changeResponseStructure(response);
    const dropDownValues = getTabList(sheet.tabs);
    const initialPayload = {
      sheetData,
      dropDownValues,
      tabsData: sheet.tabs,
    };
    dispatch(sheetActions.ChangeSheet(initialPayload));
  }, [dispatch]);
  useEffect(() => {
    const sheetDropdown = sheetDropdownValues.map((sh) => ({
      key: sh.id,
      value: sh.name,
      text: sh.name,
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
          display: "flex"
        }}
      >
        <Dropdown
          placeholder="Select Sheet"
          fluid
          search
          selection
          options={SheetOptions}
          onChange={handleSheetChangeHandler}
          style={{
            margin: "10px",
          }}
        />
        <Dropdown
          placeholder="Select Tab"
          fluid
          search
          selection
          options={TabOptions}
          onChange={handleTabChangeHandler}
          style={{
            margin: "10px",
          }}
        />
      </div>
    </div>
  );
}

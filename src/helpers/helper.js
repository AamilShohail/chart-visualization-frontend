// get tab values in array
export const getTabList = (tabs) => {
    let dropdownValues = [];
    tabs.forEach((el) => {
      dropdownValues.push({ tab_name: el.tab_name, id: el.tab_id });
    });
    return dropdownValues;
  };
  export const getRowsFromTabsData = (tabsData, filterValue) => {};
  
  // change to tab name centralized
  export const changeResponseStructure = (inputResponse) => {
    return {
      sheet_id: inputResponse.data[0].sheet_id,
      sheet_name: inputResponse.data[0].sheet_meta.sheet_name,
      sheet_code: inputResponse.data[0].sheet_meta.sheet_code,
      uploaded_date: inputResponse.data[0].uploaded_date,
      tabs: inputResponse.data[0].tabs.map((el) => ({
        tab_id: el.tab_id,
        tab_name: el.tab_name,
        tab_topic: el.tab_topic,
        data_set: el.data_set.map((yl) => ({
          data_set_id: yl.data_set_id,
          data: {
            ...JSON.parse(yl.json_data),
            tab_name: el.tab_name,
            id: yl.data_set_id,
          },
        })),
      })),
    };
  };
  
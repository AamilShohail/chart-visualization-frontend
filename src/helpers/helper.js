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

//arr1 ==>larger array
export const isSubset = (arr1, arr2) => {
  const m = arr1.length;
  const n = arr2.length;
  let i = 0;
  let j = 0;
  for (i = 0; i < n; i++) {
    for (j = 0; j < m; j++) if (arr2[i] == arr1[j]) break;

    /* If the above inner loop
      was not broken at all then
      arr2[i] is not present in
      arr1[] */
    if (j == m) return false;
  }

  /* If we reach here then all
  elements of arr2[] are present
  in arr1[] */
  return true;
};

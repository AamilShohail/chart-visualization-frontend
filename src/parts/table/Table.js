import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import { createTheme, MuiThemeProvider } from "@material-ui/core/styles";

const tableStyle = {
  height: "100%",
  width: "100%",
  color: "black",
};

export default function TableDataGrid() {
  const tabData = useSelector((state) => state.sheet.rows);
  const [pageSize, setPageSize] = React.useState(5);
  const [columns, setColumns] = useState([]);
  const theme = createTheme({
    typography: {
      fontSize: 24,
    },
  });
  useEffect(() => {
    if (tabData.length === 0) return null;
    // set years to chart options
    let labels = Object.keys(tabData[0]);
    //console.log('labels',{labels})
    const deletionKeys = ["tab_name","id"];
    labels = labels.filter((label) => !deletionKeys.includes(label));
    const columnsData = [];
    labels.forEach((label) => {
      columnsData.push({
        field: label,
        headerName: label,
        type: "number",
        flex: 1,
      });
    });
    setColumns(columnsData);
  }, [tabData]);
  return (
    <div style={tableStyle}>
      <MuiThemeProvider theme={theme}>
        <DataGrid
          rows={tabData}
          columns={columns}
          // pageSize={(50, 25, 10)}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          disableSelectionOnClick={true}
        />
      </MuiThemeProvider>
    </div>
  );
}

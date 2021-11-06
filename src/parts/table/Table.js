import React, { createRef } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";

import { createTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { DownloadOutlined } from "@mui/icons-material";
import DownloadExcel from "../../pages/export excel/DownloadExcel";

const tableStyle = {
  height: "100%",
  width: "100%",
  color: "green",
};

export default function TableDataGrid(props) {
  const { sheetName, tab } = props;
  const tabData = useSelector((state) => state.sheet.rows);
  const _exporter = createRef();
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
    const deletionKeys = ["tab_name", "id"];
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

  const exportExcel = () => {
    _exporter.current.save();
  };
  return (
    <>
      {columns.length > 0 ? (
        <DownloadExcel
          columns={columns}
          data={tabData}
          exporter={_exporter}
        />
      ) : null}

      <div style={tableStyle}>
        <MuiThemeProvider theme={theme}>
          <Button
            variant="contained"
            style={{ margin: 10, position: "relative", float: "95%" }}
            startIcon={<DownloadOutlined />}
            color="success"
            onClick={exportExcel}
            disabled={columns.length === 0}
          >
            Download Excel
          </Button>
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
    </>
  );
}

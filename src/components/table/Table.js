import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

export default function DataGridDemo() {
  const tabData = useSelector((state) => state.sheet.rows);
  const [columns, setColumns] = useState([]);
  useEffect(() => {
    if (tabData.length === 0) return null;
    // set years to chart options
    let labels = Object.keys(tabData[0]);
    const deletionKeys = ["tab_name", "Year"];
    labels = labels.filter((label) => !deletionKeys.includes(label));
    const columnsData = [];
    labels.forEach((label) => {
      columnsData.push({
        field: label,
        headerName: label,
        width: 150,
        type: "number",
      });
    });
    setColumns(columnsData);
  }, [tabData]);
  return (
    <div style={{ height: "100%", width: "100%", color: "black" }}>
      <DataGrid
        rows={tabData}
        columns={columns}
        pageSize={5}
        disableSelectionOnClick={true}
      />
    </div>
  );
}

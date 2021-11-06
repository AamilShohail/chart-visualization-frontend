import React, { useContext, useEffect, useState } from "react";
import {
  ExcelExport,
  ExcelExportColumn,
} from "@progress/kendo-react-excel-export";
import { ExcelContext } from "../Dashboard";

export default function DownloadExcel(props) {
  const { exporter, data, columns } = props;
  const excelContext = useContext(ExcelContext);
  console.log(excelContext);
  return (
    <div>
      <ExcelExport
        data={data}
        ref={exporter}
        fileName={excelContext.sheetName.selectedSheetName.name + "_" + excelContext.tab.selectedTabName + "_" + Date.now()}
      >
        {columns.map((eachColumn) => {
          return (
            <ExcelExportColumn
              field={eachColumn.field}
              title={eachColumn.headerName}
              width={200}
              key={eachColumn.field}
            />
          );
        })}
      </ExcelExport>
    </div>
  );
}

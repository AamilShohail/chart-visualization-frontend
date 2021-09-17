import React, { useEffect } from "react";
import { Bar, Mix, Stack } from "../parts/charts/ChartFactory";
import Table from "../parts/table/Table";
import ChartFactory from "../parts/charts/ChartFactory";
import DataControl from "../parts/data-control/DataControl";
import { useSelector, useDispatch } from "react-redux";

import styles from "../style/Dashboard.module.css";

import { getSheetMeta, setSheet } from "../store/sheet-action";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Box, Grid, Typography, Button } from "@material-ui/core";

import YearBar from "../parts/charts/year-based-charts/yearBar";
export default function Dashboard() {
  const isLight = useSelector((state) => state.ui.themeIsLight);
  const Loading = useSelector((state) => state.ui.sheetMetaLoad);
  const dispatch = useDispatch();

  useEffect(() => {
    //console.log("charts mounted ");
    dispatch(getSheetMeta());
  }, [dispatch]);
  return (
    <>
      {!Loading ? (
        <div
          className={styles.dashboard_main}
          style={{
            background: isLight ? "#e8e8e4" : "#12181B",
          }}
        >
          <div
            style={{
              display: "flex",
            }}
          >
            <DataControl />
          </div>

          <div
            className={styles.table}
            style={{
              boxShadow: isLight ? "15px 15px 15px  #aaaaaa" : "25px 25px 25px  #000",
            }}
          >
            <Table />
          </div>
          <div className={styles.charts_wrapper}>
            <div
              className={styles.chart_container_wrapper}
              style={{
                background: isLight ? "#182B4D" : "#2A2E35",
                boxShadow: isLight ? "15px 15px 15px  #aaaaaa" : "25px 25px 25px  #000",
                marginRight: "15px",
              }}
            >
              <ChartFactory type={Bar} />
            </div>
            <div
              className={styles.chart_container_wrapper}
              style={{
                background: isLight ? "#182B4D" : "#2A2E35",
                boxShadow: isLight ? "15px 15px 15px  #aaaaaa" : "25px 35px 35px  #000",
              }}
            >
              <ChartFactory type={Mix} />
            </div>
          </div>
          <div className={styles.chart_row}>
            <div
              className={styles.chart_container_wrapper}
              style={{
                background: isLight ? "#182B4D" : "#2A2E35",
                boxShadow: isLight ? "15px 25px 15px  #aaaaaa" : "25px 35px 35px  #000",
              }}
            >
              <ChartFactory type={Stack} />
            </div>
          </div>
          <div className={styles.chart_row}>
            <div
              className={styles.chart_container_wrapper}
              style={{
                background: isLight ? "#182B4D" : "#2A2E35",
                boxShadow: isLight ? "15px 25px 15px  #aaaaaa" : "25px 35px 35px  #000",
              }}
            >
              <YearBar />
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            height: "100vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </div>
      )}
    </>
  );
}

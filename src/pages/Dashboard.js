import React from "react";

import styles from "./Dashboard.module.css";

import { Bar, Mix, Stack } from "../components/charts/ChartFactory";
import Table from "../components/table/Table";
import ChartFactory from "../components/charts/ChartFactory";
import DataControl from "../components/data-control/DataControl";
import Card from "../components/ui/card/DataCard";

import { useSelector } from "react-redux";

export default function Dashboard() {
  const isLight = useSelector((state) => state.ui.themeIsLight);

  return (
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
    </div>
  );
}

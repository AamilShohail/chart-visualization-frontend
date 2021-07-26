import React from "react";

import styles from "./Dashboard.module.css";

import { Bar, Mix, Stack } from "./charts/ChartFactory";
import Table from "./table/Table";
import ChartFactory from "./charts/ChartFactory";
import DataControl from "./DataControl";
import Card from "./ui/card/DataCard";

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
      <div className={styles.card_container}>
        <Card name="sheets" count="5" />
        <Card name="Users" count="102" />
        <Card name="Countries" count="31" />
      </div>
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
          boxShadow: isLight
            ? "15px 15px 15px  #aaaaaa"
            : "25px 25px 25px  #000",
          borderRadius: "20px",
          padding: "30px",
        }}
      >
        <Table />
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          marginBottom: "20px",
          justifyContent: "center",
        }}
      >
        <div
          className={styles.chart_container_wrapper}
          style={{
            background: isLight ? "#182B4D" : "#2A2E35",
            boxShadow: isLight
              ? "15px 15px 15px  #aaaaaa"
              : "25px 25px 25px  #000",
          }}
        >
          <ChartFactory type={Bar} />
        </div>
        <div
          className={styles.chart_container_wrapper}
          style={{
            background: isLight ? "#182B4D" : "#2A2E35",
            boxShadow: isLight
              ? "15px 15px 15px  #aaaaaa"
              : "25px 35px 35px  #000",
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
            boxShadow: isLight
              ? "15px 25px 15px  #aaaaaa"
              : "25px 35px 35px  #000",
          }}
        >
          <ChartFactory type={Stack} />
        </div>
      </div>
    </div>
  );
}

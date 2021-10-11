import ReactApexChart from "react-apexcharts";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const ApexChart = () => {
  const [chartOptions, setChartOptions] = useState({
    chart: {
      height: 850,
      type: "area",
      stacked: true,
      foreColor: "white",
      toolbar: {
        show: true,
        tools: {
          download: false,
        },
      },
    },
    colors: [
      "#008FFB",
      "#00E396",
      "#CED4DC",
      "#ff7411",
      "#f14",
      "#11F",
      "#8f0",
    ],
    grid: {
      show: false,
    },
    stroke: {
      width: [1, 1, 1, 1, 1, 1, 1],
      curve: "smooth",
    },
    plotOptions: {
      bar: {
        columnWidth: "50%",
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.6,
        opacityTo: 0.8,
      },
    },
    dataLabels: {
      enabled: false,
      enabledOnSeries: [1],
      style: {
        fontSize: "14px",
        fontFamily: "Helvetica, Arial, sans-serif",
        fontWeight: "bold",
        colors: ["white"],
      },
    },
    labels: [],
    markers: {
      size: 0,
    },
    xaxis: {
      type: "date",
      categories: [],
      labels: {
        show: true,
        style: {
          colors: ["#fff"],
        },
      },
      title: {
        text: "Advertising Medium",
        style: {
          color: "#fff",
        },
      },
    },
    yaxis: {
      title: {
        text: "Adspend in US($)",
        style: {
          color: "#fff",
        },
      },
      min: 0,
    },
    axisBorder: {
      show: true,
      color: "red",
      height: 1,
      width: "100%",
      offsetX: 0,
      offsetY: 0,
    },
    axisTicks: {
      show: true,
      borderType: "solid",
      color: "red",
      height: 6,
      offsetX: 0,
      offsetY: 0,
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (y) {
          if (typeof y !== "undefined") {
            return y.toFixed(0) + " $";
          }
          return y;
        },
      },
    },
    // foreColor: "",
    background: {
      color: "#182B4D",
      enabled: true,
      foreColor: "red",
      padding: 4,
      borderRadius: 2,
      borderWidth: 1,
      borderColor: "red",
      opacity: 0.9,
      dropShadow: {
        enabled: false,
        top: 1,
        left: 1,
        blur: 1,
        color: "red",
        opacity: 0.45,
      },
    },
    legend: {
      position: "bottom",
      labels: {
        colors: "white",
      },
    },
  });
  const [stackData, setStackData] = useState([]);

  const tabData = useSelector((state) => state.sheet.rows);
  const selectedTabName = useSelector((state) => state.sheet.selectedTabName);
  const selectedSheetName = useSelector((state) => state.sheet.sheetData);
  const [graphTitle, setGraphTitle] = useState("Graph title");

  useEffect(() => {
    const GraphTitle = `${selectedSheetName.name}-${selectedTabName}`;
    setGraphTitle(GraphTitle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTabName, selectedSheetName]);
  useEffect(() => {
    if (tabData.length === 0) return null;
    // const yearsForTab = [];
    // tabData.forEach((el) => yearsForTab.push(parseInt(el.Year)));
    let labels = Object.keys(tabData[0]);
    //deleting keys
    const deletionKeys = ["id", "tab_name", "Year"];
    labels = labels.filter((label) => !deletionKeys.includes(label));
    const seriesData = [];
    labels.forEach((label) => {
      const data = [];
      tabData.forEach((row) => {
        data.push(row[`${label}`]);
      });
      const seriesObj = {
        name: label,
        data: data,
      };
      seriesData.push(seriesObj);
    });
    const Years = [];
    tabData.forEach((row) => {
      Years.push(row.Year);
    });
    setChartOptions({
      ...chartOptions,
      xaxis: { ...chartOptions.xaxis, categories: [...Years] },
    });
    setStackData(seriesData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabData, selectedSheetName]);

  return (
    <div id="chart">
      <h2
        style={{
          color: "white",
          width: "100%",
          textAlign: "center",
          marginTop: "5px",
        }}
      >
        {graphTitle}
      </h2>
      <ReactApexChart
        options={chartOptions}
        series={stackData}
        type="area"
        height={650}
      />
    </div>
  );
};
export default ApexChart;

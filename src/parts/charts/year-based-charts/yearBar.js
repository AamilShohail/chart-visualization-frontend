import ReactApexChart from "react-apexcharts";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FormControl } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

const ApexChart = () => {
  const [chartOptions, setChartOptions] = useState({
    chart: {
      height: 350,
      type: "line",
      stacked: false,
      foreColor: "#fff",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: [1, 1, 4],
    },
    xaxis: {
      categories: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
    },
    // colors: ["#008FFB", "#00E396", "#CED4DC", "#ff7411", "#f14", "#11F", "#8f0"],
    fill: {
      type: "gradient",
      colors: ["#008FFB", "#8f0", "#f14"],
      gradient: {
        shade: "dark",
        gradientToColors: ["#008FFB", "#8f0", "#f14"],
        inverseColors: true,
        shadeIntensity: 1,
        opacityFrom: 1,
        opacityTo: 1,
        type: "horizontal",
        // stops: [0, 95, 100],
      },
    },
    yaxis: [
      {
        seriesName: "",
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: true,
          // color: "#008FFB",
        },
        labels: {
          style: {
            // colors: "#008FFB",
          },
        },
        title: {
          text: "",
          style: {
            // color: "#008FFB",
          },
        },
        tooltip: {
          enabled: true,
        },
      },
      {
        seriesName: "",
        opposite: true,
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: true,
          color: "#04FFFF",
        },
        labels: {
          style: {
            colors: "#04FFFF",
          },
        },
        title: {
          text: "",
          style: {
            color: "#04FFFF",
          },
        },
      },
      {
        seriesName: "",
        opposite: true,
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: true,
          color: "#f14",
        },
        labels: {
          style: {
            colors: "#f14",
          },
        },
        title: {
          text: "",
          style: {
            color: "#f14",
          },
        },
      },
    ],
    colors: ["#008FFB", "#8f0", "#f14"],
    tooltip: {
      fixed: {
        enabled: true,
        position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
        offsetY: 30,
        offsetX: 60,
      },
    },
    legend: {
      position: "bottom",
      labels: {
        //color bottom label
        colors: "white",
      },
    },
  });
  const [series, setSeries] = useState([
    {
      name: "Income",
      type: "column",
      data: [],
    },
    {
      name: "Cashflow",
      type: "column",
      data: [],
    },
    {
      name: "Revenue",
      type: "line",
      data: [],
    },
  ]);
  const [allSeriesData, setAllSeriesData] = useState([]);

  const tabData = useSelector((state) => state.sheet.rows);
  const selectedTab = useSelector((state) => state.sheet.selectedTabName);
  const sheetData = useSelector((state) => state.sheet.sheetData);
  const [dropDownsValues, setDropDownValues] = useState([]);

  const [chartOneValue, setChartOneValue] = useState([]);

  const [chartTwoValue, setChartTwoValue] = useState([]);

  const [chartThreeValue, setChartThreeValue] = useState([]);

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
    // console.log({Years})
    setChartOptions((prevState) => ({
      ...prevState,
      xaxis: { ...prevState.xaxis, categories: [...Years] },
    }));
    // console.debug("time based ", { seriesData });
    // console.debug("time based ", { labels });
    // setStackData(seriesData);
    setDropDownValues(labels);
    setAllSeriesData(seriesData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabData, selectedTab]);
  //Bar1
  const chartOneHandler = (e) => {
    setChartOneValue(e.target.value);
    const thirdChart = allSeriesData.find(
      (label) => label.name === e.target.value
    );
    console.log(series);
    const updatedSeries = [...series];
    const setObj = {
      ...thirdChart,
      type: "column",
    };
    const updatedLabels = { ...chartOptions };
    updatedSeries[0] = setObj;
    console.log({ ...updatedLabels.yaxis });
    setSeries(updatedSeries);
  };
  //Bar2
  const chartTwoHandler = (e) => {
    setChartTwoValue(e.target.value);
    const thirdChart = allSeriesData.find(
      (label) => label.name === e.target.value
    );
    // console.log(series);
    const updatedSeries = [...series];
    const setObj = {
      ...thirdChart,
      type: "column",
    };
    updatedSeries[1] = setObj;
    // console.log({updatedSeries})
    setSeries(updatedSeries);
  };
  //line
  const chartThreeHandler = (e) => {
    setChartThreeValue(e.target.value);
    const thirdChart = allSeriesData.find(
      (label) => label.name === e.target.value
    );
    // console.log(series);
    const updatedSeries = [...series];
    const setObj = {
      ...thirdChart,
      type: "line",
    };
    updatedSeries[2] = setObj;
    // console.log({updatedSeries})
    setSeries(updatedSeries);
    // setChartThreeData({ ...thirdChart, type: "line" });
  };

  return (
    <div id="chart">
      <div style={{ paddingLeft: 300, margin: 10 }}>
        <FormControl style={{ width: 250, paddingRight: 5 }}>
          <InputLabel style={{ color: "white" }}>Bar Chart 🔵</InputLabel>
          <Select
            id="dropdown"
            value={chartOneValue}
            onChange={chartOneHandler}
            label="Bar Chart 🔵"
            style={{
              color: "white",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            {dropDownsValues.map((el) => {
              return (
                <MenuItem key={el} value={el}>
                  {el}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl style={{ width: 250, paddingRight: 5 }}>
          <InputLabel style={{ color: "white" }}>Bar Chart 🟢</InputLabel>
          <Select
            value={chartTwoValue}
            onChange={chartTwoHandler}
            label="Bar Chart 🟢"
            style={{
              color: "white",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            {dropDownsValues.map((el) => {
              return (
                <MenuItem key={el} value={el}>
                  {el}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl style={{ width: 250, paddingRight: 5 }}>
          <InputLabel style={{ color: "white" }}>Line Chart 🔴</InputLabel>
          <Select
            value={chartThreeValue}
            onChange={chartThreeHandler}
            label="Line Chart 🔴"
            style={{
              color: "white",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            {dropDownsValues.map((el) => {
              return (
                <MenuItem key={el} value={el}>
                  {el}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>
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
        series={series}
        type="area"
        height={650}
      />
    </div>
  );
};
export default ApexChart;

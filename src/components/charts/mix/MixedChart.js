import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";
const ApexChart = () => {
  const [lineData, setLineData] = useState({
    name: "Website Blog",
    type: "column",
    data: [440, 505, 414, 671, 227, 413],
  });
  const [barData, setBarData] = useState({
    name: "Social Media",
    type: "line",
    data: [23, 42, 35, 27, 43, 39],
  });

  const [chartOption, setChartOption] = useState({
    chart: {
      type: "line",
      // background: "#182B4D",
      foreColor: "#fff",
      toolbar: {
        show: true,
        tools: {
          download: false,
        },
      },
    },

    stroke: {
      width: [0, 4],
      curve: "smooth",
    },
    title: {
      text: "Title of graph",
    },
    dataLabels: {
      enabled: false,
      enabledOnSeries: [1],
      style: {
        fontSize: "14px",
        fontFamily: "Helvetica, Arial, sans-serif",
        fontWeight: "bold",
        colors: ["gray"],
      },
    },
    background: {
      enabled: true,
      padding: 4,
      borderRadius: 2,
      borderWidth: 1,
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
    subtitle: {
      text: "Mixed graph",
      align: "center",
      margin: 10,
      offsetX: 0,
      offsetY: 0,
      floating: false,
      style: {
        fontSize: "20px",
        fontWeight: "bold",
        fontFamily: undefined,
        color: "white",
      },
    },
    labels: [],
    xaxis: {
      type: "string",
      labels: {
        style: {
          colors: "white",
        },
      },
    },
    yaxis: [
      {
        labels: {
          style: {
            colors: "white",
          },
        },
        title: {
          text: "Website Blog",
          style: {
            fontSize: "20px",
            fontWeight: "bold",
            fontFamily: undefined,
            color: "white",
          },
        },
      },
      {
        opposite: true,
        title: {
          text: "Social Media",
          style: {
            fontSize: "20px",
            fontWeight: "bold",
            fontFamily: undefined,
            color: "white",
          },
        },
      },
    ],
    colors: ["#5E72E4", "#9C27B0"],
    legend: {
      position: "bottom",
      labels: {
        //color bottom label
        colors: "white",
      },
    },
  });

  const tabData = useSelector((state) => state.sheet.rows);
  const sheetData = useSelector((state) => state.sheet.barChart);

  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("2010");

  const barChartTabHandler = (e) => {
    setSelectedYear(e.target.value);
    const found = tabData.find(
      (el) => el.Year === parseInt(e.target.value)
    );
    const founded = { ...found };
    delete founded.id;
    delete founded.tab_name;
    delete founded.Year;
    delete founded.Total;
    const properties = Object.keys(founded);
    let values = Object.values(founded);
    setLineData({ ...lineData, data: values });
    setChartOption({ ...chartOption, labels: properties });
  };

  useEffect(() => {
    if (tabData.length === 0) return null;
    const yearsForTab = [];
    tabData.forEach((el) => yearsForTab.push(el.Year));
    setYears(yearsForTab);
    const properties = Object.keys(sheetData);
    const values = Object.values(sheetData);
    setBarData({ ...barData, data: values });
    setChartOption({ ...chartOption, labels: properties });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabData.length, sheetData]);

  useEffect(() => {
    if (tabData.length === 0) return null;
    const yearsForTab = [];
    tabData.forEach((el) => yearsForTab.push(el.Year));
    setYears(yearsForTab);
    const found = tabData.find((el) => el.Year === parseInt(selectedYear));
    const founded = { ...found };
    delete founded.id;
    delete founded.tab_name;
    delete founded.Year;
    delete founded.Total;
    const properties = Object.keys(founded);
    setChartOption({ ...chartOption, labels: [properties] });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="chart">
      <div>
        <select
          id="dropdown"
          value={selectedYear}
          onChange={barChartTabHandler}
        >
          {years.map((el) => {
            return (
              <option key={el} value={el}>
                {el}
              </option>
            );
          })}
        </select>
      </div>
      <ReactApexChart
        options={chartOption}
        series={[lineData, barData]}
        type="line"
      />
      <button>Download PPT</button>
    </div>
  );
};
export default ApexChart;

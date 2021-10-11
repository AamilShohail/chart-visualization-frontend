import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { useSelector, useDispatch } from "react-redux";
import { sheetActions } from "../../../store/sheet-slice";
import pptxgen from "pptxgenjs";

import styles from "./BarChart.module.css";
import { DownloadOutlined } from "@mui/icons-material";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

const ApexBarChart = () => {
  const dispatch = useDispatch();
  const [chartData, setChartData] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [labels, setLabels] = useState([]);
  const [values, setValues] = useState([]);
  const [graphTitle, setGraphTitle] = useState("Graph title");

  const [chartOptions, setChartOptions] = useState({
    chart: {
      events: {
        animationEnd: function (chartContext, options) {
          // //console.log("animation end");
        },
        click: function (event, chartContext, config) {
          // The last parameter config contains additional information like `seriesIndex` and `dataPointIndex` for cartesian charts
          // //console.log(chartContext, event, config);
        },
      },
      toolbar: {
        show: false,
      },
      colors: ["#5E72E4", "#5E72E4", "#5E72E4"],
      //label color
      foreColor: "white",
      //   dropShadow: {
      //     enabled: true,
      //     enabledOnSeries: undefined,
      //     top: 0,
      //     left: 0,
      //     blur: 3,
      //     color: '#111',
      //     opacity: 0.35
      // },
      brush: {
        enabled: false,
        target: undefined,
        autoScaleYaxis: true,
      },
      //background color for chart
      // background: isLight ? "#182B4D" : "#2A2E35",
      type: "bar",
      height: 350,
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 500,
        animateGradually: {
          enabled: true,
          delay: 50,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
    },
    grid: {
      show: false,
    },
    plotOptions: {
      bar: {
        borderRadius: 7,
        horizontal: true,
        columnWidth: "70%",
      },
    },
    // values inside bar
    dataLabels: {
      style: {
        colors: ["white"],
      },
    },
    markers: {
      colors: ["#9C27B0"],
    },
    fill: {
      type: "gradient",
      colors: ["#5E72E4"],
      gradient: {
        shade: "dark",
        gradientToColors: ["#5E72E4", "#5E72E4"],
        inverseColors: true,
        shadeIntensity: 0.7,
        opacityFrom: 0.9,
        opacityTo: 0.7,
        type: "horizontal",
        stops: [0, 95, 100],
      },
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
    // subtitle: {
    //   text: "graph title",
    //   align: "center",
    //   margin: 10,
    //   offsetX: 0,
    //   offsetY: 0,
    //   floating: false,
    //   style: {
    //     fontSize: "22px",
    //     // fontWeight: "bold",
    //     fontFamily: undefined,
    //     color: "#9699a2",
    //   },
    // },
    //tooltip disabled
    // tooltip: {
    //   enabled: true,
    //   enabledOnSeries: true,
    //   shared: true,
    //   followCursor: true,
    //   intersect: false,
    //   inverseOrder: false,
    //   custom: undefined,
    //   fillSeriesColor: true,
    //   theme: false,
    //   style: {
    //     fontSize: "12px",
    //     fontFamily: undefined,
    //   },
    //   onDatasetHover: {
    //     highlightDataSeries: false,
    //   },
    //   x: {
    //     show: true,
    //     // format: "dd MMM",
    //     formatter: undefined,
    //   },
    //   y: {
    //     show: false,
    //     formatter: undefined,
    //     title: {
    //       formatter: (seriesName) => seriesName,
    //     },
    //   },
    //   z: {
    //     formatter: undefined,
    //     title: "Size: ",
    //   },
    //   marker: {
    //     show: false,
    //   },
    //   items: {
    //     display: "flex",
    //   },
    //   fixed: {
    //     enabled: true,
    //     position: "topRight",
    //     offsetX: 0,
    //     offsetY: 0,
    //   },
    // },
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
  const selectedTabName = useSelector((state) => state.sheet.selectedTabName);
  const tabData = useSelector((state) => state.sheet.rows);
  const selectedSheetName = useSelector((state) => state.sheet.sheetData);
  useEffect(() => {
    console.log({ selectedTabName, selectedYear, selectedSheetName });
    const GraphTitle = selectedSheetName.name
      ? `${selectedSheetName.name}-${selectedTabName} in ${selectedYear}`
      : " ";
    setGraphTitle(GraphTitle);
    // setChartOptions({
    //   ...chartOptions,
    //   subtitle: { ...chartOptions.subtitle, text: GraphTitle },
    // });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTabName, selectedYear, selectedSheetName]);
  useEffect(() => {
    //console.log("Bar chart useEffect" , tabData);
    if (tabData.length === 0) return null;
    const yearsForTab = [];
    tabData.forEach((el) => yearsForTab.push(el.Year));
    //console.log({yearsForTab})
    setYears(yearsForTab);
    // const found = tabData.find((el) => el.Year == parseInt(selectedYear));
    // const founded = { ...found };
    // //console.log({founded})
    // delete founded.id;
    // delete founded.tab_name;
    // delete founded.Year;
    // delete founded.Total;
    // // dispatch(sheetActions.changeBarChartDropdown({ barChartData: { ...founded } }));
    // const properties = Object.keys(founded);
    // setLabels(properties);
    // setChartOptions({
    //   ...chartOptions,
    //   xaxis: { ...chartOptions.xaxis, categories: properties },
    // });
    // let values = Object.values(founded);
    // setValues(values);
    // let roundedValues = values.map((v) => Math.round(v * 100) / 100);
    // //console.log('Barchart ',roundedValues)
    // setChartData([{ data: roundedValues }]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTabName, selectedYear]);

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
    const found = tabData.find((el) => el.Year == parseInt(e.target.value));
    const founded = { ...found };
    delete founded.id;
    delete founded.tab_name;
    delete founded.Year;
    //delete founded.Total;
    dispatch(
      sheetActions.changeBarChartDropdown({ barChartData: { ...founded } })
    );
    const properties = Object.keys(founded);
    setLabels(properties);
    setChartOptions({
      ...chartOptions,
      xaxis: { ...chartOptions.xaxis, categories: properties },
    });
    let values = Object.values(founded);
    setValues(values);
    let roundedValues = values.map((v) => Math.round(v * 100) / 100);
    setChartData([{ data: roundedValues }]);
  };
  const toggleAxisHandler = () => {
    const gradientType =
      chartOptions.fill.gradient.type === "vertical"
        ? "horizontal"
        : "vertical";
    setChartOptions({
      ...chartOptions,
      plotOptions: {
        ...chartOptions.plotOptions,
        bar: {
          ...chartOptions.plotOptions.bar,
          horizontal: !chartOptions.plotOptions.bar.horizontal,
        },
      },
      fill: {
        ...chartOptions.fill,
        gradient: {
          ...chartOptions.fill.gradient,
          type: gradientType,
        },
      },
    });
  };

  const downloadPPT = () => {
    let pptx = new pptxgen();
    let slide = pptx.addSlide();

    // let dataChartRadar = [
    //   {
    //     name: `tab  for year`,
    //     labels: ["May", "June", "July", "August", "September"],
    //     values: [26, 53, 100, 75, 41],
    //   },
    // ];
    //slide.addChart(pptx.ChartType.radar, dataChartRadar, { x: 0.36, y: 2.25, w: 4.0, h: 4.0, radarStyle: "standard" });
    //slide.addShape(pptx.ShapeType.rect, { x: 4.36, y: 2.36, w: 5, h: 2.5, fill: pptx.SchemeColor.background2 });
    //slide.addText("React Demo!", { x: 1, y: 1, w: "80%", h: 1, fontSize: 36, fill: "eeeeee", align: "center" });
    slide.addText(`tab for year`, {
      x: 1,
      y: 0.5,
      w: "80%",
      h: 1,
      fontSize: 22,
      align: "center",
      fill: { color: "D3E3F3" },
      color: "008899",
    });

    let dataChartAreaLine = [
      {
        name: "Actual Sales",
        labels: [...labels],
        values: [...values],
      },
      //for group bar chart
      // {
      //   name: "Projected Sales",
      //   labels: [...labels],
      //   values: [...values],
      // },
    ];

    slide.addChart(pptx.ChartType.bar, dataChartAreaLine, {
      x: 1,
      y: 1,
      w: 8,
      h: 4,
    });

    slide.addText(`by optimum AI`, {
      x: 0,
      y: 5.3,
      w: "100%",
      h: 0.33,
      fontSize: 10,
      align: "center",
      fill: "E1E1E1", //{ color: pptx.SchemeColor.background2 },
      color: "A1A1A1", // pptx.SchemeColor.accent3,
    });

    pptx.writeFile({ fileName: `tab for year.pptx` });
  };
  return (
    <div id="chart">
      <div
        style={{
          width: "100%",
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <FormControl style={{ width: 200 }} fullWidth={false}>
          <InputLabel style={{ color: "white" }}>Year</InputLabel>
          <Select
            id="dropdown"
            value={selectedYear}
            onChange={handleYearChange}
            label="year"
            style={{
              color: "white",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            {years.map((year) => {
              return (
                <MenuItem key={year} value={year}>
                  {year}
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
        series={chartData}
        type="bar"
        height={550}
        // height="100%"
      />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button variant="outlined" onClick={toggleAxisHandler}>
          Toggle Axis
        </Button>
        <Button
          variant="outlined"
          style={{ marginLeft: 3 }}
          startIcon={<DownloadOutlined />}
          onClick={downloadPPT}
        >
          Download pptx
        </Button>
        {/* <button style={{ margin: "5px", padding: "5px" }} onClick={downloadPPT}>
          Download pptx
        </button> */}
      </div>
    </div>
  );
};

export default ApexBarChart;

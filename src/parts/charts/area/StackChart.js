import ReactApexChart from "react-apexcharts";
import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import Button from "@mui/material/Button";
import {DownloadOutlined} from "@mui/icons-material";
import pptxgen from "pptxgenjs";

const ApexChart = () => {
    const [labels, setLabels] = useState([]);
    const [values, setValues] = useState([]);
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
    const MONS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
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
        console.log(labels);
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
        setLabels(Years);

        setChartOptions({
            ...chartOptions,
            xaxis: {...chartOptions.xaxis, categories: [...Years]},
        });
        setStackData(seriesData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tabData, selectedSheetName]);

    const downloadPPT = () => {
        console.log(stackData);
        let pptx = new pptxgen();
        let slide = pptx.addSlide();
        let array = [];
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
        // slide.addText(`tab for year`, {
        //   x: 1,
        //   y: 0.5,
        //   w: "80%",
        //   h: 1,
        //   fontSize: 22,
        //   align: "center",
        //   fill: { color: "D3E3F3" },
        //   color: "008899",
        // });
        for (let i = 0; i < stackData.length; i++) {

            let obj = {
                name: stackData[i].name, values: stackData[i].data, labels:labels
            }
            array.push(obj);
        }
        let dataChartArea = [
            ...array

        ];

        let optsChartLine2 = {
            x: 0.5,
            y: 0.6,
            w: "95%",
            h: "85%",
            chartColors: ["008FFB", "00E396","CED4DC"],
            // chartColors: [
            //     "008FFB",
            //     "00E396",
            //     "CED4DC",
            //     "ff7411",
            //     "f14",
            //     "11F",
            //     "8f0",
            // ],
            chartColorsOpacity: 25,
            valAxisLabelRotate: 5,
            dataBorder: {pt: 2, color: "FFFFFF"},
            showValue: false,
            fill: "D1E1F1",
            barGrouping: "stacked",
        };
        slide.addChart(pptx.charts.AREA, dataChartArea, optsChartLine2);

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

        pptx.writeFile({fileName: `Telecoms Adspend Forecasts-All 11 markets.pptx`});
    };

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
            <div style={{display: "flex", justifyContent: "center"}}>

                <Button
                    variant="outlined"
                    style={{marginLeft: 3}}
                    startIcon={<DownloadOutlined/>}
                    onClick={downloadPPT}
                >
                    Download pptx
                </Button>
            </div>
        </div>
    );
};
export default ApexChart;

const Chart = require("chart.js");

const VerticalLinePlugin = require("./chart_js_extension");
const EventVerticalLinePlugin = require("./chart_js_extension_for_events");
const ChartDataLabels = require("./chartjs-plugin-datalabels");

Chart.defaults.global.responsive = true;
Chart.defaults.line.spanGaps = false;

Chart.plugins.register(VerticalLinePlugin);
Chart.plugins.register(EventVerticalLinePlugin);
Chart.plugins.register(ChartDataLabels);

module.exports = (dataParams) => {
  const {
    labels,
    eventsData,
    eventsLabels,
    stepsData,
    stepsLabels,
    valuePoints,
    stolineAtIndex,
    eventlineAtIndex,
    xLabelString,
    // lineAtIndex,
  } = dataParams;

  console.log(valuePoints, "valuePoints");
  const eventsDataset = {
    datalabels: {
      backgroundColor: function (context) {
        return context.dataset.backgroundColor;
      },
      borderRadius: 0,
      color: "black",
      font: {
        weight: "normal",
      },
      formatter: function (value, context) {
        return value;
      },
      rotation: 0,
    },
    tooltips: {
      enabled: false,
    },
    label: "Event(s)",
    data: eventsData,
    labels: eventsLabels,
    fill: false,
    backgroundColor: "rgb(255, 0, 0, 0.5)",
    borderColor: "rgb(255, 0, 0)",
    pointStyle: "circle",
    radius: 0,
    type: "bubble",
  };

  const stepsDataset = {
    datalabels: {
      backgroundColor: function (context) {
        return context.dataset.backgroundColor;
      },
      borderRadius: 0,
      padding: { bottom: 0, right: 0 },
      align: "center",
      color: "white",
      font: {
        weight: "normal",
        size: 11,
      },
      formatter: function (value, context) {
        return value;
      },
      rotation: 0,
    },
    tooltips: {
      enabled: false,
    },
    label: "Steps",
    data: stepsData,
    labels: stepsLabels,
    fill: false,
    backgroundColor: "rgba(92, 184, 92, 1.0)",
    borderColor: "rgba(92, 184, 92, 1.0)",
    fillColor: "rgba(92, 184, 92, 1.0)",
    pointStyle: "circle",
    radius: 0,
    type: "bubble",
  };

  const dataObj = {
    labels: labels,
    datasets: [],
  };

  if (valuePoints && valuePoints.data) {
    valuePoints.data.forEach((targetData) => {
      let pointColor = "#" + (((1 << 24) * Math.random()) | 0).toString(16); // Random color
      dataObj.datasets.push({
        datalabels: {
          display: false,
        },
        label: targetData.name,
        data: targetData.values,
        fill: false,
        borderColor: pointColor,
        backgroundColor: pointColor,
        pointStyle: function (context) {
          var index = context.dataIndex;
          var value = context.dataset.data[index];
          return "circle";
        },
        pointRadius: 5,
      });
    });
  }

  if (!valuePoints.multipleGraphs) {
    dataObj.datasets.push(stepsDataset);
  }
  dataObj.datasets.push(eventsDataset);

  return {
    plugins: [ChartDataLabels, VerticalLinePlugin, EventVerticalLinePlugin],
    bezierCurve: false,
    type: "line",
    data: dataObj,
    options: {
      plugins: {},
      animation: {
        duration: 1,
        numSteps: 0,
        onComplete: function () {},
      },
      legend: {
        display: true,
        position: "bottom",
        labels: {
          usePointStyle: true,
          fontColor: "rgb(0, 0, 0)",
        },
      },
      tooltips: {
        enabled: true,
      },
      scales: {
        yAxes: [
          {
            ticks: {
              suggestedMin: 0,
              suggestedMax: valuePoints.yAxisMax,
              autoSkip: false,
            },
            scaleLabel: {
              display: true,
              labelString: valuePoints.dataType,
              fontColor: "#000000",
            },
          },
        ],
        xAxes: [
          {
            ticks: {
              suggestedMin: 0,
              suggestedMax: valuePoints.yAxisMax,
              autoSkip: false,
            },
            scaleLabel: {
              display: true,
              labelString: xLabelString,
            },
          },
        ],
      },
      title: {
        display: true,
        text: "Treatment",
        position: "right",
      },
      layout: {
        padding: {
          left: 10,
          right: 10,
          top: 10,
          bottom: 10,
        },
      },
      spanGaps: false,
      elements: {
        line: {
          tension: 0, // disables bezier curves
        },
      },
    },
    // lineAtIndex: lineAtIndex,
    lineAtIndexLabel: "",
    stolineAtIndex: stolineAtIndex,
    eventlineAtIndex: eventlineAtIndex,
    eventlineAtIndexLabel: "",
  };
};

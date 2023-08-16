const Chart = require("chart.js");

const VerticalLinePlugin = require("./chart_js_extension");
const EventVerticalLinePlugin = require("./chart_js_extension_for_events");
const ChartDataLabels = require("./chartjs-plugin-datalabels");

Chart.defaults.global.responsive = true;
Chart.defaults.line.spanGaps = false;

Chart.plugins.register(VerticalLinePlugin);
Chart.plugins.register(EventVerticalLinePlugin);
Chart.plugins.register(ChartDataLabels);

module.exports = dataParams => {
  const {
    labelsArr1,
    label,
    dataArr1,
    dataArr2,
    labelsArr2,
    dataArr3,
    dataStos,
    labelsStos,
    baselineCount,
    yAxesSuggestedMax,
    xAxesSuggestedMax,
    xAxesLabelString,
    lineAtIndex,
    stolineAtIndex,
    eventlineAtIndex,
    shortWeeks
  } = dataParams;

  // const labelsArr1 = ["", "01/04/2019", "01/11/2019", "01/18/2019", "", "01/25/2019", "02/01/2019", "02/08/2019", "02/15/2019", "02/22/2019", "03/01/2019", "03/08/2019", "03/15/2019", "03/22/2019", "03/29/2019", "04/05/2019", "04/12/2019", "04/19/2019", "04/26/2019", "05/03/2019", "05/10/2019"]
  // const label = "Name of maladaptive behavior (param)"
  // const dataArr1 = ["null", 60.0, 20.0, 23.0, "null", 44, 99, "null", "null", "null", 40, "null", "null", "null", "null", "null", "null", "null", "null", "null", "null"]
  // const dataArr2 = ["null", "null", "null", "null", "null", "null", "null", "null", "null", "null", 10.43016187151155, "null", "null", "null", "null", "null", "null", "null", "null", "null", "null"]
  // const labelsArr2 = ["", "", "", "", "", "", "", "", "", "", "02/23/2019: Client's Health Issues: \nxaxa\n,Medication Change: \nadasdasd\n \n", "", "", "", "", "", "", "", "", "", ""]
  // const dataArr3 = ["null", "null", "null", "null", "null", 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 25, 25]
  // const baselineCount = "4"
  // const yAxesSuggestedMax = "15"
  // const xAxesSuggestedMax = "15"
  // const xAxesLabelString = "Summary per week (Fridays)"
  // const lineAtIndex = [4]
  // const eventlineAtIndex = [10]
  // const shortWeeks = []
  const dataObj = {
    // Labels as params
    labels: labelsArr1,
    datasets: [
      {
        datalabels: {
          display: false
        },
        label: label,
        data: dataArr1,
        fill: false,
        borderColor: "rgb(0, 0, 0)",
        backgroundColor: 'black',
        pointStyle: function(context) {
          var index = context.dataIndex;
          var value = context.dataset.data[index];
          if (shortWeeks.indexOf(index - baselineCount - 1) !== -1) {
            return "triangle";
          } else {
            return "circle";
          }
        },
        pointRadius: 5
      },
      {
        datalabels: {
          backgroundColor: function(context) {
            return context.dataset.backgroundColor;
          },
          borderRadius: 0,
          color: "black",
          font: {
            weight: "normal"
          },
          //formatter: Math.round,
          formatter: function(value, context) {
            return value; //context.chart.data.labels[context.dataIndex];
          },
          rotation: 0
        },
        tooltips: {
          enabled: false
        },
        label: "Event(s)",
        // this as params too (both data & labels)
        data: dataArr2,
        labels: labelsArr2,
        fill: false,
        backgroundColor: "rgba(255, 196, 215, 1.0)",
        borderColor: "rgb(255, 0, 0)",
        pointStyle: "circle",
        radius: 0,
        type: "bubble"
      },
      {
        datalabels: {
          backgroundColor: function(context) {
            return context.dataset.backgroundColor;
          },
          borderRadius: 0,
          color: 'white',
          font: {
            weight: 'bold',
          },
          //formatter: Math.round,
          formatter: function(value, context) {
            return value; //context.chart.data.labels[context.dataIndex];
          },
          rotation: 0,
        },
        tooltips: {
          enabled: false,
        },
        label: "MET",
        //fillColor: "rgba(212,213,241,0.2)",
        //strokeColor: "rgba(144,147,205,1)",
        //pointColor: "rgba(151,187,205,1)",
        //pointStrokeColor: "#fff",
        //pointHighlightFill: "#fff",
        //pointHighlightStroke: "rgba(151,187,205,1)",
        data: dataStos,
        labels: labelsStos,
        fill:false,
        backgroundColor: 'rgba(92, 184, 92, 1.0)',
        borderColor: 'rgba(92, 184, 92, 1.0)',
        fillColor: 'rgba(92, 184, 92, 1.0)',
        pointStyle: 'circle',
        radius: 0,
        type: "bubble"
      },
      {
        datalabels: {
          display: false
        },
        label: "LTO Trendline",
        // params too
        data: dataArr3,
        fill: false,
        borderColor: "rgb(153, 153, 153)",
        pointStyle: "rectTria",
        pointRadius: 1,
        borderDash: [7, 2]
      }
    ]
  };
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
        onComplete: function() {}
      },
      legend: {
        display: true,
        position: "bottom",
        labels: {
          usePointStyle: true,
          fontColor: 'rgb(0, 0, 0)',
        }
      },
      tooltips: {
        enabled: true
      },
      scales: {
        yAxes: [
          {
            ticks: {
              suggestedMin: 0,
              suggestedMax: yAxesSuggestedMax,
              autoSkip: false
            },
            scaleLabel: {
              display: true,
              labelString: "Value(s)",
              fontColor: "#000000"
            }
          }
        ],
        xAxes: [
          {
            ticks: {
              suggestedMin: 0,
              suggestedMax: xAxesSuggestedMax,
              autoSkip: false
            },
            scaleLabel: {
              display: true,
              labelString: xAxesLabelString
            }
          }
        ]
      },
      title: {
        display: true,
        text: "Treatment",
        position: "right"
      },
      layout: {
        padding: {
          left: 10,
          right: 10,
          top: 10,
          bottom: 10
        }
      },
      spanGaps: false,
      elements: {
        line: {
          tension: 0 // disables bezier curves
        }
      }
    },
    lineAtIndex: lineAtIndex,
    lineAtIndexLabel: "",
    stolineAtIndex: stolineAtIndex,
    eventlineAtIndex: eventlineAtIndex,
    eventlineAtIndexLabel: ""
  };
};


// VerticalLinePlugin
const VerticalLinePlugin = {
  getLinePosition: function(chart, pointIndex) {
    const meta = chart.getDatasetMeta(0); // first dataset is used to discover X coordinate of a point
    const data = meta.data;
    return data[pointIndex]._model.x;
  },
  renderDashedVerticalLine: function(
    chartInstance,
    pointIndex,
    lineAtIndexLabel
  ) {
    const lineLeftOffset = this.getLinePosition(chartInstance, pointIndex);
    const scale = chartInstance.scales["y-axis-0"];
    const context = chartInstance.chart.ctx;

    // render vertical line
    context.beginPath();
    context.strokeStyle = "#ff0000";
    context.setLineDash([5, 2]);
    context.lineWidth = 2.5;
    context.moveTo(lineLeftOffset, scale.top);
    context.lineTo(lineLeftOffset, scale.bottom);
    context.stroke();

    // draw line
    /*context.beginPath();
         context.moveTo(lineLeftOffset, scale.top);
         context.strokeStyle = '#ff0000';
         context.lineWidth=2.5;
         context.lineTo(lineLeftOffset, scale.bottom);
         context.stroke();*/

    // write label
    context.fillStyle = "#ff0000";
    context.textAlign = "center";
    context.fillText(
      lineAtIndexLabel,
      lineLeftOffset,
      (scale.bottom - scale.top) / 2 + scale.top
    );
  },

  renderVerticalLine: function(chartInstance, pointIndex, lineAtIndexLabel) {
    const lineLeftOffset = this.getLinePosition(chartInstance, pointIndex);
    const scale = chartInstance.scales["y-axis-0"];
    const context = chartInstance.chart.ctx;

    // draw line
    context.beginPath();
    context.moveTo(lineLeftOffset, scale.top);
    context.strokeStyle = "#424242";
    context.lineWidth = 2.5;
    context.lineTo(lineLeftOffset, scale.bottom);
    context.stroke();

    // write label
    context.fillStyle = "#9e0b0f";
    context.textAlign = "center";
    context.fillText("Baseline", 90, 18); //lineLeftOffset, (scale.bottom - scale.top) / 2 + scale.top);
  },

  afterDatasetsDraw: function(chart, easing) {
    if (typeof chart.config.lineAtIndex !== "undefined") {
      chart.config.lineAtIndex.forEach(function(pointIndex) {
        VerticalLinePlugin.renderVerticalLine(
          chart,
          pointIndex,
          chart.config.lineAtIndexLabel
        );
      });
    }
    if (typeof chart.config.dashedLineAtIndex !== "undefined") {
      chart.config.dashedLineAtIndex.forEach(function(pointIndex) {
        VerticalLinePlugin.renderDashedVerticalLine(
          chart,
          pointIndex,
          chart.config.lineAtIndexLabel
        );
      });
    }
  }
};

module.exports = VerticalLinePlugin;


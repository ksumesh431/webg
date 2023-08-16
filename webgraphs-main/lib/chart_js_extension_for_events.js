const EventVerticalLinePlugin = {
  getLinePosition: function(chart, pointIndex) {
    const meta = chart.getDatasetMeta(0); // second dataset is used to discover X coordinate of a point
    const data = meta.data;
    if (
      typeof meta === "undefined" ||
      meta === null ||
      typeof data === "undefined" ||
      data === null ||
      typeof data[pointIndex] === "undefined" ||
      data[pointIndex] === null ||
      typeof data[pointIndex]._model === "undefined" ||
      data[pointIndex]._model === null
    ) {
      return;
    }
    return data[pointIndex]._model.x;
  },
  renderDashedVerticalLine: function(chartInstance, pointIndex, eventlineAtIndexLabel, color, lineStyle) {
    if (
      typeof chartInstance === "undefined" ||
      typeof pointIndex === "undefined"
    ) {
      return;
    }
    const lineLeftOffset = this.getLinePosition(chartInstance, pointIndex);

    if (typeof lineLeftOffset === "undefined" || lineLeftOffset === null) {
      return;
    }

    const scale = chartInstance.scales["y-axis-0"];
    const context = chartInstance.chart.ctx;
    if (!color) {
      color = '#ff0000';
    }
    if (!lineStyle) {
      lineStyle = [1, 1];
    }
    // render vertical line
    context.beginPath();
    context.strokeStyle = color; //"#ff0000";
    context.setLineDash(lineStyle);
    context.lineWidth = 1.5;
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
      eventlineAtIndexLabel,
      lineLeftOffset,
      (scale.bottom - scale.top) / 2 + scale.top
    );
  },

  renderVerticalLine: function(
    chartInstance,
    pointIndex,
    eventlineAtIndexLabel
  ) {
    if (
      typeof chartInstance === "undefined" ||
      typeof pointIndex === "undefined"
    ) {
      return;
    }
    const lineLeftOffset = this.getLinePosition(chartInstance, pointIndex);
    const scale = chartInstance.scales["y-axis-0"];
    const context = chartInstance.chart.ctx;

    // draw line
    context.beginPath();
    context.moveTo(lineLeftOffset, scale.top);
    context.strokeStyle = "#FF0000";
    context.lineWidth = 1.5;
    context.lineTo(lineLeftOffset, scale.bottom);
    context.stroke();

    // write label
    context.fillStyle = "#9e0b0f";
    context.textAlign = "center";
    context.fillText("Baseline", 90, 18); //lineLeftOffset, (scale.bottom - scale.top) / 2 + scale.top);
  },

  beforeDatasetsDraw: function(chart, easing) {
    
    if (typeof(chart.config.stolineAtIndex) !== 'undefined') {
      //renderDashedVerticalLine
      //renderVerticalLine
      chart.config.stolineAtIndex.forEach(function(pointIndex){ EventVerticalLinePlugin.renderDashedVerticalLine(chart, pointIndex, chart.config.eventlineAtIndexLabel, '#000000', [5, 4])});
    }
    
    if (typeof chart.config.eventlineAtIndex !== "undefined") {
      //renderDashedVerticalLine
      //renderVerticalLine
      chart.config.eventlineAtIndex.forEach(function(pointIndex) {
        EventVerticalLinePlugin.renderDashedVerticalLine(
          chart,
          pointIndex,
          chart.config.eventlineAtIndexLabel
        );
      });
    }
    if (typeof chart.config.dashedeventlineAtIndex !== "undefined") {
      chart.config.dashedeventlineAtIndex.forEach(function(pointIndex) {
        EventVerticalLinePlugin.renderDashedVerticalLine(
          chart,
          pointIndex,
          chart.config.eventlineAtIndexLabel
        );
      });
    }
  }
};

module.exports = EventVerticalLinePlugin;


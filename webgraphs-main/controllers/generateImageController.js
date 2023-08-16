const ChartjsNode = require("chartjs-node");
const options = require("../lib/chartOptions");

module.exports = {
  generateImage: (req, res) => {
    console.log(req.body)
    const paramsBase64 = req.body.params;
    const buff = Buffer.from(paramsBase64, "base64");
    console.log(buff.toString());
    const jsonData = JSON.parse(buff.toString("ascii"));

    let chartNode = new ChartjsNode(900, 450);
    return chartNode
      .drawChart(options(jsonData))
      .then(() => {
        // get image as png buffer
        return chartNode.getImageBuffer("image/png");
      })
      .then(buffer => {
        // chart is now written to the file path
        // ./testimage.png
        res.writeHead(200, {
          "Content-Type": "image/png",
          "Content-Length": buffer.length
        });
        res.end(buffer);
      })
      .catch(e => {
        console.error("There was an error", e);
        res.status(500).json(e);
      });
  }
};


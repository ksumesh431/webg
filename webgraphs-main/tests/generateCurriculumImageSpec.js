const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../bin/www");
const should = chai.should();

chai.use(chaiHttp);

describe("Image Generator", function () {
  const data = {
    eventsData: ["null", "null", "null", "null", "null", "null", "null", 10],
    eventsLabels: ["", "", "", "", "", "", "", "1"],
    stepsData: [
      "51.2",
      "null",
      "55.68",
      "null",
      "null",
      "null",
      "60.16",
      "null",
    ],
    stepsLabels: [
      "Step #01 started on \n03/08/2022",
      "",
      "Step #02 started on \n04/05/2022",
      "",
      "",
      "",
      "Step #03 started on \n04/21/2022",
      "",
    ],
    labels: [
      "03/07/2022",
      "03/14/2022",
      "03/21/2022",
      "03/28/2022",
      "04/04/2022",
      "04/11/2022",
      "04/18/2022",
      "04/25/2022",
    ],
    valuePoints: {
      yAxisMax: 64,
      data: [
        {
          name: "Non-Dominant Hand (Step 01 - (Step #01))",
          values: ["null", 51.23, 38.29, 12.39, "null", "null", "null", "null"],
          labels: [
            "Non-Dominant Hand",
            "Non-Dominant Hand",
            "Non-Dominant Hand",
            "Non-Dominant Hand",
            "Non-Dominant Hand",
            "Non-Dominant Hand",
            "Non-Dominant Hand",
            "Non-Dominant Hand",
          ],
        },
        {
          name: "Dominant Hand (Step 01 - (Step #01))",
          values: ["null", 37.09, 21.22, 4.75, "null", "null", "null", "null"],
          labels: [
            "Dominant Hand",
            "Dominant Hand",
            "Dominant Hand",
            "Dominant Hand",
            "Dominant Hand",
            "Dominant Hand",
            "Dominant Hand",
            "Dominant Hand",
          ],
        },
        {
          name: "Non-Dominant Hand (Step 02 - (Step #02))",
          values: ["null", "null", "null", "null", "null", 25.89, 2.33, "null"],
          labels: [
            "Non-Dominant Hand",
            "Non-Dominant Hand",
            "Non-Dominant Hand",
            "Non-Dominant Hand",
            "Non-Dominant Hand",
            "Non-Dominant Hand",
            "Non-Dominant Hand",
            "Non-Dominant Hand",
          ],
        },
        {
          name: "Dominant Hand (Step 02 - (Step #02))",
          values: ["null", "null", "null", "null", "null", 25.2, 1.25, "null"],
          labels: [
            "Dominant Hand",
            "Dominant Hand",
            "Dominant Hand",
            "Dominant Hand",
            "Dominant Hand",
            "Dominant Hand",
            "Dominant Hand",
            "Dominant Hand",
          ],
        },
        {
          name: "Dominant Hand (Step 03 - (Step #03))",
          values: [
            "null",
            "null",
            "null",
            "null",
            "null",
            "null",
            "null",
            51.1,
          ],
          labels: [
            "Dominant Hand",
            "Dominant Hand",
            "Dominant Hand",
            "Dominant Hand",
            "Dominant Hand",
            "Dominant Hand",
            "Dominant Hand",
            "Dominant Hand",
          ],
        },
        {
          name: "Non-Dominant Hand (Step 03 - (Step #03))",
          values: [
            "null",
            "null",
            "null",
            "null",
            "null",
            "null",
            "null",
            44.27,
          ],
          labels: [
            "Non-Dominant Hand",
            "Non-Dominant Hand",
            "Non-Dominant Hand",
            "Non-Dominant Hand",
            "Non-Dominant Hand",
            "Non-Dominant Hand",
            "Non-Dominant Hand",
            "Non-Dominant Hand",
          ],
        },
      ],
      behaviorName: "Touch-Duration",
      multipleGraphs: false,
      dataType: "Duration (average in seconds)",
      stepName: "Step 03 - (Step #03)",
    },
    stolineAtIndex: [0, 2, 6],
    eventlineAtIndex: [7],
    xLabelString: "Session Days",
    lineAtIndex: "null",
  };
  let jsonB64;
  before(function () {
    jsonB64 = Buffer.from(JSON.stringify(data)).toString("base64");
  });

  it("should /POST an image request to the server", (done) => {
    let url = `/generate-curriculum-image`;

    chai
      .request(server)
      .post(url)
      .send({ params: jsonB64 })
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(200);
        res.should.have.header("Content-Type", "image/png");
        done();
      });
  });
});

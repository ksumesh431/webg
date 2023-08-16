const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../bin/www')
const should = chai.should();

chai.use(chaiHttp);


describe('Image Generator', function() {
    const data = {
        labelsArr1: ["", "01/04/2019", "01/11/2019", "01/18/2019", "", "01/25/2019", "02/01/2019", "02/08/2019", "02/15/2019", "02/22/2019", "03/01/2019", "03/08/2019", "03/15/2019", "03/22/2019", "03/29/2019", "04/05/2019", "04/12/2019", "04/19/2019", "04/26/2019", "05/03/2019", "05/10/2019"],
        label: "Name of maladaptive behavior (param)",
        dataArr1: ["null", 60.0, 20.0, 23.0, "null", 44, 99, "null", "null", "null", 40, "null", "null", "null", "null", "null", "null", "null", "null", "null", "null"],
        dataArr2: ["null", "null", "null", "null", "null", "null", "null", "null", "null", "null", 10.43016187151155, "null", "null", "null", "null", "null", "null", "null", "null", "null", "null"],
        labelsArr2: ["", "", "", "", "", "", "", "", "", "", "02/23/2019: Client's Health Issues: \nxaxa\n,Medication Change: \nadasdasd\n \n", "", "", "", "", "", "", "", "", "", ""],
        dataArr3: ["null", "null", "null", "null", "null", 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 25, 25],
        baselineCount: "4",
        yAxesSuggestedMax: "15",
        xAxesSuggestedMax: "15",
        xAxesLabelString: "Summary per week (Fridays)",
        lineAtIndex: [4],
        eventlineAtIndex: [10]
    }
    let jsonB64;
    before(function() {
        jsonB64 = Buffer.from(JSON.stringify(data)).toString("base64");
    });


    it('should /GET an image from server', (done) => {
        let url = `/generate-image?params=${jsonB64}`
        chai.request(server)
        .get(url)
        .end((err, res) => {
            should.not.exist(err);
            res.should.have.status(200);
            res.should.have.header('Content-Type', 'image/png');
            done();
        });
    })
});
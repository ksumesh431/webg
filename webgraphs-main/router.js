const router = require("express").Router();
const generateImageCtrl =
  require("./controllers/generateImageController").generateImage;
const generateCurriculumImageCtrl =
  require("./controllers/generateCurriculumImageController").generateImage;
const home = require("./controllers/applicationController").home;
const warmup = require("./controllers/applicationController").warmup;
router.post("/generate-image", generateImageCtrl);
router.post("/generate-curriculum-image", generateCurriculumImageCtrl);
router.get("/", home);
router.get("/_ah/warmup", warmup);

module.exports = router;

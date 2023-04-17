const router = require("express").Router();
const userRoutes = require("./userRoutes");
const postRoutes = require("./postRoutes");
const answerRoutes = require("./answerRoutes");

router.use("/users", userRoutes);
router.use("/posts", postRoutes);
router.use("/answers", answerRoutes);

module.exports = router;

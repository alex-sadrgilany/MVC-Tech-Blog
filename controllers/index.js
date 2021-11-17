const router = require("express").Router();
const apiRoutes = require("./api");
const homeRoutes = require("./home-routes");
const dashboardRoutes = require("./dashboard-routes");

// use these defined prefixes for various routes
router.use("/api", apiRoutes);
router.use("/", homeRoutes);
router.use("/dashboard", dashboardRoutes);

// return 404 status and end if any other routes are tried
router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;
const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.get("/test", (req, res) => {
  res.send("<h1>Tested Route!</h1>")
});
router.use((req, res) => {
  res.status(404).send("<h1>Wrong Route!</h1>").end();
});

module.exports = router;
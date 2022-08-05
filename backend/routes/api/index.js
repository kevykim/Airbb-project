const router = require('express').Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const spotsRouter = require("./spots.js");
const reviewsRouter = require("./reviews.js");
const bookingsRouter = require("./bookings.js");
const { restoreUser } = require("../../utils/auth.js");

router.post('/test', (req, res) => {
    res.json({ requestBody: req.body });
});


// GET /api/restore-user

router.get(
  '/restore-user',
  (req, res) => {
    return res.json(req.user);
  }
);


router.use(restoreUser);

router.use("/bookings", bookingsRouter);

router.use("/reviews", reviewsRouter);

router.use("/spots", spotsRouter);

router.use("/session", sessionRouter);

router.use("/users", usersRouter);

router.post("/test", (req, res) => {
  res.json({ requestBody: req.body });
});








module.exports = router;
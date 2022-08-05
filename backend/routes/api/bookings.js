const express = require("express");
const router = express.Router();

const { requireAuth, restoreUser } = require("../../utils/auth");
const { handleValidationErrors } = require("../../utils/validation");
const { check } = require("express-validator");

const { Spot, Image, Review, User, Booking, sequelize } = require("../../db/models");


// Get all of the Current User's Bookings
router.get('/current', requireAuth, async (req, res) => {
    const currentUser = req.user.id
    const bookings = await Booking.findAll({
        where: { userId: currentUser },
        include: [{model:Spot}]
    });

    res.status(200)
    res.json(bookings)

});

// Edit a Booking


// Delete a Booking





module.exports = router;
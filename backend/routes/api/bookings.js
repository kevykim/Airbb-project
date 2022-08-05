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

const validateBooking = [

]


// Edit a Booking
router.put('/:bookingId', requireAuth, async (req, res) => {
    const bookingId = req.params.bookingId
    const { startDate, endDate } = req.body

    const booking = await Booking.findByPk(bookingId)


    if(!booking) {
        res.status(404)
        res.json({
            message: "Booking couldn't be found",
            statusCode: 404
        })
    };

    booking.startDate = startDate
    booking.endDate = endDate

    await booking.save();
    res.status(200);
    res.json(booking);

})

// Delete a Booking
router.delete('/:bookingId', requireAuth, async (req, res) => {
    const bookingId = req.params.bookingId
    const booking = await Booking.findByPk(bookingId)

    if(!booking) {
        res.status(404)
        res.json({
            message: "Booking couldn't be found",
            statusCode: 404
        })
    };


    booking.destroy();
    res.json({
        message: "Successfully deleted",
        statusCode: 200
    })

});




module.exports = router;
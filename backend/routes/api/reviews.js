const express = require("express");
const router = express.Router();

const { requireAuth, restoreUser } = require("../../utils/auth");
const { handleValidationErrors } = require("../../utils/validation");
const { check } = require("express-validator");


const { Spot, Image, Review, User, sequelize } = require("../../db/models");


// Get all Reviews of the Current User
router.get('/current', requireAuth, async (req, res) => {
    const currentUser = req.user.id
    const reviews = await Review.findByPk(currentUser, {
        where: {ownerId: currentUser}
    });

    res.json(reviews);
});

// Add an Image to a Review based on the Review's id FEATURE 4 


// Edit a Review


// Delete a Review














module.exports = router
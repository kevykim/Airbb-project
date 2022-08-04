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
        where: {userId: currentUser}
    });

    res.json(reviews);
});

// Add an Image to a Review based on the Review's id FEATURE 4 


const validateReview = [
  check("review")
    .exists({ checkFalsy: true })
    .withMessage("Review text is required"),
  check("stars")
    .isInt({ gt: 0, lt: 6 })
    .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors
];

// Edit a Review
router.put('/:reviewId', requireAuth, validateReview, async (req, res) => {
    const {review, stars} = req.body
    const reviewId = req.params.reviewId
    const editReview = await Review.findByPk(reviewId)

    console.log(reviewId)

    if(!editReview) {
        res.status(404)
        res.json({
            message: "Review couldn't be found",
            statusCode: 404
        })
    };

    editReview.review = review
    editReview.stars = stars

    console.log(editReview)
    await editReview.save();
    res.status(200)
    res.json(editReview)

})

// Delete a Review
router.delete('/:reviewId', requireAuth, async (req, res) => {
    const reviewId = req.params.reviewId
    const review = await Review.findByPk(reviewId)

    if(!review) {
        res.status(404)
        res.json({
            message: "Review couldn't be found",
            statusCode: 404
        })
    };

    await review.destroy()
    res.status(200)
    res.json({
        message: "Successfully deleted",
        statusCode: 200
    });
})













module.exports = router
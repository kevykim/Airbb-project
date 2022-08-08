const express = require("express");
const router = express.Router();

const { requireAuth, restoreUser } = require("../../utils/auth");
const { handleValidationErrors } = require("../../utils/validation");
const { check } = require("express-validator");


const { Spot, Image, Review, User, sequelize } = require("../../db/models");


// Get all Reviews of the Current User
router.get('/current', requireAuth, async (req, res) => {
    const currentUser = req.user.id
    const reviews = await Review.findAll({
        where: {userId: currentUser},
        include: [
            {
             model: User, attributes: ['id', 'firstName', 'lastName'],
            },
            {
             model: Spot, attributes: {exclude: ['createdAt', 'updatedAt']}
            },
            {
             model: Image, attributes: ['id', ['reviewId', 'imageableId'], 'url']
            }
        ],
            
            
        
    });

    res.json(reviews);
});

// Add an Image to a Review based on the Review's id  
router.post('/:reviewId/images', requireAuth, async (req, res) => {
     const reviewId = req.params.reviewId;
     const userId = req.user.id;

     const review = await Review.findByPk(reviewId);
     const { url } = req.body;
     
     if (!review) {
       res.status(404);
       res.json({
         message: "Review couldn't be found",
         statusCode: 404,
       });
     }
     const addImage = await Image.create({
       userId,
       spotId: reviewId,
       reviewId,
       url,
       previewImage: true,
     });

    //  if (review.ownerId !== userId) {
    //    res.status(403);
    //    res.json({
    //      message: "Cannot add image",
    //      statusCode: 403,
    //    });
    //  }

    // console.log(addImage.length)
     if(addImage.length < 10) {
        res.status(403)
        res.json({
            message: "Maximum number of images for this resource was reached",
            statusCode: 403
        })
     }


     let image = {};
     image.id = addImage.id
     image.imageableId = reviewId;
     image.url = addImage.url;
     // image.previewImage = true

     res.json(image);
})



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

    // console.log(reviewId)

    if(!editReview) {
        res.status(404)
        res.json({
            message: "Review couldn't be found",
            statusCode: 404
        })
    };

    editReview.review = review
    editReview.stars = stars

    // console.log(editReview)
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

    review.destroy() // Why does it work if I take await out? 
    res.status(200)
    res.json({
        message: "Successfully deleted",
        statusCode: 200
    });
})













module.exports = router
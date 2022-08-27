const express = require("express");
const router = express.Router();

const { requireAuth, restoreUser } = require("../../utils/auth");
const { handleValidationErrors } = require("../../utils/validation");


const { Spot, Image, Review, User, Booking, sequelize } = require("../../db/models");



// Delete an Image

router.delete('/:imageId', requireAuth, async (req, res) => {
    const imageId = req.params.imageId

    // console.log(imageId)
    const image = await Image.findByPk(imageId)

    if(!image) {
        res.status(404)
       return res.json({
            message: "Image couldn't be found",
            statusCode: 404
        })
    };

    res.status(200)
    await image.destroy()
   return res.json({
        message: "Successfully deleted",
        statusCode: 200
    });

});









module.exports = router
const express = require('express');
const router = express.Router();

const { setTokenCookie, requireAuth } = require("../../utils/auth");


const { Spot, Image, Review, User, sequelize } = require('../../db/models')

// Get all Spots
router.get('/', async (req, res) => {
    const spots = await Spot.findAll({
        attributes: {
            include: ['id', 'ownerId', 'address', 'city', 'state',
        'country', 'lat', 'lng', 'name', 'description', 
        [
            sequelize.fn("AVG", sequelize.col("Reviews.stars")),
            "avgRating"
        ]
    ],
        exclude: ['createdAt', 'updatedAt']
    },
        include: {
            model: Review,

            include: {
                model: Image,
                attributes: ['previewImage']
            }
        }
    });
    res.json(spots)
    
});

// Get all Spots owned by the Current User
router.get('/current', async (req, res) => {
    const spots = await Spot.findAll({
        include: [
            {model: Review},
            {model: Image}
        ]
    });
    res.json(spots)

});

// Get details of a Spot from an id
router.get('/:spotId', async (req, res) => {
    const spotId = req.params.spotId
    const spots = await Spot.findByPk(spotId, {
        include: [
            {model: Image},
            {model: User}
        ]
    });

    if(!spots) {

        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    res.json(spots)
});


// Create a Spot
router.post('/', requireAuth, async (req, res) => {

    const {address, city, state, country, lat, lng, name, description, price} = req.body
    const newSpot = await Spot.create({
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    });



    await newSpot.save();
    res.status(201)
    res.json(newSpot)
});













module.exports = router;
const express = require('express');
const router = express.Router();

const { requireAuth } = require("../../utils/auth");
const { handleValidationErrors } = require("../../utils/validation")

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
    },
    include: {
        model: Review,
            attributes: {
                exclude: ['review', 'createdAt', 'updatedAt'],
            },

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
        price,
        ownerId: req.user.id
    });



    await newSpot.save();
    res.status(201)
    res.json(newSpot)
});


// Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', requireAuth, async (req, res) => {
    const spotId = req.params.spotId
    const userId = req.user.id

    const spot = await Spot.findByPk(spotId)
    const { url } = req.body
    const addImage = await spot.create({
        url
    });

    if(spot.ownerId !== userId) {
        res.json({
            message: "Cannot add image",
            statusCode: 403
        })
    }

    if(!spot) {
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    await addImage.save();
    res.status(200);
    res.json(addImage);

});


// Edit a Spot
router.put('/:spotId', requireAuth, handleValidationErrors, async (req, res) => {
    const spotId = req.params.spotId
    const {address, city, state, country, lat, lng, name, description, price} = req.body

    const spot = await Spot.findByPk(spotId)

      if (spot.ownerId !== req.user.id) {
        res.json({
          message: "Cannot add image",
          statusCode: 403,
        });
      };

      if (!spot) {
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
      };

      spot.address = address
      spot.city = city
      spot.state = state
      spot.country = country
      spot.lat = lat
      spot.lng = lng
      spot.name = name
      spot.description = description
      spot.price = price

      await spot.save();
      res.status(200);
      res.json(spot);

});


// Delete a Spot












module.exports = router;
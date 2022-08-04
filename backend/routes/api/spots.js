const express = require('express');
const router = express.Router();

const { requireAuth, restoreUser } = require("../../utils/auth");
const { handleValidationErrors } = require("../../utils/validation")
const { check } = require("express-validator");


const { Spot, Image, Review, User, sequelize } = require('../../db/models')


// Get all Spots owned by the Current User
router.get('/current',  requireAuth, async (req, res) => {
    const currentUser = req.user.id
    console.log(currentUser)
    

    const ownedSpots = await Spot.findAll({
      where: {
        ownerId: currentUser
      }
    })

    //  if (ownedSpots.ownerId !== currentUser) {
    //     res.status(403)
    //     res.json({
    //         message: "Not authorized",
    //         statusCode: 403
    //     });
    // }

    
    res.json(ownedSpots)
  });


// Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', requireAuth, async (req, res) => {
    const spotId = req.params.spotId
    const userId = req.user.id

    const spot = await Spot.findByPk(spotId)
    const { url } = req.body
    const addImage = await Image.create({
        spotId,
        url
    });

    if(spot.ownerId !== userId) {
        res.status(403)
        res.json({
            message: "Cannot add image",
            statusCode: 403
        })
    }

    if(!spot) {
        res.status(404)
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    let image = {}
    image.url = addImage.url
    image.previewImage = true

    res.json(image)
});



// Get details of a Spot from an id
router.get('/:spotId', async (req, res) => {
    const spotId = req.params.spotId
    const spot = await Spot.findByPk(spotId, {
        include: [
            {model: Image, attributes: ["url"]},
            {model: User, as: "Owner"}
        ]
    });

    console.log(spot)
    const reviews = await Review.count({
        where: {spotId}
    })

    const stars = await Review.sum('stars',
         { where: {spotId}}
    )

    console.log(reviews)
    console.log(stars)

    if(!spot) {

        res.status(404)
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    res.json(spot,
        reviews,
        stars)
});



const validateSpot = [
  check("address")
    .exists({ checkFalsy: true })
    .withMessage("Street address is required"),
  check("city").exists({ checkFalsy: true }).withMessage("City is required"),
  check("state").exists({ checkFalsy: true }).withMessage("State is required"),
  check("country")
    .exists({ checkFalsy: true })
    .withMessage("Country is required"),
  check("lat").isDecimal().withMessage("Latitude is not valid"),
  check("lng").isDecimal().withMessage("Longitude is not valid"),
  check("name")
    .isLength({ max: 49 })
    .withMessage("Name must be less than 50 characters"),
  check("description")
    .exists({ checkFalsy: true })
    .withMessage("Description is required"),
  check("price")
    .exists({ checkFalsy: true })
    .withMessage("Price per day is required"),
  handleValidationErrors,
];

// Edit a Spot
router.put("/:spotId", requireAuth, validateSpot, async (req, res) => {
  const spotId = req.params.spotId;
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;

  const spot = await Spot.findByPk(spotId);
  if (!spot) {
    res.status(404)
    res.json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }

  if (spot.ownerId !== req.user.id) {
    res.status(403)
    res.json({
      message: "Cannot edit spot",
      statusCode: 403,
    });
  }


  spot.address = address;
  spot.city = city;
  spot.state = state;
  spot.country = country;
  spot.lat = lat;
  spot.lng = lng;
  spot.name = name;
  spot.description = description;
  spot.price = price;
  spot.ownerId = req.user.id

  console.log(spot.ownerId)
  console.log(req.user.id)
  await spot.save();
  res.status(200);
  res.json(spot);
});





// Delete a Spot
router.delete("/:spotId", requireAuth, async (req, res) => {
  const spotId = req.params.spotId;

  const spot = await Spot.findByPk(spotId);

  if (spot.ownerId !== req.user.id) {
    res.json({
      message: "Cannot delete",
      statusCode: 403,
    });
  }

  if (!spot) {
    res.status(404);
    res.json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }

  await spot.destroy();
  res.json({
    message: "Successfully deleted",
    statusCode: 200,
  });
});



// Get all Spots
router.get('/', async (req, res) => {
    const spots = await Spot.findAll({
      attributes: {
        include: [
          [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"],
          [sequelize.literal("Images.url"), "previewImage"],
        ],
      },
      include: [
        {
          model: Review,
          attributes: [],
        },
        // attributes: {
        //     exclude: ['review', 'createdAt', 'updatedAt'],
        // },

        {
          model: Image,
          attributes: [],
          // ['previewImage']
        },
      ],
      group: ["Spot.id"],
    });
    res.json(spots)
    
});




  //  const spots = await Spot.findAll({
  //   attributes: {
  //     include: [
  //       [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"],
  //     ],
  //   },
  //   include: [
  //     {
  //       model: Review,
  //       attributes: [],
  //     },
  //     // attributes: {
  //     //     exclude: ['review', 'createdAt', 'updatedAt'],
  //     // },

  //     {
  //       model: Image,
  //       attributes: ['url'],
  //       // ['previewImage']
  //     },
  //   ],
  //   group: ["Spot.id"],
  // });

  



// Create a Spot
router.post('/', requireAuth, validateSpot, async (req, res) => {

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
















module.exports = router;
const express = require('express');
const router = express.Router();

const { requireAuth, restoreUser } = require("../../utils/auth");
const { handleValidationErrors } = require("../../utils/validation")
const { check } = require("express-validator");
const { Op } = require("sequelize");

const { Spot, Image, Review, User, Booking, sequelize } = require('../../db/models')


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


  // Get all Bookings for a Spot based on the Spot's id
  router.get('/:spotId/bookings', requireAuth, async (req, res) => {
    const spotId = req.params.spotId
    const currentUser = req.user.id

    const notOwnedBooking = await Booking.findAll({
      where: {},
    })

    const ownedBooking = await Booking.findAll({
      where: {spotId: spotId},
      include: [{model: User, attributes: ['id', 'firstName', 'lastName']} ]
    })

    const spot = await Spot.findByPk(spotId)
    
    if(!spot) {
      res.status(404)
      res.json({
        message: "Spot couldn't be found",
        statusCode: 404
      })
    }
    
    if (currentUser === spot.ownerId) {
      res.json(ownedBooking)
    };

  })




  const validateBooking = [

  ]


  // Create a Booking from a Spot based on the Spot's id
  router.post('/:spotId/bookings', requireAuth, async (req, res) => {
    const spotId = req.params.spotId
    const { startDate, endDate } = req.body
    const spot = await Spot.findByPk(spotId)
    const newBooking = await Booking.create({
      userId: req.user.id,
      spotId: spotId,
      startDate,
      endDate,
    });

    if(!spot) {
      res.status(404)
      res.json({
        message: "Spot couldn't be found",
        statusCode: 404
      })
    };

    await newBooking.save();
    res.json(newBooking);

  })


  // Get all Reviews by a Spot's id
  router.get('/:spotId/reviews', async (req, res) => {
    const spotId = req.params.spotId
    const spotHandler = await Spot.findByPk(spotId)
    const reviews = await Review.findAll({
      where: {
        spotId: spotId
      },
      include: [
      {
        model: User, attributes: ['id', 'firstName', 'lastName']
      },  
        {
          model: Image, attributes: ['id', ['reviewId', 'imageableId'], 'url'] 
        }
      ]
    });

    if(!spotHandler) {
      res.status(404)
      res.json({
        message: "Spot couldn't be found",
        statusCode: 404
      })
    };

    res.json(reviews)
  });


  const validateReview = [
    check("review")
      .exists({ checkFalsy: true })
      .withMessage("Review text is required"),
    check("stars")
      .isInt({ gt: 0, lt: 6 })
      .withMessage("Stars must be an integer from 1 to 5"),
      handleValidationErrors
  ];

 // Create a Review for a Spot based on the Spot's id
 router.post('/:spotId/reviews', requireAuth, validateReview , async (req, res) => {
    const currentUser = req.user.id
    const {review, stars} = req.body
    const spot = await Spot.findByPk(req.params.spotId)
    const newReview = await Review.create({
      userId: currentUser,
      spotId: req.params.spotId,
      review,
      stars
    });
    
    if(!spot) {
      res.status(404)
      res.json({
        message: "Spot couldn't be found",
        statusCode: 404
      })
    };

    const sameReviewChecker = await Review.findAll({
      where: {
        [Op.and]: [
          {spotId: req.params.spotId},
          {userId: currentUser}
        ]
      }
    });

    console.log(currentUser)
    console.log(req.params.spotId)
    // console.log(sameReviewChecker)
    console.log(newReview.id)

    if (sameReviewChecker.length >= 1) {
       res.status(403);
       res.json({
         message: "User already has a review for this spot",
         statusCode: 403,
       });
    }

  


    await newReview.save();
    res.status(201)
    res.json(newReview)
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
            {model: Image, attributes: ['id', ['spotId', 'imageableId'], 'url']},
            {model: User, as: "Owner", attributes: ['id', 'firstName', 'lastName']}
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

    console.log(newSpot)


    await newSpot.save();
    res.status(201)
    res.json(newSpot)
});
















module.exports = router;
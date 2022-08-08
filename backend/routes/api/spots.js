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
        ownerId: currentUser,
      },
      attributes: {
        include: [
          [sequelize.fn("AVG", sequelize.col("stars")), "avgRating"],
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
      where: {spotId: spotId},
      attributes: {exclude: ['userId']}
    })

    const ownedBooking = await Booking.findAll({
      where: [{ spotId: spotId }],
      include: [{model: User, attributes: ['id', 'firstName', 'lastName']} ]
    });

    const spot = await Spot.findByPk(spotId)
    
    if(!spot) {
      res.status(404)
      res.json({
        message: "Spot couldn't be found",
        statusCode: 404
      })
    }
    
    if (currentUser !== spot.ownerId) {
      res.json(notOwnedBooking)
    };

    // console.log(currentUser)
    // console.log(spot.ownerId)

    res.json(ownedBooking);
  })




  const validateBooking = [
check("startDate")
.isDate()
.withMessage('Must be a date'),
check("endDate")
.isDate()
.withMessage('Must be a date'),
handleValidationErrors
  ]


  // Create a Booking from a Spot based on the Spot's id
  router.post('/:spotId/bookings', requireAuth, validateBooking, async (req, res) => {
    const spotId = req.params.spotId
    const { startDate, endDate } = req.body
    const spot = await Spot.findByPk(spotId)
    
    if(!spot) {
      res.status(404)
      res.json({
        message: "Spot couldn't be found",
        statusCode: 404
      })
    };
    
    if (endDate < startDate) {
      res.status(400);
      res.json({
        message: "End date cannot come before start date ",
        statusCode: 400,
      });
    }

    if (spot.userId === req.user.id) {
      res.status(403)
      res,json({
        message: "Cannot book at own spot",
        statusCode: 403
      })
    }
    // console.log(spot.userId)
    // console.log(req.user.id)


      const sameBookingChecker = await Booking.findAll({
        where: { spotId: spotId,  
          // [Op.and]: [{ startDate: startDate }, {endDate: endDate}],
        },
      });

      // console.log(sameBookingChecker)
      // console.log(spotId);
      // console.log(startDate)

      if (sameBookingChecker.length >= 2) {
        res.status(403);
        res.json({
          message: "Sorry, this spot is already booked for the specified dates",
          statusCode: 403,
        });
      }

    const booking = await Booking.create({
      userId: req.user.id,
      spotId: spotId,
      startDate,
      endDate,
    });

    // console.log(spot)

    // await newBooking.save();
    res.json(booking);

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
          
          // console.log(currentUser)
          // console.log(req.params.spotId)
          // console.log(sameReviewChecker)
          // console.log(newReview.id)
          
          if (sameReviewChecker.length >= 2) {
               res.status(403);
               res.json({
                   message: "User already has a review for this spot",
                   statusCode: 403,
                 });
              }
              
              
              
          const newReview = await Review.create({
            userId: currentUser,
            spotId: req.params.spotId,
            review,
            stars,
          });
              
    // await newReview.save();
    res.status(201)
    res.json(newReview)
 });


// Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', requireAuth, async (req, res) => {
    const spotId = req.params.spotId
    const userId = req.user.id

    const spot = await Spot.findByPk(spotId)
    const { url } = req.body

    if(!spot) {
        res.status(404)
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    const addImage = await Image.create({
         userId,
         ownerId: userId,
        spotId,
        // reviewId: spotId,
        url,
        previewImage: true
    });

    // if(spot.ownerId !== userId) {
    //     res.status(403)
    //     res.json({
    //         message: "Cannot add image",
    //         statusCode: 403
    //     })
    // }


    let image = {}
    image.id = addImage.id
    // console.log(image.id)
    image.imageableId = addImage.spotId
    image.url = addImage.url
    // image.previewImage = true

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

    // console.log(spot)
    // const reviews = await Review.count({
    //     where: {spotId}
    // })

    // const stars = await Review.sum('stars',
    //      { where: {spotId}}
    // )

    const reviewFunctions = await Spot.findByPk(spotId, {
      include: { model: Review, attributes: [] },
      attributes: [
        [sequelize.fn("COUNT", sequelize.col("review")), "numReviews"],
        [sequelize.fn("AVG", sequelize.col("stars")), "avgStarRating"],
      ],
      raw: true,
    });


    if(!spot) {

        res.status(404)
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

       let spots = spot.toJSON();
       spots.numReviews = reviewFunctions.numReviews;
       if (!reviewFunctions.avgStarRating) {
         spots.avgStarRating = "This spot does not have any ratings";
       } else {
         spots.avgStarRating = Number(reviewFunctions.avgStarRating).toFixed(1);
       }



    res.json(spots)
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
    .exists({ checkFalsy: true })
    .isLength({ max: 49 })
    .withMessage("Name must be less than 50 characters"),
  check("description")
    .exists({ checkFalsy: true })
    .withMessage("Description is required"),
  check("price")
    .isInt()
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

  // console.log(spot.ownerId)
  // console.log(req.user.id)
  await spot.save();
  res.status(200);
  res.json(spot);
});





// Delete a Spot
router.delete("/:spotId", requireAuth, async (req, res) => {
  const spotId = req.params.spotId;

  const spot = await Spot.findByPk(spotId);
  if (!spot) {
    res.status(404);
    res.json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }

  if (spot.ownerId !== req.user.id) {
    res.json({
      message: "Cannot delete",
      statusCode: 403,
    });
  }


  await spot.destroy();
  res.json({
    message: "Successfully deleted",
    statusCode: 200,
  });
});


const validateQuery = [
  check("page")
  .optional()
  .isInt({ min: 0, max: 10})
  .withMessage("Page must be greater than or equal to 0"),
  check("size")
  .optional()
  .isInt({min: 0, max: 10})
  .withMessage("Page must be greater than or equal to 0"),
  check("maxLat")
  .isDecimal()
  .optional()
  .withMessage("Maximum latitude is invalid"),
  check("minLat")
  .isDecimal()
  .optional()
  .withMessage("Minimum latitude is invalid"),
  check("maxLng")
  .isDecimal()
  .optional()
  .withMessage("Maximum longitude is invalid"),
  check("minLng")
  .isDecimal()
  .optional()
  .withMessage("Minimum longitude is invalid"),
  check("maxPrice")
  .isDecimal({min: 0})
  .optional()
  .withMessage("Maximum price must be greater than or equal to 0"),
  check("minPrice")
  .isDecimal({min: 0})
  .optional()
  .withMessage("Minimum price must be greater than or equal to 0"),
  handleValidationErrors  
]


// Get all Spots
router.get('/', validateQuery, async (req, res) => {
 let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } =
   req.query;
   let pagination = {};

 page = parseInt(page);
 size = parseInt(size);

 if (!page) page = 0
 if (!size) size = 20
 if (Number.isNaN(page)) page = 0;
 if (Number.isNaN(size)) size = 20;


   pagination.limit = size
   pagination.offset = size * (page - 1)
 

    const allSpots = await Spot.findAll({
      // attributes: {
      //   include: [
      //     [sequelize.fn("AVG", sequelize.col("stars")), "avgRating"],
      //     [sequelize.literal("Images.url"), "previewImage"],
      //   ],
      // },
      // include: [
      //   {
      //     model: Review,
      //     attributes: [],
      //   },
        // attributes: {
        //     exclude: ['review', 'createdAt', 'updatedAt'],
        // },

        // {
        //   model: Image,
        //   attributes: [],
        //   // ['previewImage']
        // },
      // ],
      // group: ["Spot.id"],
      ...pagination
    });


    // let avgRating = await Review.findAll({
    //   where: {group: "spotId"},
    //   attributes: {
    //     include: [
    //       [sequelize.fn("AVG", sequelize.col("stars")), "avgRating"],
    //     ]
    //   }
    // });

    // spots.dataValues.avgRating = avgRating
    let spot = [];

    for (let spots of allSpots) {
      const avgRating = await Review.findAll({
        where: {
          spotId: spots.id,
        },
        attributes: [
          [sequelize.fn("AVG", sequelize.col("stars")), "avgRating"],
        ],
        raw: true,
      });

      let imageUrl = await Image.findOne({
        where: { spotId: spots.id },
        attributes: ["url"],
      });

      //    console.log('imageUrl.url: ', imageUrl.url)
      if (!imageUrl) {
        let ratings = {
          ...spots.dataValues,
          avgRating: avgRating[0].avgRating.toFixed(1),
          previewImage: null,
        };
        spot.push(ratings);
      } else {
        let ratings = {
          ...spots.dataValues,
          avgRating: avgRating[0].avgRating.toFixed(1),
          previewImage: imageUrl.url,
        };
        spot.push(ratings);
      }
    }

    res.json({ Spots: spot, page: page, size: size });

    
});

  



// Create a Spot
router.post('/', requireAuth, validateSpot, async (req, res) => {

    const {address, city, state, country, lat, lng, name, description, price} = req.body
    const newSpot = await Spot.create({
      ownerId: req.user.id,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price,
    });

    // console.log(newSpot)


    await newSpot.save();
    res.status(201)
    res.json(newSpot)
});
















module.exports = router;
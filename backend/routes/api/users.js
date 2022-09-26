const express = require("express");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");
const router = express.Router();

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

// const message = 'Password must be 6 characters or more.'

const validateSignup = [
  check("email")
    // .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("username")
    // .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters."),
  check("username")
  .not()
  .isEmail()
  .withMessage("Username cannot be an email."),
  check("password")
    // .exists({ checkFalsy: true })
    // .withMessage("REEEEE")
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  check("firstName")
  .exists({ checkFalsy: true })
  .withMessage("Please provide a first name"),
  check("lastName")
  .exists({ checkFalsy: true })
  .withMessage("Please provide a last name"),
  // check("lastName")
  // .isLength({min: 3})
  // .withMessage("Please provide a last name longer than 3 characters"),
  handleValidationErrors,
];

// Current User
router.get("/current", requireAuth, async (req, res) => {

  // console.log(req.user)
  res.json({
    id : req.user.id,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    email: req.user.email,
    username: req.user.username
    // token: req.cookies.token
    // What is token?? 
  })
});

// Sign up
router.post('/', validateSignup, async (req, res, next) => {
    const { email, password, username, firstName, lastName } = req.body;

    
    const duplicateEmail = await User.findOne({
      
      where: { email }
      
    });
    
    // LOOK AT SESSION ROUTES ERRORS MIGHT HAVE TO GO BACK AND REFACTOR ALL ERR HANDLING FOR 
    // ALL ROUTES SIMILAR TO SESSION ROUTES...

    if(duplicateEmail) {
      // res.status(403)
      // return res.json({
      //   message: "User with that email already exists",
      //   statusCode: 403
      // })
      const err = new Error('Email already exists')
      err.status = 403;
      err.title = 'Sign up failed'
      err.errors = ['Email already exists']
      return next(err)
    };

    const duplicateUsername = await User.findOne({
      where: { username }
    });

    if(duplicateUsername) {
      // res.status(403)
      // return res.json({
      //   message: "User with that username already exists",
      //   statusCode: 403
      // })
      const err = new Error('Username already exists')
      err.status = 403;
      err.title = 'Sign up failed'
      err.errors = ['Username already exists']
      return next(err)
    };

    const user = await User.signup({  email, username, password, firstName, lastName });

    const token = await setTokenCookie(res, user);
    
    user.dataValues.token = token
    // console.log(user.dataValues)

    return res.json({
      user
    });
  }
);





module.exports = router;

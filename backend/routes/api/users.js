const express = require("express");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");
const router = express.Router();

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");


const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .notEmpty()
    .withMessage("Please provide a valid email."),
  check("username")
    .exists({ checkFalsy: true })
    .notEmpty()
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters."),
  check("username")
  .not()
  .isEmail()
  .withMessage("Username cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  check("firstName")
  .exists({ checkFalsy: true })
  .withMessage("Please provide a first name"),
  check("lastName")
  .exists({ checkFalsy: true })
  .withMessage("Please provide a last name"),
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
router.post('/', validateSignup, async (req, res) => {
    const { email, password, username, firstName, lastName } = req.body;

    
    const duplicateEmail = await User.findOne({
      
      where: { email }
      
    });
    
    if(duplicateEmail) {
      res.status(403)
      return res.json({
        message: "User with that email already exists",
        statusCode: 403
      })
    };

    const duplicateUsername = await User.findOne({
      where: { username }
    });

    if(duplicateUsername) {
      res.status(403)
      return res.json({
        message: "User with that username already exists",
        statusCode: 403
      })
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

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
    .withMessage("Please provide a valid email."),
  check("username")
    .exists({ checkFalsy: true })
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

// Sign up
router.post('/', validateSignup, async (req, res) => {
    const { email, password, username, firstName, lastName } = req.body;

    const user = await User.signup({  email, username, password, firstName, lastName });

    await setTokenCookie(res, user);

    // if(user.email === req.body.email) {
    //   res.status(403)
    //   res.json({
    //     message: "Email already exists"
    //   })
    // }

    return res.json({
      user
    });
  }
);





module.exports = router;

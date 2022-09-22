const express = require('express');
const router = express.Router();

const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { User } = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { requireAuth } = require('../../utils/auth')


const validateLogin = [
  check("credential")
    .notEmpty()
    .withMessage("Please provide a valid email or username."),
  check("password")
    .notEmpty()
    .withMessage("Please provide a password."),
  handleValidationErrors,
];


// Current User
// router.get("/", requireAuth, async (req, res) => {

//   // console.log(req.user)
//   res.json({
//     id : req.user.id,
//     firstName: req.user.firstName,
//     lastName: req.user.lastName,
//     email: req.user.email,
//     username: req.user.username
//     // token: req.cookies.token
//     // What is token?? 
//   })
// });


// Log in
router.post('/', validateLogin, async (req, res, next) => {
    const { credential, password } = req.body;

    const user = await User.login({ credential, password });

    if (!user) {
      const err = new Error('Login failed');
      err.status = 401;
      err.title = 'Login failed';
      err.errors = ['Email or username does not match password. Please try again.'];
      return next(err);
    };

    const token = await setTokenCookie(res, user);
    user.dataValues.token = token
    return res.json({user});
  }
);


// Log out
router.delete('/', (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
  }
  );
  
  

// Restore session user
router.get('/',restoreUser, (req, res) => {
    const { user } = req;
    if (user) {
      return res.json({
        user: user.toSafeObject()
      });
    } else return res.json(null);
  }
);




module.exports = router;
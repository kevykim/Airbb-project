const router = require('express').Router();


router.post('/test', (req, res) => {
    res.json({ requestBody: req.body });
});


// GET /api/restore-user
const { restoreUser } = require('../../utils/auth.js');

router.use(restoreUser);

router.get(
  '/restore-user',
  (req, res) => {
    return res.json(req.user);
  }
);








module.exports = router;
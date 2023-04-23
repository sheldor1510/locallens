var router = require('express').Router();
const { requiresAuth } = require('express-openid-connect');
const User = require('../models/User')
const Gig = require('../models/Gig')

router.get('/', async function (req, res, next) {
  if (req.oidc.user) {
    const user = req.oidc.user;
    const newUser = new User({
      nickname: user.nickname,
      name: user.name,
      email: user.email,
      picture: user.picture,
      sid: user.sid
    })
    await newUser.save()
    res.render('info', {
      userProfile: JSON.stringify(user)
    })
  } else {
    res.render('login', {
      title: 'LocalLens',
      isAuthenticated: req.oidc.isAuthenticated()
    });
  }
});

router.post('/save-profile', async function (req, res, next) {
  const data = req.body;
  const userID = req.oidc.user.sid;
  User.findOne({ sid: userID })
  .then(user => {
    if (user) {
      console.log(user);
      user.location = data.location;
      user.duration = data.duration;
      user.bio = data.bio;
      //TODO: put bio through AI parser and get tags and save them
      const tags = [];
      user.tags = tags;
      user.save();
      res.json({ success: true, message: 'Profile completed!' })
    } else {
      res.json({ success: false, error: 'No user found' })
    }
  })
});

router.get('/dashboard', requiresAuth(), async function (req, res, next) {
  const userID = req.oidc.user.sid;
  const user = await User.findOne({ sid: userID })
  const tags = user.tags;
  const gigs = await Gig.find({})
  //TODO: use tags to filter through gigs and recommend this user gigs (2 same occurances atleast)
  res.render('dashboard', {
    userProfile: JSON.stringify(req.oidc.user)
  });
});

router.post('/new-gig', requiresAuth(), async function (req, res, next) {
  const { location, startDate, endDate, type, lookingForText } = req.body;
  const userID = req.oidc.user.sid;
  //TODO: put lookingForText through AI parser and get tags and save them
  const tags = [];
  const newGig = new Gig({
    location,
    startDate,
    endDate,
    type,
    lookingForText,
    tags,
    postedBy: userID
  })
  await newGig.save()
  res.json({ success: true })
})

router.get('/profile', requiresAuth(), function (req, res, next) {
  res.render('profile', {
    userProfile: JSON.stringify(req.oidc.user, null, 2),
    title: 'Profile page'
  });
});

router.get('/new', requiresAuth(), function (req, res, next) {
  res.render('new')
});

module.exports = router;

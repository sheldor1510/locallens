require('dotenv').config();
const router = require('express').Router();
const cohere = require('cohere-ai');
cohere.init(process.env.COHERE_API_KEY);
const { interestExamples, bioExamples } = require('../ai/data');
const { requiresAuth } = require('express-openid-connect');
const User = require('../models/User')
const Gig = require('../models/Gig')
const Response = require('../models/Response')

router.get('/', async function (req, res, next) {
  if (req.oidc.user) {
    const user = req.oidc.user;
    const userFound = await User.findOne({ sid: user.sid })
    if (!userFound) {
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
      res.redirect('/dashboard')
    }
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
  .then(async (user) => {
    if (user) {
      console.log(user);
      user.location = data.location;
      user.duration = data.duration;
      user.bio = data.bio;

      // Cohere AI: Put bio through AI parser and get tags and save them
      const input = [data.bio];
      const response = await cohere.classify({
          inputs: input,
          examples: bioExamples
      });
  
      let tags = [];
      const responseLabels = response.body.classifications[0].labels;
  
      for (const label in responseLabels) {
          if (responseLabels[label].confidence >= 0.05) {
              tags.push(label);
          }
          console.log(label + " = " + responseLabels[label]);
      }

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
  const gigsFromDB = await Gig.find({ active: true })
  const gigs = []
  gigsFromDB.forEach((gig) => {
    if (user.tags.includes(gig.tags[0]) || user.tags.includes(gig.tags[1])) {
      if (gig.postedBy !== userID) {
        gigs.push(gig)
      }
    }
  })
  gigs.forEach((gig) => {
    let img = ''
    if (gig.location === 'Los Angeles') {
      img = '/images/la.jpg'
    } else if (gig.location === 'Seattle') {
      img = '/images/seattle.jpg'
    } else if (gig.location === 'Miami') {
      img = '/images/miami.jpg'
    }
    const startDate = new Date(gig.startDate)
    const endDate = new Date(gig.endDate)
    gig.startDate = startDate.toDateString()
    gig.endDate = endDate.toDateString()
    gig.postedBy = img
  })
  res.render('dashboard', {
    userProfile: JSON.stringify(req.oidc.user),
    gigs
  });
});

router.get('/chat', requiresAuth(), async (req, res) => {
  const userId = req.oidc.user.name;
  res.render('chat', { user: userId });
});

router.post('/new-gig', requiresAuth(), async function (req, res, next) {
  const { location, startDate, endDate, type, lookingForText } = req.body;
  const userID = req.oidc.user.sid;

  // Cohere AI: lookingForText through AI parser and get tags and save them
  const input = [lookingForText];
  const response = await cohere.classify({
      inputs: input,
      examples: interestExamples
  });

  let tags = [];
  const responseLabels = response.body.classifications[0].labels;

  for (const label in responseLabels) {
      if (responseLabels[label].confidence >= 0.01) {
          tags.push(label);
      }
      console.log(label + " = " + responseLabels[label]);
  }

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

router.get('/gig/:id', requiresAuth(), async function (req, res, next) {
  const gig = await Gig.findById(req.params.id)
  const userID = req.oidc.user.sid;
  let responses = []
  let showresponses = false
  if (gig.postedBy === userID) {
    responses = await Response.find({ gigID: req.params.id, accepted: false })
    showresponses = true
  }
  let img = '/images/'
  if (gig.location === 'Los Angeles') {
    img += 'la.jpg'
  } else if (gig.location === 'Seattle') {
    img += 'seattle.jpg'
  } else if (gig.location === 'Miami') {
    img += 'miami.jpg'
  }
  const startDate = new Date(gig.startDate)
  const endDate = new Date(gig.endDate)
  gig.startDate = startDate.toDateString()
  gig.endDate = endDate.toDateString()
  switch (gig.type) {
    case 'humanized':
      gig.typeText = 'Physically roaming around ($32/hr)'
      break;
    case 'personalized':
      gig.typeText = 'Video Call ($24/hr)'
      break;
    case 'conversational':
      gig.typeText = 'Text-based ($16/hr)'
      break;
  }
  console.log(responses);
  res.render('gig', {
    gig,
    img,
    responses,
    showresponses
  })
})

router.get('/posted', requiresAuth(), async function (req, res, next) {
  const userID = req.oidc.user.sid;
  const gigs = await Gig.find({ postedBy: userID, active: true })
  gigs.forEach((gig) => {
    let img = ''
    if (gig.location === 'Los Angeles') {
      img = '/images/la.jpg'
    } else if (gig.location === 'Seattle') {
      img = '/images/seattle.jpg'
    } else if (gig.location === 'Miami') {
      img = '/images/miami.jpg'
    }
    const startDate = new Date(gig.startDate)
    const endDate = new Date(gig.endDate)
    gig.startDate = startDate.toDateString()
    gig.endDate = endDate.toDateString()
    gig.postedBy = img
  })
  res.render('posted', {
    gigs
  })
})

router.get('/applied', requiresAuth(), async function (req, res, next) {
  const userID = req.oidc.user.nickname;
  const responses = await Response.find({ applicant: userID })
  const gigs = []
  for (const response of responses) {
    const gig = await Gig.findById(response.gigID)
    if (gig.active) {
      gig.status = response.accepted ? 'Accepted' : 'Pending'
    } else {
      gig.status = 'Closed'
    }
    let img = ''
    if (gig.location === 'Los Angeles') {
      img = '/images/la.jpg'
    } else if (gig.location === 'Seattle') {
      img = '/images/seattle.jpg'
    } else if (gig.location === 'Miami') {
      img = '/images/miami.jpg'
    }
    const startDate = new Date(gig.startDate)
    const endDate = new Date(gig.endDate)
    gig.startDate = startDate.toDateString()
    gig.endDate = endDate.toDateString()
    gig.postedBy = img
    gigs.push(gig)
  }
  res.render('applied', {
    gigs
  })
})

router.get('/booked', requiresAuth(), async function (req, res, next) {
  const user = req.oidc.user;
  let gigs = []
  gigs = await Gig.find({ localAssigned: user.nickname, active: false })
  if (gigs.length === 0) {
    gigs = await Gig.find({ postedBy: user.sid, active: false })
  }
  console.log(gigs);
  gigs.forEach((gig) => {
    let img = ''
    if (gig.location === 'Los Angeles') {
      img = '/images/la.jpg'
    } else if (gig.location === 'Seattle') {
      img = '/images/seattle.jpg'
    } else if (gig.location === 'Miami') {
      img = '/images/miami.jpg'
    }
    const startDate = new Date(gig.startDate)
    const endDate = new Date(gig.endDate)
    gig.startDate = startDate.toDateString()
    gig.endDate = endDate.toDateString()
    gig.postedBy = img
  })
  res.render('booked', {
    gigs
  })
})

router.post('/apply-gig', (req, res) => {
  const { gigID, applyNote } = req.body;
  const userID = req.oidc.user.nickname;
  const newResponse = new Response({
    gigID,
    note: applyNote,
    applicant: userID
  })
  newResponse.save()
  res.json({ success: true })
})

router.post('/accept-gig', async (req, res) => {
  const { responseId } = req.body;
  const userID = req.oidc.user.sid;
  const responseFound = await Response.findById(responseId)
  const gigFound = await Gig.findById(responseFound.gigID)
  if (gigFound.postedBy === userID) {
    responseFound.accepted = true;
    responseFound.save()
    gigFound.active = false
    gigFound.localAssigned = responseFound.applicant
    gigFound.save()
    res.json({ success: true })
  } else {
    res.json({ success: false })
  }
})

router.post('/decline-gig', async (req, res) => {
  const { responseId } = req.body;
  const userID = req.oidc.user.sid;
  const responseFound = await Response.findById(responseId)
  const gigFound = await Gig.findById(responseFound.gigID)
  if (gigFound.postedBy === userID) {
    responseFound.accepted = false;
    responseFound.save()
    res.json({ success: true })
  } else {
    res.json({ success: false })
  }
})


router.get('/new', requiresAuth(), function (req, res, next) {
  res.render('new')
});

module.exports = router;

const passport = require('passport')
const router = require('express').Router()
const FacebookStrategy = require('passport-facebook')
const {User} = require('../db/models')
module.exports = router

if (!process.env.FACEBOOK_CLIENT_ID || !process.env.FACEBOOK_CLIENT_SECRET) {

  console.log('Facebook client ID / secret not found. Skipping Facebook OAuth.')

} else {

  const facebookConfig = {
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
    profileFields: ['id', 'emails', 'name']
  }

  const strategy = new FacebookStrategy(facebookConfig, (token, refreshToken, profile, done) => {
    const facebookId = profile.id
    const name = profile.displayName
    const email = profile.emails[0].value
    // Since our model requires a password, we stored a random string so the password
    // Could not be guessed and combined with the associated facebook email to gain access.
    const password = 'z>/[E<CVwGAma&7?';

    User.find({where: {facebookId}})
      .then(foundUser => (foundUser
        ? done(null, foundUser)
        : User.create({name, email, facebookId, password})
          .then(createdUser => done(null, createdUser))
      ))
      .catch(done)
  })

  passport.use(strategy)

  router.get('/', passport.authenticate('facebook', {scope: 'email'}))

  router.get('/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res, err) {
    console.log(err);
    // Successful authentication, redirect home.
    res.redirect('/home');
  });

}

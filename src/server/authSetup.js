let passport = require('passport');
let GoogleStrategy = require('passport-google-oauth20').Strategy;
let session = require('express-session');
let serverConfig = require('./serverConfig');

const authSetup = app => {
  app.use(session({ secret: serverConfig.sessionSecret, resave: true, saveUninitialized: true }));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, cb) => cb(null, user));
  passport.deserializeUser((obj, cb) => cb(null, obj));

  passport.use(
    new GoogleStrategy(
      {
        clientSecret: serverConfig.credentials.clientSecret,
        clientID: serverConfig.credentials.clientID,
        callbackURL: '/login/callback'
      },
      (token, refreshToken, profile, done) => {
        if (serverConfig.allowedDomainNames.includes(profile._json.domain)) {
          return done(null, profile);
        } else {
          return done();
        }
      }
    )
  );

  app.get('/login', passport.authenticate('google', { scope: ['profile', 'email'] }));

  app.get(
    '/login/callback',
    passport.authenticate(
      'google',
      { failureRedirect: 'http://www.red-badger.com' }
    ),
    (req, res) => {
      res.redirect(req.session.returnTo || '/');
      delete req.session.returnTo;
    }
  );

  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  return app;
};

module.exports = authSetup;

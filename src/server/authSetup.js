const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');

const authSetup = app => {
  app.use(session({
    secret: process.env.PASSPORT_SESSIONSECRET,
    resave: true,
    saveUninitialized: true,
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, cb) => cb(null, user));
  passport.deserializeUser((obj, cb) => cb(null, obj));

  passport.use(
    new GoogleStrategy(
      {
        clientSecret: process.env.PASSPORT_GOOGLE_CLIENTSECRET,
        clientID: process.env.PASSPORT_GOOGLE_CLIENTID,
        callbackURL: '/auth/login/callback',
      },
      (token, refreshToken, profile, done) => {
        // eslint-disable-next-line max-len, no-underscore-dangle
        if (process.env.PASSPORT_GOOGLE_ALLOWEDDOMAINNAMES === profile._json.domain) {
          return done(null, profile);
        }
        return done();
      }
    )
  );

  app.get('/auth/login', passport.authenticate('google', {
    scope: ['profile', 'email'],
  }));

  app.get('/auth/login/callback',
    passport.authenticate('google', {
      failureRedirect: 'http://www.red-badger.com',
    }),
    (req, res) => res.redirect('/about-us/events/add')
  );

  app.get('/auth/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  return app;
};

module.exports = authSetup;

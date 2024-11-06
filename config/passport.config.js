const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();
const User = require("../model/user");

const initPassport = (passport) => {
  const verifyCallback = async (accesToken, refreshToken, profile, done) => {
    //this is gonna be fired once we get the code and exchange that for profile info
    try {
      const userInDB = await User.findOne({ gid: profile.id });
      if (userInDB) return done(null, userInDB);
      const newUser = await User.create({
        gid: profile.id,
        username: profile.displayName,
      });
      return done(null, newUser);
    } catch (error) {
      done(error, null);
    }
  };

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "/auth/google/redirect",
      },
      verifyCallback
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    done(null, await User.findById(id));
  });
};

module.exports = initPassport;

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("./model/userModel");
const GoogleUser = require("./model/googleModel");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8673/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ email: profile.emails[0].value });
        if (user) {
          if (!user.googleId) {
            user.googleId = profile.id;
            user.displayName = profile.displayName;
            user.photo = profile.photos?.[0]?.value || "https://i.ibb.co/4pDNDk1/avatar.png";
            await user.save();
          }
          return done(null, user);
        }

        user = await User.create({
          googleId: profile.id,
          displayName: profile.displayName,
          email: profile.emails[0].value,
          name: profile.name.givenName + " " + profile.name.familyName,
          photo: profile.photos?.[0]?.value || "https://i.ibb.co/4pDNDk1/avatar.png",
          role: "customer",
          phone: "+234",
          address: {},
        });

        done(null, user);
      } catch (err) {
        done(err, false);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

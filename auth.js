// authorisation middleware
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

// middleware to authenticate user
passport.use(new LocalStrategy(async (username, password, done) => {
  //authentication logic

  try {
    //finding username in database
    const response = await person.findOne({ username: username });
    //if user doent exist
    if (!response) {
      done(null, false, { message: "user not found" });
    }
    //if user exist then comparing its password with the password given in body
    const pass = await response.comparePassword(password);
    // if password id correct
    if (pass) {
      done(null, response);
    } else {
      done(null, false, { message: "wrong password" });
    }

    // done is a callback function that take differnet argument based on the success or failure shown as above

  } catch (error) {
    done(error);
  }
}))


module.exports = passport;
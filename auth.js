const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;



passport.use(new LocalStrategy(async (username,password,done)=>{
  //authentication logic

  try {
    const response = await person.findOne({username : username});
    if(!response){
      done(null, false , {message : "user not found"});
    }
    const pass = await response.comparePassword(password);

    if(pass){
      done(null,response);
    }else{
      done(null,false,{message:"wrong password"});
    }


    
  } catch (error) {
    done(error);
  }
}))


module.exports = passport;
var jwtStrategy=require('passport-jwt').Strategy;
var ExtractJwt=require('passport-jwt').ExtractJwt;
module.exports=function(passport){

  passport.use(
    new jwtStrategy(
      {
        secretOrKey:process.env.secretKey,
        jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken()

      },
      function(jwt_payload,cb){
cb(null,false);
      }
    )
  )
}
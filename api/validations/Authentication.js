// const jwt=require("jsonwebtoken");
// const config=require("../config/config");
// const verifyToken=async(req,res,next)=>
// {
//     const token=req.body.token||req.query.token||req.headers["authorization"];
//     if(!token)
//     {
//         res.status(200).send({success:false,msg:"A token is required for authentication"});

//     }

//     try {
//         const descode=jwt.verify(token,config.secret_jwt);
//         req.user=descode;
        
//     } catch (error) {
//         res.status(400).send("invalid Token");
        
//     }
//     return next();
// }
// module.exports=verifyToken;


const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const jwt = require("jsonwebtoken");
const config = require("../config/config");

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.secret_jwt,
};

passport.use(
  new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
      return done(null, payload);
    } catch (error) {
      return done(error, false);
    }
  })
);

const requireAuth = passport.authenticate("jwt", { session: false });
module.exports = {
  requireAuth,
};

function requireUser(req, res, next) {
  if (!req.user) {
    res.status(401);
    next({
      name: "MissingUserError",
      message: "You must be logged in to perform this action"
    });
  }
  else {
    next();
  }
}

function requireAdmin(req, res, next) {
  // console.log ('THIS IS REQ.USER', req.user)
  if (!req.user || !req.user.isadmin ) {
    res.status(401);
    next({
      name: "NotAnAdmin",
      message: "You must be an admin to perform this action"
    });
  }
  else {
    next();
  }
}
// require admin here

// function requireAdmin (req,res,next) {
//    // if the user is an admin,
// }

const requiredNotSent = ({ requiredParams, atLeastOne = false }) => {
  return (req, res, next) => {
    // for operations that need at least one param. Not all required.
    if(atLeastOne) {
      let numParamsFound = 0;
      for(let param of requiredParams) {
        if(req.body[param] !== undefined) {
          numParamsFound++;
        }
      }
      if(!numParamsFound) {
        next({
          name: 'MissingParams',
          message: `Must provide at least one of these in body: ${requiredParams.join(', ')}`
        })
      } else {
        next();
      }
    } else {
      // figure out which ones are not defined, and return them
      const notSent = [];
      for(let param of requiredParams) {
        if(req.body[param] === undefined) {
          notSent.push(param);
        }
      }
      if(notSent.length) next({
        name: 'MissingParams',
        message: `Required Parameters not sent in body: ${notSent.join(', ')}`
      })
      next();
    }
  }
}

module.exports = {
  requireUser,
  requiredNotSent,
  requireAdmin
}

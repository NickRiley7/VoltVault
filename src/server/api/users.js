const express = require("express");
const usersRouter = express.Router();
const { requireUser, requiredNotSent, requireAdmin } = require("./utils");

const {
  createUser,
  getAllUsers,
  getUser,
  getUserByEmail,
  getUserById,
  updateUser,
  destroyUser,
} = require("../db");

const jwt = require("jsonwebtoken");

// GET ALL USERS
usersRouter.get("/", requireAdmin, async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.send({
      users,
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});


usersRouter.get('/account', requireUser, async (req,res,next) => {
  try{
    // console.log('getting my info account...')
    res.send (req.user)
    // console.log('finished getting my info account!')
  }
  catch (error) {
    next(error)
  }
})

//GET SINGLE USER BY ID
usersRouter.get("/:id", requireAdmin, async (req, res, next) => {
  //requireAdmin
  try {
    const user = await getUserById(req.params.id);
    res.send(user);
  } catch (error) {
    console.error(error.message);
  }
});

// (/me) endpoint

// GET USER BY EMAIL -- needed? can pull all users & filter?
// usersRouter.get("/:email", async (req, res, next) => {
//   try {
//     const user = await getUserByEmail(req.params.email);
//     res.send(user);
//   } catch (error) {
//     console.error(error.message);
//   }
// });

// LOGIN
usersRouter.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both an email and password",
    });
  }
  try {
    const user = await getUser({ email, password });
    if (user) {
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1w",
        }
      );

      res.send({
        message: "Login successful!",
        token,
      });
    } else {
      next({
        name: "IncorrectCredentialsError",
        message: "Username or password is incorrect",
      });
    }
  } catch (err) {
    next(err);
  }
});

usersRouter.post("/register", async (req, res, next) => {
  const { username, firstName, lastName, address, address2, city, state, zip, email, password, isAdmin } =
    req.body;

  try {
    const _user = await getUserByEmail(email);

    if (_user) {
      res.status(401);
      next({
        name: "UserExistsError",
        message: "A user with that email already exists",
      });
    }

    const user = await createUser({
      username,
      firstName,
      lastName,
      address,
      address2,
      city,
      state,
      zip,
      email,
      password,
      isAdmin,
    });

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1w",
      }
    );

    res.send({
      message: "Sign up successful!",
      token,
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});


usersRouter.patch(
  "/:userId",
  requireUser,
  requiredNotSent({
    requiredParams: ['username', 'firstName', 'lastName', 'address', 'address2', 'city', 'state', 'zip', 'email', 'password', 'isAdmin'],
    atLeastOne: true}),
  async (req, res, next) => {
    try {
      console.log('THIS IS USER ID IN PARAMS ', req.params)
      const { username, firstName, lastName, address, address2, city, state, zip, email, password, isAdmin } = req.body;
      const {userId} = req.params;
      const userToUpdate = await getUserById(userId);
      console.log ('THIS IS USER TO UPDATE ',userToUpdate)
      console.log ('THIS IS ADMIN STATUS ', isAdmin)
      if (!userToUpdate) {
        next({
          name: "Not Found",
          message: `No user by ID ${userId}`,
        });
      } else if (req.user.id !== userToUpdate.id) {
        res.status(403);
        next({
          name: "WrongUser",
          message: "you can only update your own account.",
        });
      } else {
        const updatedUser = await updateUser({
          id: userId, username, firstname: firstName, lastname: lastName, address, address2, city, state, zip, email, password, isadmin: isAdmin
        });
        if (updatedUser) {
          console.log ('updating user...')
          res.send(updatedUser);
          console.log ('finished updating user!')
        } else {
          console.log ('error in updating the user!')
          next({
            name: "FailedToUpdate",
            message: "There was an error updating the user",
          });
        }
      }
    } catch (error) {
      console.error ("ERROR!")
      next(error);
    }
  }
);

usersRouter.delete("/:userId", requireAdmin, async (req, res, next) => {
  // no priority. But can be for admin
  try {
    const {userId} = req.params
    const userToUpdate = await getUserById(userId);
    if (!userToUpdate) {
      next({
        name: 'NotFound',
        message: `No user by ID ${userId}`
      })
    }
    else {
      const deletedUser = await destroyUser(userId);
      res.send(deletedUser);
      console.log ('user deleted!')
    }
  } catch (error) {
    console.error ('ERROR!')
    next(error);
  }
});

module.exports = usersRouter;

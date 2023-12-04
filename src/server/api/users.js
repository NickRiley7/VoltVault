const express = require("express");
const usersRouter = express.Router();
const { requireUser, requiredNotSent } = require("./utils");

const {
  createUser,
  getAllUsers,
  getUser,
  getUserByEmail,
  getUserById,
  updateUser,
  getUserByUsername,
  destroyUser,
} = require("../db");

const jwt = require("jsonwebtoken");

// GET ALL USERS
usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await getAllUsers();
    console.log(users);
    res.send({
      users,
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

//GET SINGLE USER BY ID
usersRouter.get("/:id", async (req, res, next) => {
  try {
    const user = await getUserById(req.params.id);
    res.send(user);
  } catch (error) {
    console.error(error.message);
  }
});

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
  const { username, firstName, lastName, address, email, password, isAdmin } =
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
    requiredParams: ["username, firstName, lastName, address, email"],
    atLeastOne: true,
  }),
  async (req, res, next) => {
    try {
      const { username, firstName, lastName, address, email } = req.body;
      const [id] = req.params;
      const userToUpdate = await getUserById(userId);
      if (!userToUpdate) {
        next({
          name: "Not Found",
          message: `No user by ID ${userId}`,
        });
      } else if (req.user.id !== user.id) {
        res.status(403);
        next({
          name: "WrongUser",
          message: "you can only update your own account.",
        });
      } else {
        const updatedUser = await updateUser({
          id: username,
          firstName,
          lastName,
          address,
          email,
        });
        if (updatedUser) {
          res.send(updatedUser);
        } else {
          next({
            name: "FailedToUpdate",
            message: "There was an error updating your routine",
          });
        }
      }
    } catch (error) {
      next(error);
    }
  }
);

usersRouter.delete("/:userId", requireUser, async (req, res, next) => {
  try {
    console.log(req.params);
    const user = await destroyUser(req.params.userId);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;

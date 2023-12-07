const db = require("./client");
const bcrypt = require("bcrypt");
const SALT_COUNT = 10;
const util = require("./util");

async function createUser({
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
}) {
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  try {
    const {
      rows: [user],
    } = await db.query(
      `
        INSERT INTO users(username, firstName, lastName, address, address2, city, state, zip, email, password, isAdmin)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        ON CONFLICT (email) DO NOTHING
        RETURNING *`,
      [
        username,
        firstName,
        lastName,
        address,
        address2,
        city,
        state,
        zip,
        email,
        hashedPassword,
        isAdmin,
      ]
    );
    console.log(user);
    return user;
  } catch (err) {
    throw err;
  }
}

async function getAllUsers() {
  try {
    const { rows } = await db.query(`
        SELECT * FROM users;
        `);
    return rows;
  } catch (error) {
    console.error(error.message);
  }
}

async function getUser({ email, password }) {
  if (!email || !password) {
    return;
  }
  try {
    const user = await getUserByEmail(email);
    if (!user) return;
    const hashedPassword = user.password;
    const passwordsMatch = await bcrypt.compare(password, hashedPassword);
    if (!passwordsMatch) return;
    delete user.password;
    return user;
  } catch (err) {
    throw err;
  }
}

async function getUserByEmail(email) {
  try {
    const {
      rows: [user],
    } = await db.query(
      `
        SELECT * 
        FROM users
        WHERE email=$1;`,
      [email]
    );

    if (!user) {
      return;
    }
    return user;
  } catch (err) {
    throw err;
  }
}

async function getUserByUsername(username) {
  try {
    const {
      rows: [user],
    } = await db.query(
      `
        SELECt *
        FROM users
        WHERE username=$1;`,
      [username]
    );

    if (!username) {
      return;
    }
    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
}

// GET USER BY ID
async function getUserById(id) {
  try {
    // console.log ('Getting User by ID ....')
    // console.log ('THIS IS ID ', id)
    const {rows: [user]} = await db.query(`
      SELECT * FROM users
      WHERE id = $1
    `, [id]);

    if (!user) return null;
    delete user.password;

    // console.log ('finished getting user by id!')
    return user;
  } catch (error) {
    console.error ('ERROR IN GETTING ID BY USER')
    throw error;
  }
}

async function updateUser({ id, ...fields }) {
  try {
    console.log('updating user...')
    const toUpdate = {};
    for (let column in fields) {
      if (fields[column] !== undefined) toUpdate[column] = fields[column];
    }
    let user;
    if (util.dbFields(fields).insert.length > 0) {
      const { rows } = await db.query(
        `
          UPDATE users
          SET ${util.dbFields(toUpdate).insert}
          WHERE id=${id}
          RETURNING *;
      `,
        Object.values(toUpdate)
      );
      user = rows[0];
      delete user.password;
      return user;
    }
  }
  catch (error) {
    console.error ('error in updating the user function!')
    throw error
  }
}

//UPDATE - what order user removed from items?
// what to do w/ placed orders that already have a user that is to be deleted?
//
async function destroyUser(id) {
  try {
    const {
      rows: [users],
    } = await db.query(
      `
        DELETE FROM users
        WHERE id = $1
        RETURNING *;
    `,
      [id]
    );
    delete users.password;
    return users;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createUser,
  getAllUsers,
  getUser,
  getUserByEmail,
  getUserByUsername,
  getUserById,
  updateUser,
  destroyUser,
};

const db = require('./client')
const bcrypt = require('bcrypt');
const SALT_COUNT = 10;

async function createUser({ username, firstName, lastName, address, email, password, isAdmin }) {
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
    try {
        const { rows: [user ] } = await db.query(`
        INSERT INTO users(username, firstName, lastName, address, email, password, isAdmin)
        VALUES($1, $2, $3)
        ON CONFLICT (email) DO NOTHING
        RETURNING *`, [username, firstName, lastName, address, email, hashedPassword, isAdmin]);

        return user;
    } catch (err) {
        throw err;
    }
}

async function getUser({email, password}) {
    if(!email || !password) {
        return;
    }
    try {
        const user = await getUserByEmail(email);
        if(!user) return;
        const hashedPassword = user.password;
        const passwordsMatch = await bcrypt.compare(password, hashedPassword);
        if(!passwordsMatch) return;
        delete user.password;
        return user;
    } catch (err) {
        throw err;
    }
}

async function getUserByEmail(email) {
    try {
        const { rows: [ user ] } = await db.query(`
        SELECT * 
        FROM users
        WHERE email=$1;`, [ email ]);

        if(!user) {
            return;
        }
        return user;
    } catch (err) {
        throw err;
    }
}

async function getUserByUsername(username) {
    try {
        const { rows: [ user ] } = await db.query(`
        SELECt *
        FROM users
        WHERE username=$1;`, [ username ]);

        if(!username) {
            return;
        }
        return user;
    } catch (error) {
        throw error;
    }
}

async function destroyUser(user) {
    try {
        await db.query(`
        DELETE FROM users`)
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createUser,
    getUser,
    getUserByEmail,
    getUserByUsername
};
const db = require('./client')
const bcrypt = require('bcrypt');
const SALT_COUNT = 10;

const createUser = async({ username, firstname, lastname, address, email, password = ''}) => {
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
    try {

        // still need conflict handler if username/email is the same
        const { rows: [user ] } = await db.query(`
        INSERT INTO users(username, firstname, lastname, address, email, password)
        VALUES($1, $2, $3, $4, $5, $6)
        RETURNING *`, [username, firstname, lastname, address, email, password]);

        return user;
    } catch (err) {
        throw err;
    }
}

const getUser = async({email, password}) => {
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

const getUserByEmail = async(email) => {
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

module.exports = {
    createUser,
    getUser,
    getUserByEmail
};
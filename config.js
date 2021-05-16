//require('dotenv').config();
module.exports = {
    MONGO_URI: process.env.DB_URI,
    JWT_SECRET: process.env.JWT_SECRET
}

const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const uri = process.env.MONGODB_CONNECT_URI;

async function connect() {
    try {
        await mongoose.connect(uri);

        console.log('Connect successful');
    } catch (error) {
        console.log('Connect failure');
    }
}

module.exports = { connect };

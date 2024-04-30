const mongoose = require('mongoose');
const dbUrl = 'mongodb+srv://ngockunn13801:wQdj5SgW6KdVr9VE@f8education.0iminjl.mongodb.net/';
async function connect() {
    try {
        await mongoose.connect(dbUrl);

        console.log('Connect successful');
    } catch (error) {
        console.log('Connect failure');
    }
}

module.exports = { connect };

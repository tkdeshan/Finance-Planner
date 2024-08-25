const mongoose = require('mongoose');

const db = async () => {
    try {
       mongoose.set('strictQuery', false) 
       await mongoose.connect(process.env.MONGODB_URI);
       console.log('DB is connected successfully');
    } catch (error) {
        console.log('DB connection Error');
        
    }
}

module.exports = {db}
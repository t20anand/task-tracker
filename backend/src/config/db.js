const mongoose = require('mongoose');
const config = require('./config');

const connectMongoDB = () => {
    mongoose.connect(config.mongoDB.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    
    const db = mongoose.connection;
    
    db.on('error', console.error.bind(console, 'Connection error:'));
    
    db.once('open', () => {
        console.log('MongoDB connected successfully');
    });
}

module.exports = connectMongoDB;


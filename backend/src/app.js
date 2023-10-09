const Routes = require('./routes/routes');
const connectMongoDB = require('./config/db');
const globalErrorHandler = require('./middlewares/errorHandler');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const { accessTokenValidator, refreshTokenValidator } = require('./config/passport');

const cors = require('cors');

const initApp = (express, app) => {

    app.use(cors({
        origin: 'http://localhost:3000',
        credentials: true, // Enable cookies and credentials for cross-origin requests (if needed)
    }));

    app.use(express.json());

    app.use(express.urlencoded({ extended: true }));

    app.use(cookieParser());

    // Initializing all routes
    app.use(Routes);

    // Establishing Mongo DB connection
    connectMongoDB();

    // Initializing Passport
    app.use(passport.initialize());

    // configuring Jwt Passport Validator
    accessTokenValidator(passport);
    refreshTokenValidator(passport);



    //global error handler
    app.use(globalErrorHandler);
}

module.exports = initApp;
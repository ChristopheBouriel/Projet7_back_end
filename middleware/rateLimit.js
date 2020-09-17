const rateLimit = require("express-rate-limit");

exports.accessCreateAccountLimiter = rateLimit({
    windowMs: 3 * 60 * 1000,
    max: 5,
    message: "Too many attempts"
});
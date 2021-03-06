const path = require('path');
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 3500;
const express = require('express');
const credentials = require('./middleware/credentials');
const app = express();

// custom middleware logger
app.use(logger);

// Handle options credentials check - before CORS
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built in middleware to handle urlencoded data
// in other words, form data: "content-type": application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false })); // middleware for handling form data

// built-in middleware for json
app.use(express.json());

// middleware for cookies
app.use(cookieParser());

// serve static files
app.use(express.static(path.join(__dirname, "/public")));

// routes
app.use("/", require("./routes/root"));
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));


app.use(verifyJWT); // works like waterfall, anything below requires authorization
app.use("/employees", require("./routes/api/employees"));


// "Catch" handler
app.all("*", (req, res) => {
    res.status(404);
    if(req.accepts("html")) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if(req.accepts("json")) {
        res.json({ error: "404 Not Found"});
    } else {
        res.type("txt").send("404 Not Found");
    }  
})


// "Error page", 500 custom error handler
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
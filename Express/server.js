const path = require('path');
const PORT = process.env.PORT || 3500;
const express = require('express');
const app = express();

// custom middleware logger
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
})

// built in middleware to handle urlencoded data
// in other words, form data: "content-type": application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false })); // middleware for handling form data

// built-in middleware for json
app.use(express.json());

// serve static files
app.use(express.static(path.join(__dirname, "/public")))


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
})



app.get("/new", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "new.html"));
})

app.get("/old", (req, res) => {
    res.redirect(301, "/new");
})


// Route Handlers
app.get("/hello", (req, res, next) => {
    console.log("Attempted to load hello.html");
    next(); // move on to the next handler in the chain
}, (req, res) => {
    res.send("Hello World")
})

// Chaining route handlers
const one = (req, res, next) => {
    console.log("One");
    next();
}

const two = (req, res, next) => {
    console.log("two");
    next();
}

const three = (req, res) => {
    console.log("three");
    res.send("Finished!");
}

app.get("/chain", [one, two, three]);



// "Catch" handler
app.get("/*", (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
})



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
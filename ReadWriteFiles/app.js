const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

// async await approach
const fileOperations = async () => {
    try {
        const data = await fsPromises.readFile(path.join(__dirname, "files", "starter-promises.txt"), "utf-8");
        console.log(data);
        // await fsPromises.unlink(path.join(__dirname, "files", "starter-promises.txt")); // to delete file
        await fsPromises.writeFile(path.join(__dirname, "files", "promisesWrite.txt"), data);
        await fsPromises.appendFile(path.join(__dirname, "files", "promisesWrite.txt"), "\nAppending...");
        await fsPromises.rename(path.join(__dirname, "files", "promisesWrite.txt"), path.join(__dirname, "renamedPromises.txt"));
    } catch (err) {
        console.log(err);
    }
}
fileOperations();


// its asynchronous
fs.readFile(path.join(__dirname, "files", "starter.txt"), "utf-8", (err, data) => {
    if(err) throw err;
    console.log(data);
})

console.log("Hello") // to prove readFile is asynchronous

// writing files with nested callbacks
// to control the flow but not recommended
fs.writeFile(path.join(__dirname, "files", "reply.txt"), "Content to put in the file", (err) => {
    if(err) throw err;
    console.log("Write complete.");

    fs.appendFile(path.join(__dirname, "files", "reply.txt"), "\nWill create new file if dont exist", (err) => {
        if(err) throw err;
        console.log("Append complete.");

        fs.rename(path.join(__dirname, "files", "reply.txt"), path.join(__dirname, "files", "new-reply.txt"), (err) => {
            if(err) throw err;
            console.log("Rename complete.")
        })

    })
})


// exit on uncaught errors
process.on("uncaughtException", err => {
    console.error(`There was an uncaught error: ${err}`)
    process.exit(1);
})
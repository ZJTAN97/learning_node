const name = require('./utils.js');
const fs = require('fs');


fs.writeFileSync("notes.txt", "This file was creadted by Node.js");
fs.appendFileSync("notes.txt", "Appended file?")


console.log(name);
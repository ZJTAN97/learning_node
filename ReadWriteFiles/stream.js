// larger files --> split it and grab it bit by bit

const fs = require("fs");
const path = require("path");

const rs = fs.createReadStream(path.join(__dirname, "files", "lorem.txt"), {encoding: "utf-8"});
const ws = fs.createWriteStream(path.join(__dirname, "files", "new-lorem.txt"));

// rs.on("data", (data) => {
//     ws.write(data);
// })

// more efficient way
rs.pipe(ws);
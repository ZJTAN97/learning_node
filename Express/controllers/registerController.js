const usersDB = {
    users: require("../model/users.json"),
    setUsers: function (data) { this.users = data },
}

const fsPromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

const handleNewUser =  async (req, res) => {
    const { user, pwd } = req.body;
    if(!user || !pwd) return res.status(400).json({"message": "Username and password are required"});
    // check for duplicat usernames in db
    const duplicate = usersDB.users.find(
        person => person.username === user
    );
    if(duplicate) return res.sendStatus(409); // Conflict
    try {
        // encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10);
        // store the new user
        const newUser = { 
            "username": user,
            "roles": {
                "User": 2001
            },
            "password": hashedPwd,
         }
         usersDB.setUsers([...usersDB.users, newUser]);
         await fsPromises.writeFile(
            path.join(__dirname, "..", "model", "users.json"),
            JSON.stringify(usersDB.users)
         )
         console.log(usersDB.users);
         res.status(201).json({
             "success": `New user ${user} created.` 
         })

    } catch (err) {
        res.status(500).json({
            "message": err.message
         })
    }
}

// https://www.youtube.com/watch?v=Nlg0JrUt0qg&list=PL0Zuz27SZ-6PFkIxaJ6Xx_X46avTM1aYw&index=11
// 17:38

module.exports = {
    handleNewUser,
}
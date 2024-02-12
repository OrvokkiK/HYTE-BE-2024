/*//Mock data
const users = [
    {
      id: 1,
      username: "johndoe",
      password: "password1",
      email: "johndoe@example.com"
    },
    {
      id: 2,
      username: "janedoe",
      password: "password2",
      email: "janedoe@example.com"
    },
    {
      id: 3,
      username: "bobsmith",
      password: "password3",
      email: "bobsmith@example.com"
    }
  ];

// shows only a list of users, for security reasons
const getUsers = (req, res) => {
    const usernames = users.map(user => user.username);
    res.json({username: usernames});
    //res.json(users);
};

const getUsersById = (req, res) => {
    console.log('requested user by id', req.params.id);
    const userFound = users.find(user => {
        return user.id == req.params.id;
    });
    const resJson = userFound ? userFound : { error: 'not found'};
    if (userFound) {
        res.json(userFound);
    } else {
        res.status(404).json({error: 'User not found'});
    }
};

const postUser = (req,res) => {
    //TEST:
    /*
    {
        "username" : "testuser",
        "password" : "test",
        "email" : "test@example.com"
    }
    */
    /*// checks that all the required user information is submitted
    console.log("postUser: ", req.body);
    if (!req.body.username || !req.body.password || !req.body.email) {
        return res.status(400).json({error: "signup details missing"});
    }
    //checks if username or email are already registered
    const usernameTaken = users.some(user => user.username === req.body.username);
    if (usernameTaken) {
      // Username or password already taken, returns an error response
      return res.status(400).json({message: "Username is already registered" });
    }
    const emailTaken = users.some(user => user.email === req.body.email);
    if (emailTaken) {
        return res.status(400).json({message: "Email is already registered"})
    }
    //Creates new ID for a new user
    const newId = users[users.length-1].id + 1
    const newUser = {
        id: newId,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email};
    users.push(newUser);
    res.status(201).json({message: 'Succesful signup!'});
};

//TODO: implement
const putUser = (req, res) => {
    console.log('requested user by id', req.params.id);
    const index = users.findIndex(user => user.id == req.params.id);
    console.log('index:', index);
    if (index === -1) {
        console.log("index:", index);
        console.log("id", id);
        return res.sendStatus(404);
    }
    //bad request
    if (!req.body.username && !req.body.password && !req.body.email) {
        return res.status(400).json({error: "No changes submitted"});
    }
    //Checks for duplicates in dummy data
    const usernameTaken = users.some(user => user.username === req.body.username);
    if (usernameTaken) {
        // Username or password already taken, returns an error response
        return res.status(400).json({message: "Username is already registered" });
    }
    const emailTaken = users.some(user => user.email === req.body.email);
    if (emailTaken) {
          return res.status(400).json({message: "Email is already registered"})
    }
    // replaces username, password or email
    if (req.body.username) {
        users[index].username = req.body.username;
        res.json({updated_userInfo: users[index]});

    } if (req.body.password) {
        users[index].password = req.body.password;
        res.json({updated_userInfo: users[index]});

    } if (req.body.email) {
        users[index].email = req.body.email;
        res.json({updated_userInfo: users[index]}); //ei toimi jos kaikki tiedot on annettu?
    }
};

//Dummy Login, returns user if username and password match
const postLogin = (req, res) => {
    const userCreds = req.body;
    console.log('requested user by id', req.params.id);
    if (!userCreds.username || !userCreds.password) {
        return res.sendStatus(400);
    }
    const userFound = users.find(user => user.username == req.params.username);
    // user not found
    if (!userFound) {
        return res.status(403).json({error: 'username/password invalid'});
    }
    //Checks if posted password matches to found user's found password
    if (userFound.password === userCreds.password) {
        res.json({message: 'welcome', user: userFound});
    } else {
        return res.status(403).json({error: 'username/password invalid'});
    }
};

export {getUsers, getUsersById, postUser, putUser, postLogin};*/

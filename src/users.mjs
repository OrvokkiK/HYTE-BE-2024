//Mock data
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

// TODO: implement route handlers below for users
// Piilota salasanat, emailit?
const getUsers = (req, res) => {
    res.json(users);
};

//TODO: implement

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

// TODO implement
const postUser = (req,res) => {
    //TEST:
    /*
    {
        "username" : "testuser",
        "password" : "test",
        "email" : "test@example.com"
    }
    */
   // toimii
    console.log("postUser: ", req.body);
    if (!req.body.username || !req.body.password || !req.body.email) {
        return res.status(400).json({error: "signup details missing"});
    }
    const newId = users[users.length-1].id + 1
    const newUser = {
        id: newId,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email};
    users.push(newUser);
    res.status(201).json({message: 'Succesful signup!'})
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
    if (req.body.username) {
        users[index].username = req.body.username;
        res.json({updated_userInfo: users[index]});

    } if (req.body.password) {
        users[index].password = req.body.password;
        res.json({updated_userInfo: users[index]});

    } if (req.body.email) {
        users[index].email = req.body.email;
        res.json({updated_userInfo: users[index]}); //ei toimi jos muut tiedot on annettu?
    }
};

//Dummy Login, returns user if username and password match
// TODO: implement
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

    res.send('working on it');
};

export {getUsers, getUsersById, postUser, putUser, postLogin};

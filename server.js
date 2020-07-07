const express = require("express");
const Joi = require('joi')
const bodyParser = require('body-parser');
const app = express();

app.use(express.json());

const user = [];
const log = [];

// parse requests of content-type
app.use(bodyParser.json());

// parse requests of content-type
app.use(bodyParser.urlencoded({ extended: true }));

// GET all users registered
app.get('/users', (req, res) => {
    res.send(user);
});

// GET all events
app.get('/users/login', (req, res) => {
    res.send(log);
});

// GET all login event for a specific user
app.get('/users/login/:email', (req, res) => {
    const event = log.find(res => res.email === req.params.email);
    if (!event) {
        res.status(404).send('Wrong user email');
    } else {
        res.send(event);
    }
});

// GET all failed or succeeded login event 
app.get('/users/login/events/:type', (req, res) => {
    const event = log.find(res => res.type === req.params.type);
    if (!event) {
        res.status(404).send('Wrong type');
    } else {
        res.send(event);
    }
});

// register new users
app.post('/users', (req, res) => {
    const { error } = validateUser(req.body);
    if(error) {
        res.status(400).send(error.details[0].message);
        return;
    };
    const users = {
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
    };
    user.push(users);
    res.send(users);
});

// User trying to login into his/her account
app.post('/users/login', (req, res) => {
    const usersLogin = {
        email: req.body.email,
        password: req.body.password,
        type: "LOGIN",
        created: new Date(),
    };
    const usersLoginSuccess = {
        email: req.body.email,
        password: req.body.password,
        type: "SUCCESS",
        created: new Date(),
    };

    const users = user.find(res => res.email === usersLogin.email);
    const users2 = user.find(res => res.password === usersLogin.password);

    // if the information entered are wrong, display error
    if(!users || !users2) {
        log.push(usersLogin);
        res.status(404).send('Wrong email or password')
    } else {
        log.push(usersLoginSuccess);
        res.status(404).send('Login successful');
    }
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// function to validate the fields
function validateUser(users) {
    const schema = {
        email: Joi.string().required(),
        phone: Joi.string().length(10).regex(/^[0-9]+$/).required(),
        password: Joi.string().required()
    };
    return Joi.validate(users, schema);
}



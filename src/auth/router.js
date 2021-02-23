'use strict';

const express = require('express');
const router = express.Router();

const userModel = require('./models/users-model.js');

const basicAuth = require('./middleware/basic.js');

// Signup Route -- create a new user
// Two ways to test this route with httpie
// echo '{"username":"john","password":"foo"}' | http post :3000/signup
// http post :3000/signup usernmae=john password=foo
router.post('/signup', async (req, res) => {
  try {
    const user = new userModel(req.body);
    const record = await user.save(req.body);
    res.status(201).json(record);
  } catch (e) { res.status(403).send('Error Creating User'); }
});
// Signin Route -- login with username and password
// test with httpie
// http post :3000/signin -a john:foo
router.post('/signin', basicAuth, async (req, res, next) => {
  console.log(req.user);

  res.send('Im a dummy response');
});


module.exports = router;

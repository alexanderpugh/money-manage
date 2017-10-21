const express = require('express');

const controller = require('./controller');

const router = express.Router();
const base = '/registration';

router.get('/', (req, res, next) => {
  controller.indexPage({ req, res, next });
});

router.post('/signup', (req, res, next) => {
  controller.signupForm({ req, res, next, base});
});

router.post('/login', (req, res, next) => {
  controller.loginForm({ req, res, next, base});
});

router.get('/logout', (req, res, next) => {
  controller.signoutAction({ req, res, next });
});

module.exports = {
  base,
  router
};

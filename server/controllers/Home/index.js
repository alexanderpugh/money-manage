const express = require('express');

const controller = require('./controller');

const router = express.Router();

router.get('/', (req, res, next) => {
  controller.indexPage({ req, res, next });
});

module.exports = {
  base: '/',
  router
};

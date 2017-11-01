const express = require('express');

const controller = require('./controller');

const router = express.Router();
const base = '/settings';

router.get('/', (req, res, next) => {
  controller.indexPage({ req, res, next });
});

router.post('/update', (req, res, next) => {
  controller.updateSettingsAction({ req, res, next, base });
});

module.exports = {
  base,
  router
};

const express = require('express');

const controller = require('./controller');

const router = express.Router();
const base = '/salary-calc';

router.get('/', (req, res, next) => {
  controller.indexPage({ req, res, next });
});

router.post('/update', (req, res, next) => {
  controller.updateSalaryAssessmentAction({ req, res, next, base });
});

module.exports = {
  base,
  router
};

const express = require('express');

const controller = require('./controller');

const router = express.Router();
const base = '/expenses';

router.get('/', (req, res, next) => {
  controller.indexPage({ req, res, next });
});

router.get('/create-set', (req, res, next) => {
  controller.createSetPage({ req, res, next });
});

router.post('/create-set', (req, res, next) => {
  controller.createSetForm({ req, res, next, base });
});

router.get('/edit-set-:expenseSetId', (req, res, next) => {
  controller.editSetPage({ req, res, next, base });
});

router.post('/edit-set-:expenseSetId', (req, res, next) => {
  controller.editSetForm({ req, res, next, base });
});

router.get('/edit-set-:expenseSetId/create-expense', (req, res, next) => {
  controller.createExpensePage({ req, res, next, base });
});

router.post('/edit-set-:expenseSetId/create-expense', (req, res, next) => {
  controller.createExpenseForm({ req, res, next, base });
});

router.post('/edit-set-:expenseSetId/delete-:expenseId', (req, res, next) => {
  controller.deleteExpenseForm({ req, res, next, base });
});

router.get('/edit-set-:expenseSetId/:expenseId', (req, res, next) => {
  controller.editExpensePage({ req, res, next, base });
});

router.post('/edit-set-:expenseSetId/:expenseId', (req, res, next) => {
  controller.editExpenseForm({ req, res, next, base });
});

router.post('/delete-set-:expenseSetId', (req, res, next) => {
  controller.deleteExpenseSetForm({ req, res, next, base });
});

module.exports = {
  base,
  router
};

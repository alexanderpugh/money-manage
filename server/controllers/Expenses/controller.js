const expenseSetsService = require('../../services/expenseSets.service');
const expensesService = require('../../services/expenses.service');
const createObjectConstructorWithDefaults = require('../../utilities/createObjectConstructorWithDefaults');

const createVm = createObjectConstructorWithDefaults({ currentPage: 'EXPENSES' });

module.exports = {
  indexPage({ req, res, next }) {
    const vm = createVm();

    if (req.query.unsafe) {
      vm.unsafe = true;
    }

    (async () => {
      try {
        vm.expenseSets = await expenseSetsService.fetchAll({ userId: req.session.userId });

        res.render('pages/Expenses/index.nunjucks', { vm });
      } catch (error) {
        res.status(500);
        vm.error = error;
        res.render('pages/error/500.nunjucks', { vm });
      }
    })();
  },

  createSetPage({ req, res, next }) {
    const vm = createVm();
    vm.subPage = 'CREATE_SET';
    res.render('pages/Expenses/create-set.nunjucks', { vm });
  },

  createSetForm({ req, res, next, base }) {
    const vm = createVm();

    (async () => {
      try {
        const name = req.body.name;
        const description = req.body.description;

        if (!(Boolean(name) || Boolean(description))) {
          throw new Error('It seems you disabled your browsers form validation.');
        }

        const newSet = await expenseSetsService.create({
          name,
          description,
          userId: req.session.userId
        });

        res.redirect(`${base}#expense-set-${newSet.id}`);

      } catch (error) {
        res.status(500);
        vm.error = error;
        res.render('pages/error/500.nunjucks', { vm });
      }
    })();
  },

  editSetPage({ req, res, next }) {
    const vm = createVm();
    vm.subPage = 'EDIT_SET';

    (async () => {
      try {
        vm.expenseSet = await expenseSetsService.fetchOne({
          expenseSetId: req.params.expenseSetId,
          userId: req.session.userId
        });
        res.render('pages/Expenses/edit-set.nunjucks', { vm });
      } catch (error) {
        res.status(500);
        vm.error = error;
        res.render('pages/error/500.nunjucks', { vm });
      }
    })();
  },

  editSetForm({ req, res, next, base }) {
    const vm = createVm();

    (async () => {
      try {
        const editedExpenseSet = await expenseSetsService.edit({
          name: req.body.name,
          description: req.body.description,
          expenseSetId: req.params.expenseSetId,
          userId: req.session.userId
        });

        res.redirect(`${base}#expense-set-${editedExpenseSet.id}`);

      } catch (error) {
        res.status(500);
        vm.error = error;
        res.render('pages/error/500.nunjucks', { vm });
      }
    })();
  },

  editExpensePage({ req, res, next }) {
    const vm = createVm();
    vm.subPage = 'EDIT_EXPENSE';

    (async () => {
      try {
        vm.expense = await expensesService.fetchOne({
          expenseId: req.params.expenseId,
          expenseSetId: req.params.expenseSetId,
          userId: req.session.userId
        });

        res.render('pages/Expenses/edit-expense.nunjucks', { vm });
      } catch (error) {
        res.status(500);
        vm.error = error;
        res.render('pages/error/500.nunjucks', { vm });
      }
    })();
  },

  editExpenseForm({ req, res, next, base }) {
    const vm = createVm();

    (async () => {
      try {
        const expenseEdited = await expensesService.edit({
          expenseId: req.params.expenseId,
          expenseSetId: req.params.expenseSetId,
          name: req.body.name,
          totalYearly: req.body.totalYearly,
          description: req.body.description,
          userId: req.session.userId
        });

        res.redirect(`${base}#expense-set-${req.params.expenseSetId}`);

      } catch (error) {
        res.status(500);
        vm.error = error;
        res.render('pages/error/500.nunjucks', { vm });
      }
    })();
  },

  createExpensePage({ req, res, next }) {
    const vm = createVm();
    vm.subPage = 'CREATE_EXPENSE';
    vm.expenseSetId = req.params.expenseSetId;

    res.render('pages/Expenses/edit-expense.nunjucks', { vm });
  },

  createExpenseForm({ req, res, next, base }) {
    const vm = createVm();

    (async () => {
      try {
        const newExpense = await expensesService.create({
          name: req.body.name,
          description: req.body.description,
          totalYearly: req.body.totalYearly,
          expenseSetId: req.params.expenseSetId,
          userId: req.session.userId
        });

        await expenseSetsService.addToTotalYearly({
          expenseSetId: newExpense.expenseSetId,
          userId: req.session.userId,
          value: newExpense.totalYearly
        });

        res.redirect(`${base}#expense-set-${newExpense.id}`);

      } catch (error) {
        res.status(500);
        vm.error = error;
        res.render('pages/error/500.nunjucks', { vm });
      }
    })();
  },

  deleteExpenseForm({ req, res, next, base }) {
    const vm = createVm();

    (async () => {
      try {
        const expense = await expensesService.fetchOne({
          expenseSetId: req.params.expenseSetId,
          expenseId: req.params.expenseId,
          userId: req.session.userId
        });

        const expenseDeleted = await expensesService.remove({
          expenseSetId: req.params.expenseSetId,
          expenseId: req.params.expenseId,
          userId: req.session.userId
        });

        await expenseSetsService.addToTotalYearly({
          expenseSetId: req.params.expenseSetId,
          userId: req.session.userId,
          value: -expense.totalYearly
        });

        res.redirect(`${base}#expense-set-${req.params.expenseSetId}`);

      } catch (error) {
        res.status(500);
        vm.error = error;
        res.render('pages/error/500.nunjucks', { vm });
      }
    })();
  },

  deleteExpenseSetForm({ req, res, next, base }) {
    const vm = createVm();

    (async () => {
      try {
        const expensesDeleted = await expensesService.remove({
          expenseSetId: req.params.expenseSetId,
          userId: req.session.userId
        });

        const expenseSetDeleted = await expenseSetsService.remove({
          expenseSetId: req.params.expenseSetId,
          userId: req.session.userId
        });
        res.redirect(base);

      } catch (error) {
        res.status(500);
        vm.error = error;
        res.render('pages/error/500.nunjucks', { vm });
      }
    })();
  }
};

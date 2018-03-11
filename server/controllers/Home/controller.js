const logger = require('heroku-logger');

const createFactory = require('../../utilities/createFactory');
const expenseSetsService = require('../../services/expenseSets.service');
const userService = require('../../services/users.service');
const expensesService = require('../../services/expenses.service');
const fsAsync = require('../../utilities/fsAsync');
const jsonUtil = require('../../utilities/json.util');

const createVm = createFactory({ currentPage: 'HOME' });

module.exports = {
  indexPage({ req, res, next }) {
    const vm = createVm();
    (async () => {
      try {
        vm.expenseSetsTotal = await expenseSetsService.getTotalYearlyTotal({ userId: req.session.userId });
        vm.userDetails = await userService.getDetails({ userId: req.session.userId });
        vm.salaryAssessment = await userService.fetchSalaryAssessment({ userId: req.session.userId });

        res.render('pages/Home/index.nunjucks', { vm });
      } catch (error) {
        res.status(500);
        vm.error = error;
        res.render('pages/error/500.nunjucks', { vm });
      }
    })();
  },

  downloadJsonAction({ req, res, next }) {
    const vm = createVm();
    (async () => {
      try {
        const data = {
          expenseSets: await expenseSetsService.fetchAll({ userId: req.session.userId })
        }

        res.setHeader('Content-disposition', 'attachment; filename= expenses.json');
        res.setHeader('Content-type', 'application/json');
        res.send(data);
      } catch (error) {
        res.status(500);
        vm.error = error;
        res.render('pages/error/500.nunjucks', { vm });
      }
    })();
  },

  uploadJsonAction({ req, res, next }) {
    const vm = createVm();
    const tempPath = req.file.path;

    (async () => {
      try {
        const content = await fsAsync.readFile(tempPath, { encoding: 'utf8' });

        if (!jsonUtil.isValid(content)) {
          throw new Error('ERROR: user tried to upload a non json file');
        }

        const json = JSON.parse(content);

        if (!expenseSetsService.collectionValid(json)) {
          throw new Error('ERROR: user tried to upload json that is invalid');
        };

        await uploadJsonToDB({ expenseSets: json.expenseSets, req });

        res.redirect('/expenses');
      } catch (error) {
        res.status(500);
        vm.error = error;
        res.render('pages/error/500.nunjucks', { vm });
      }

      try {
        await fsAsync.unlink(tempPath);
      } catch (error) {
        logger.error(error);
      }
    })();
  }
};

async function uploadJsonToDB ({ expenseSets, req }) {
  try {
    return await Promise.all(expenseSets.map(async set => {
      const newSet = await expenseSetsService.create({
        name: set.name,
        description: set.description,
        totalYearly: set.totalYearly,
        userId: req.session.userId
      });

      await Promise.all(set.expenses.map(async expense => {
        const newExpense = await expensesService.create({
          name: expense.name,
          description: expense.description,
          totalYearly: expense.totalYearly,
          expenseSetId: newSet.id,
          userId: req.session.userId
        });

        await expenseSetsService.addToTotalYearly({
          expenseSetId: newSet.id,
          userId: req.session.userId,
          value: newExpense.totalYearly
        });
      }));
    }));
  } catch (error) {
    logger.error(error);
    throw error;
  }
}

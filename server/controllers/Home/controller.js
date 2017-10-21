const createObjectConstructorWithDefaults = require('../../utilities/createObjectConstructorWithDefaults');
const expenseSetsService = require('../../services/expenseSets.service');

const createVm = createObjectConstructorWithDefaults({ currentPage: 'HOME' });

module.exports = {
  indexPage({ req, res, next }) {
    const vm = createVm();
    (async () => {
      try {
        vm.expenseSetsTotal = await expenseSetsService.getTotalYearlyTotal({ userId: req.session.userId });

        res.render('pages/Home/index.nunjucks', { vm });
      } catch (error) {
        res.status(500);
        vm.error = error;
        res.render('pages/error/500.nunjucks', { vm });
      }
    })();
  }
};

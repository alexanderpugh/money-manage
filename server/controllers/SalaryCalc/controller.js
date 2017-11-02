const createFactory = require('../../utilities/createFactory');

const createVm = createFactory({ currentPage: 'SALARY_CALC' });

module.exports = {
  indexPage({ req, res, next }) {
    const vm = createVm();
    (async () => {
      try {
        res.render('pages/SalaryCalc/index.nunjucks', { vm });
      } catch (error) {
        res.status(500);
        vm.error = error;
        res.render('pages/error/500.nunjucks', { vm });
      }
    })();
  }
};

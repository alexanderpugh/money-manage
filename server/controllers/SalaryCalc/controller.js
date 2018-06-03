const usersService = require('../../services/users.service');
const createFactory = require('../../utilities/createFactory');

const createVm = createFactory({ currentPage: 'SALARY_CALC' });

module.exports = {
  indexPage({ req, res, next }) {
    const vm = createVm();
    (async () => {
      try {
        vm.salaryAssessment = await usersService.fetchSalaryAssessment({ userId: req.session.userId });
        res.render('pages/SalaryCalc/index.nunjucks', { vm });
      } catch (error) {
        res.status(500);
        vm.error = error;
        res.render('pages/error/500.nunjucks', { vm });
      }
    })();
  },

  updateSalaryAssessmentAction({ req, res, next, base }) {
    const vm = createVm();
    (async () => {
      try {

        if (!req.body.income) {
          throw new Error('ERROR: income is required');
        }

        const salaryAssessment = await usersService.fetchSalaryAssessment({ userId: req.session.userId });

        await usersService.updateSalaryAssessment({
          userId: req.session.userId,
          incomeYearly: req.body.income,
          assessmentId: salaryAssessment ? salaryAssessment.id : undefined
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

const usersService = require('../../services/users.service');
const createFactory = require('../../utilities/createFactory');

const createVm = createFactory({ currentPage: 'SETTINGS' });

module.exports = {
  indexPage({ req, res, next }) {
    const vm = createVm();
    (async () => {
      try {
        vm.userDetails = await usersService.getDetails({ userId: req.session.userId })
        vm.success = Boolean(req.query.success);

        res.render('pages/Settings/index.nunjucks', { vm });
      } catch (error) {
        res.status(500);
        vm.error = error;
        res.render('pages/error/500.nunjucks', { vm });
      }
    })();
  },

  updateSettingsAction({ req, res, next, base }) {
    const vm = createVm();
    (async () => {
      try {
        await usersService.updateDetails({
          userId: req.session.userId,
          firstName: req.body.firstname,
          lastName: req.body.lastname,
          dob: new Date(req.body.dob)
        });

        res.redirect(`${base}?success=1`);

      } catch (error) {
        res.status(500);
        vm.error = error;
        res.render('pages/error/500.nunjucks', { vm });
      }
    })();
  }
};

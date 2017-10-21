const usersService = require('../../services/users.service');
const createObjectConstructorWithDefaults = require('../../utilities/createObjectConstructorWithDefaults');

const createVm = createObjectConstructorWithDefaults({ currentPage: 'REGISTRATION' });

module.exports = {
  indexPage({ req, res, next }) {
    if (req.session.userId) {
      res.redirect('/');
      return;
    }

    const vm = createVm();

    if (req.query['signup-error']) {
      vm.signupError = req.query['signup-error'];
    } else if (req.query['login-error']) {
      vm.loginError = req.query['login-error'];
    }

    res.render('pages/Registration/index.nunjucks', { vm });
  },

  signoutAction({ req, res, next }) {
    req.session.destroy();
    res.redirect('/');
  },

  signupForm({ req, res, next, base }) {
    (async () => {
      try {
        const username = req.body.username;
        const password = req.body.password;

        const userExists = await usersService.userExists({ username });
        if (userExists) {
          res.redirect(`${base}?signup-error=user-exists`);
          return;
        }

        const insertedUser = await usersService.signup({ username, password });

        req.session.userId = insertedUser.id;
        res.redirect('/');
      } catch (error) {
        res.redirect(`${base}?signup-error=details-invalid`);
      }
    })();
  },

  loginForm({ req, res, next, base }) {
    (async () => {
      try {
        const username = req.body.username;
        const password = req.body.password;

        const searchedUser = await usersService.login({ username, password });

        req.session.userId = searchedUser.id;
        res.redirect('/');
      } catch (error) {
        res.redirect(`${base}?login-error=details-invalid`);
      }
    })();
  }
};

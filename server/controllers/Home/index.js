const express = require('express');

const controller = require('./controller');
const { single } = require('../../config/fileUpload');

const router = express.Router();

router.get('/', (req, res, next) => {
  controller.indexPage({ req, res, next });
});

router.get('/download-data', (req, res, next) => {
  controller.downloadJsonAction({ req, res, next });
});

router.post('/upload-data', single, (req, res, next) => {
  controller.uploadJsonAction({ req, res, next });
})

module.exports = {
  base: '/',
  router
};

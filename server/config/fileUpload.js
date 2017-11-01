const multer  = require('multer');
const path = require('path');

const upload = multer({ dest: path.resolve(__dirname, '../uploads/') });

module.exports = {
  single: upload.single('upload')
};

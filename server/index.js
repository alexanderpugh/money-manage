require('./config/jsExtensions');
const app = require('./app');

const port = 3000;

app.listen(port);
console.log(`Listening at port ${port}`);

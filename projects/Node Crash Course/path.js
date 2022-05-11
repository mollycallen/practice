const path = require('path');

const fileLocation = path.join(__dirname, '.app.js');
const fileName = path.basename(fileLocation);
console.log(path.extname(fileName));
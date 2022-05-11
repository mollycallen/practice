const url = require('url');
const address = 'https://www.youtube.com/watch?v=zQRrXTSkvfw&t=426s';

const parsedUrl = url.parse(address, true);
console.log(parsedUrl.host);
console.log(parsedUrl.host);
console.log(parsedUrl.query);


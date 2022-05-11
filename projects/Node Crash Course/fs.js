const fs = require('fs');

// fs.writeFile('message.txt', 'Hello there node', (err) => {
//     if (err) throw err;
//     console.log('file has been written');
// })
// console.log('end');

fs.readFile('./message.txt', 'utf-8', (err, data) => {
    if (err) throw err;
    console.log(data);
});

console.log('end');
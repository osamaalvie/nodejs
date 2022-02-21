const fs = require('fs');
const readStream = fs.createReadStream('./data.txt', {encoding : 'utf8'});
const writeStream = fs.createWriteStream('./data2.txt');

// readStream.on('data', (chunk) => {
//     console.log('------ NEW CHUNK ------');
//     console.log(chunk);
//     console.log('\nNEW CHUNK\n');
//     writeStream.write(chunk);
// });

readStream.pipe(writeStream);
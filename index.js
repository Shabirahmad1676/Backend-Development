const app = require('fs')
console.log("->",__dirname);
console.log("->>",__filename);

console.log(app.writeFileSync('hello.txt','Shabir'))
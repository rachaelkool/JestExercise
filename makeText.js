/** Command-line tool to generate Markov text. */

const fs = require('fs');
const markov = require('./markov');
const axios = require('axios');
const process = require('process');


function makeText(path) {
    fs.readFile(path, 'utf8', function (err, data) {
      if (err) {
        console.log('ERROR:', err);
        process.exit(1)
      } else {
        let mm = new markov.MarkovMachine(data);
        console.log(mm.makeText());  
      }    
    });
}
  

async function makeURLText(url) {
    try {
        let res = await axios.get(url);
        let mm = new markov.MarkovMachine(res.data);
        console.log(mm.makeText()); 
    } catch (err) {
        console.log('ERROR:', err);
        process.exit(1)
    } 
}

let path = process.argv[3];

if (path.slice(0, 4) !== 'http') {
    makeText(path)
} else if (path.slice(0, 4) !== 'file') {
    makeURLText(path)
} else { 
    console.log('ERROR');
    process.exit(1)
}
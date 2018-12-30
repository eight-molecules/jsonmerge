'use strict'
let util = require('util');

let merge = require('./merge.js');
let openJson = require('./openJson.js');

let args = process.argv.slice(2);

doMerge(args).then((result) => {
  console.log(util.inspect(result, { depth: null }));
}).catch((err) =>  {
  console.error(err);
});

async function doMerge(args) {
  return new Promise((resolve, reject) => {
    if (args.length === 2) {
      // Default to a shallow merge using the spread operator
      let object1 = await openJson(args[0]);
      let object2 = await openJson(args[1]);
      
      let merged = merge.shallow(object1, object2);
      resolve(merged);
    } else if (args.length === 3) {
      // Merge two files with a merge type specified.
      let mergeType = args[0].toString().toLowerCase();
      let object1 = openJson(args[1]);
      let object2 = openJson(args[2]);

      if (mergeType === 'shallow') {
        // Shallow merge with default spread behavior
        let merged = merge.shallow(object1, object2);
        resolve(merged);
      } else if (mergeType === 'deep') {
        let merged = merge.deep(object1, object2);
        resolve(merged);
      } else {
        reject('The first parameter must be the merge type of either "shallow" or "deep".');
      }

    } else if (args.length === 4) {
      // Merge two files with a shallow merge using the specified merge method.
      let mergeType = args[0].toString().toLowerCase();
      let mergeMethod = args[1].toString().toLowerCase();
      let object1 = openJson(args[2]);
      let object2 = openJson(args[3]);

      if (mergeType === 'shallow') {
        let merged = merge.shallow(object1, object2, mergeMethod);
        resolve(merged);
      } else {
        reject('Only a shallow merge can have a merge method parameter.');
      }
    }

    reject('Too many arguments supplied. This merge utility isn\'t perfect!');
  });
}

module.exports = doMerge;

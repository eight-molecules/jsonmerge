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
  let object1 = await openJson(args[args.length - 2]);
  let object2 = await openJson(args[args.length - 1]);

  return new Promise((resolve, reject) => {
    let shallowCallback = (err, result) => {
      if (err) {
        return reject(err);
      }
  
      return resolve(result);
    };

    let deepCallback = (result) => {
      return resolve(result);
    }
    
    if (args.length === 2) {
      // Default to a shallow merge using the spread operator
      merge.shallow(object1, object2, shallowCallback);
    } else if (args.length === 3) {
      // Merge two files with a merge type specified.
      let mergeType = args[0].toString().toLowerCase();

      if (mergeType === 'shallow') {
        // Shallow merge with default spread behavior
        merge.shallow(object1, object2, shallowCallback);
      } else if (mergeType === 'deep') {
        merge.deep(object1, object2, deepCallback);
      } else {
        reject('The first parameter must be the merge type of either "shallow" or "deep".');
      }

    } else if (args.length === 4) {
      // Merge two files with a shallow merge using the specified merge method.
      let mergeType = args[0].toString().toLowerCase();
      let mergeMethod = args[1].toString().toLowerCase();

      if (mergeType === 'shallow') {
        merge.shallow(object1, object2, mergeMethod, shallowCallback);
      } else {
        reject('Only a shallow merge can have a merge method parameter.');
      }
    }

    reject('Too many arguments supplied. This merge utility isn\'t perfect!');
  });
}

module.exports = doMerge;

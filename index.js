'use strict'
let util = require('util');
let yargs = require('yargs');

let merge = require('./merge.js');
let jsonHelper = require('./json.helper.js');

let mergeMethod = yargs.argv.m || 'shallow';
let mergeType = yargs.argv.t || 'spread';
let outputFile = yargs.argv.o;
let inputFiles = yargs.argv._;


doMerge(mergeMethod, mergeType, inputFiles).then((result) => {
  if (outputFile) {
    jsonHelper.writeJson(result, outputFile);
  }

  console.log(util.inspect(result, { depth: null }));
}).catch((err) =>  {
  console.error(err);
});

async function doMerge(mergeMethod, mergeType, inputFiles) {
  let inputJsonPromises = inputFiles.map((fileName) => {
    return jsonHelper.openJson(fileName);
  });

  let objects = await Promise.all(inputJsonPromises);

  return new Promise((resolve, reject) => {
    var result = {};

    if (mergeMethod === 'deep') {
      objects.forEach((obj) => {
        merge.deep(result, obj, (mergeResult) => {
          result = mergeResult;
        });
      });
    } else {
      objects.forEach((obj) => {
        merge.shallow(result, obj, mergeType, (err, mergeResult) => {
          if (err) {
            reject(err);
          }

          result = mergeResult;
        });
      });
    }

    resolve(result);
  });
}

module.exports = doMerge;

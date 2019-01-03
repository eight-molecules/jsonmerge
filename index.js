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

  return Promise.all(inputJsonPromises).then((objects) => {
    if (mergeMethod === 'deep') {
      return merge.all.deep(objects);
    } else {
      return merge.all.shallow(objects);
    }
  });
}

module.exports = doMerge;

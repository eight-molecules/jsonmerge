'use strict'

const fs = require('fs');
const path = require('path');

function openJson(filePath) {
  return new Promise((resolve, reject) => {
    try {
      let absolutePath = require.resolve(filePath);
      fs.readFile(absolutePath, (err, data) => {
        if (err) {
          return reject(err);
        }

        let json = JSON.parse(data);
        resolve(json);
      });
    } catch (err) {
      reject(err);
    }
  });
}

function writeJson(obj, filePath) {
  let json = JSON.stringify(obj);
  let directoryPath = path.dirname(filePath);

  const write = (json, filePath) => {
    return new Promise((resolve, reject) => {
      fs.writeFile(filePath, json, (err) => {
        if (err) {
          reject(err);
        }

        resolve();
      });
    });
  };

  const createDirectories = (directoryPath) => {
    return new Promise((resolve, reject) => {
      fs.mkdir(directoryPath, {recursive: true}, (err) => {
        if (err) {
          return reject(err);
        }
        
        resolve();
      });
    });
  };

  return createDirectories(directoryPath).then(() => {
    return write(json, filePath);
  });
}

module.exports = {
  openJson: openJson,
  writeJson: writeJson
}
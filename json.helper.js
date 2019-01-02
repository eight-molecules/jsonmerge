const fs = require('fs');

function openJson(path) {
  return new Promise((resolve, reject) => {
    try {
      let absolutePath = require.resolve(path);
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

function writeJson(obj, path) {
  let json = JSON.stringify(obj);
  return new Promise((resolve, reject) => {
    fs.writeFile(path, json, (err) => {
      if (err) {
        reject(err);
      }

      resolve();
    });
  });
}

module.exports = {
  openJson: openJson,
  writeJson: writeJson
}
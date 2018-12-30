const fs = require('fs');

module.exports = function(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(require.resolve(path), (err, data) => {
      if (err) {
        reject(err);
      }

      let json = JSON.parse(data);
      resolve(json);
    });
  });
}
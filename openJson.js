const fs = require('fs');

module.exports = function(path) {
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
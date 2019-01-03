'use strict'

const path = require('path');
const fs = require('fs');

const jsonHelper = require('../json.helper.js');

describe('writeJson', () => {
  let directoryPath = __dirname + '/data/test';
  let filePath = directoryPath + '/testFile.json';

  afterEach(() => {
    const fsCallback = (err, callback) => {
        if (err) {
          console.error(err);
          return;
        }

        callback();
    };

    fs.unlink(filePath, (err) => { 
      fsCallback(err, () => {
        fs.rmdir(directoryPath, (err) => fsCallback(err, () => { }));
      });
    });
  });

  it('should write the given object to the given path.', () => {
    return new Promise((resolve) => {
      let objectToWrite = {
        test: "testString",
        someKey: {
          withNesting: true
        }
      };
  
      jsonHelper.writeJson(objectToWrite, filePath).then(() => {
        return fs.access(filePath, (err) => {
          expect(err).toBeFalsy();
          resolve();
        });
      });
    });
  });
});

describe('openJson', () => {
  it('should open the specified json.', async () => {
    let expectedResult = {
      levelOneKeyOne: {
        levelTwoKeyOne: {
          keyOne: 'string',
          keyTwo: 2
        }
      },
      levelOneKeyTwo: {
        levelTwoKeyOne: null,
        levelTwoKeyTwo: {
          keyOne: false,
          keyTwo: null,
          levelThreeKeyOne: {
            keyOne: 'string'
          }
        }
      },
      levelOneKeyThree: 2
    };

    let result = await jsonHelper.openJson(path.resolve(__dirname + '/data', 'fileOne.json'));

    expect(result).not.toBeNull();
    expect(result).toEqual(expectedResult);
  });

  it('should open the specified json.', async () => {
    var caughtError = null;
    var result = null;
    try {
      result = await jsonHelper.openJson('/nonexistant/path/to/a/nonexistant/file.json');
    } catch (e) {
      caughtError = e;
    }

    expect(caughtError).not.toBeNull();
    expect(result).toBeNull();
  });
});
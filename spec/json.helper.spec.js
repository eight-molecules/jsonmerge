const path = require('path');
const fs = require('fs');

const jsonHelper = require('../json.helper.js');

describe('writeJson', () => {
  it('should write the given object to the given path.', () => {
    let path = __dirname + '/data/testFile.json';
    let objectToWrite = {
      test: "testString",
      someKey: {
        withNesting: true
      }
    };

    jsonHelper.writeJson(objectToWrite, path).then(() => {
      fs.access(path, (err) => {
        expect(err).toBeFalsy();
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
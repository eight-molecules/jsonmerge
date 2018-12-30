const path = require('path');
const openJson = require('../openJson.js');

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

    let result = await openJson(path.resolve(__dirname + '/data', 'fileOne.json'));

    expect(result).not.toBeNull();
    expect(result).toEqual(expectedResult);
  });

  it('should open the specified json.', async () => {
    var caughtError = null;
    var result = null;
    try {
      result = await openJson('/nonexistant/path/to/a/nonexistant/file.json');
    } catch (e) {
      caughtError = e;
    }

    expect(caughtError).not.toBeNull();
    expect(result).toBeNull();
  });
});
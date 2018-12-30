const path = require('path');
const openJson = require('../openJson.js');

describe('openJson', () => {
  it('should open the specified json.', () => {
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

    openJson(path.resolve(__dirname + '/data', 'fileOne.json')).then((json) => {
      expect(json).toEqual(expectedResult);
    });
  });
});
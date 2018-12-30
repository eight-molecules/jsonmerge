const path = require('path');
const openJson = require('../openJson.js');

describe('openJson', () => {
  it('should open the specified json.', async () => {
    let json = await openJson(path.resolve(__dirname + '/data', 'fileOne.json'));
    
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

    expect(json).toEqual(expectedResult);
  });
});
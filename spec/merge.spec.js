const merge = require('../merge.js');

describe('shallow', () => {
  describe('default (spread)', () => {
    it('merges two unique objects', () => {
      let obj1 = {
        uniqueKeyOne: '1',
        uniqueKeyTwo: 2
      }

      let obj2 = {
        uniqueKeyThree: true,
        uniqueKeyFour: null
      }

      let expectedResult = {
        uniqueKeyOne: '1',
        uniqueKeyTwo: 2,
        uniqueKeyThree: true,
        uniqueKeyFour: null
      }

      merge.shallow(obj1, obj2, null, (err, result) => {
        expect(result).toEqual(expectedResult);
      });
    });

    it('merges two unique objects with duplicate keys by keeping the last key', () => {
      let obj1 = {
        uniqueKeyOne: '1',
        uniqueKeyTwo: 2
      }

      let obj2 = {
        uniqueKeyTwo: true,
        uniqueKeyThree: null
      }

      let expectedResult = {
        uniqueKeyOne: '1',
        uniqueKeyTwo: true,
        uniqueKeyThree: null,
      }

      merge.shallow(obj1, obj2, (err, result) => {
        expect(result).toEqual(expectedResult);
      });
    });

    it('merges two unique objects with deep objects to only keep the last value of the top level properties.', () => {
      let obj1 = {
        levelOneKeyOne: {
          levelTwoKeyOne: {
            keyOne: '1',
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
      }

      let obj2 = {
        levelOneKeyOne: {
          levelTwoKeyOne: {
            keyThree: true,
            keyFour: null
          }
        },
        levelOneKeyTwo: {
          levelTwoKeyOne: 'string',
          levelTwoKeyTwo: {
            keyThree: true,
            keyFour: 'string'
          }
        },
        levelOneKeyFour: 'string'
      }

      let expectedResult = {
        levelOneKeyOne: {
          levelTwoKeyOne: {
            keyThree: true,
            keyFour: null
          }
        },
        levelOneKeyTwo: {
          levelTwoKeyOne: 'string',
          levelTwoKeyTwo: {
            keyThree: true,
            keyFour: 'string'
          }
        },
        levelOneKeyThree: 2,
        levelOneKeyFour: 'string'
      }

      merge.shallow(obj1, obj2, (err, result) => {
        expect(result).toEqual(expectedResult);
      });
    });
  });

  describe('shallow with assign', () => {
    it('merges two unique objects', () => {
      let obj1 = {
        uniqueKeyOne: '1',
        uniqueKeyTwo: 2
      }

      let obj2 = {
        uniqueKeyThree: true,
        uniqueKeyFour: null
      }

      let expectedResult = {
        uniqueKeyOne: '1',
        uniqueKeyTwo: 2,
        uniqueKeyThree: true,
        uniqueKeyFour: null
      }

      merge.shallow(obj1, obj2, 'assign', (err, result) => {
        expect(result).toEqual(expectedResult);
      });
    });

    it('merges two unique objects with duplicate keys by keeping the last key', () => {
      let obj1 = {
        uniqueKeyOne: '1',
        uniqueKeyTwo: 2
      }

      let obj2 = {
        uniqueKeyTwo: true,
        uniqueKeyThree: null
      }

      let expectedResult = {
        uniqueKeyOne: '1',
        uniqueKeyTwo: true,
        uniqueKeyThree: null,
      }

      merge.shallow(obj1, obj2, 'assign', (err, result) => {
        expect(result).toEqual(expectedResult);
      });
    });

    it('merges two unique objects with deep objects to only keep the last value of the top level properties.', () => {
      let obj1 = {
        levelOneKeyOne: {
          levelTwoKeyOne: {
            keyOne: '1',
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
      }

      let obj2 = {
        levelOneKeyOne: {
          levelTwoKeyOne: {
            keyThree: true,
            keyFour: null
          }
        },
        levelOneKeyTwo: {
          levelTwoKeyOne: 'string',
          levelTwoKeyTwo: {
            keyThree: true,
            keyFour: 'string'
          }
        },
        levelOneKeyFour: 'string'
      }

      let expectedResult = {
        levelOneKeyOne: {
          levelTwoKeyOne: {
            keyThree: true,
            keyFour: null
          }
        },
        levelOneKeyTwo: {
          levelTwoKeyOne: 'string',
          levelTwoKeyTwo: {
            keyThree: true,
            keyFour: 'string'
          }
        },
        levelOneKeyThree: 2,
        levelOneKeyFour: 'string'
      }

      merge.shallow(obj1, obj2, 'assign', (err, result) => {
        expect(result).toEqual(expectedResult);
      });
    });
  });
  
  describe('shallow with loop', () => {
    it('merges two unique objects', () => {
      let obj1 = {
        uniqueKeyOne: '1',
        uniqueKeyTwo: 2
      }

      let obj2 = {
        uniqueKeyThree: true,
        uniqueKeyFour: null
      }

      let expectedResult = {
        uniqueKeyOne: '1',
        uniqueKeyTwo: 2,
        uniqueKeyThree: true,
        uniqueKeyFour: null
      }

      merge.shallow(obj1, obj2, 'loop', (err, result) => {
        expect(result).toEqual(expectedResult);
      });
    });

    it('merges two unique objects with duplicate keys by keeping the last key', () => {
      let obj1 = {
        uniqueKeyOne: '1',
        uniqueKeyTwo: 2
      }

      let obj2 = {
        uniqueKeyTwo: true,
        uniqueKeyThree: null
      }

      let expectedResult = {
        uniqueKeyOne: '1',
        uniqueKeyTwo: true,
        uniqueKeyThree: null,
      }

      merge.shallow(obj1, obj2, 'loop', (err, result) => {
        expect(result).toEqual(expectedResult);
      });
    });

    it('merges two unique objects with deep objects to only keep the last value of the top level properties.', () => {
      let obj1 = {
        levelOneKeyOne: {
          levelTwoKeyOne: {
            keyOne: '1',
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
      }

      let obj2 = {
        levelOneKeyOne: {
          levelTwoKeyOne: {
            keyThree: true,
            keyFour: null
          }
        },
        levelOneKeyTwo: {
          levelTwoKeyOne: 'string',
          levelTwoKeyTwo: {
            keyThree: true,
            keyFour: 'string'
          }
        },
        levelOneKeyFour: 'string'
      }

      let expectedResult = {
        levelOneKeyOne: {
          levelTwoKeyOne: {
            keyThree: true,
            keyFour: null
          }
        },
        levelOneKeyTwo: {
          levelTwoKeyOne: 'string',
          levelTwoKeyTwo: {
            keyThree: true,
            keyFour: 'string'
          }
        },
        levelOneKeyThree: 2,
        levelOneKeyFour: 'string'
      }

      merge.shallow(obj1, obj2, 'loop', (err, result) => {
        expect(result).toEqual(expectedResult);
      });
    });
  });
});

describe('deep', () => {
  it('should deep clone two unique objects', () => {
    let obj1 = {
      levelOneKeyOne: {
        levelTwoKeyOne: {
          keyOne: '1',
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
    }

    let obj2 = {
      levelOneKeyOne: {
        levelTwoKeyOne: {
          keyThree: true,
          keyFour: null
        }
      },
      levelOneKeyTwo: {
        levelTwoKeyOne: 'string',
        levelTwoKeyTwo: {
          keyThree: true,
          keyFour: 'string'
        }
      },
      levelOneKeyFour: 'string'
    }

    let expectedResult = {
      levelOneKeyOne: {
        levelTwoKeyOne: {
          keyOne: '1',
          keyTwo: 2,
          keyThree: true,
          keyFour: null
        }
      },
      levelOneKeyTwo: {
        levelTwoKeyOne: 'string',
        levelTwoKeyTwo: {
          levelThreeKeyOne: {
            keyOne: 'string'
          },
          keyOne: false,
          keyTwo: null,
          keyThree: true,
          keyFour: 'string'
        }
      },
      levelOneKeyThree: 2,
      levelOneKeyFour: 'string'
    }

    merge.deep(obj1, obj2, (result) => {
      expect(result).toEqual(expectedResult);
    });
  });
});
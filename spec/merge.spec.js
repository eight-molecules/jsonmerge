'use strict'

const merge = require('../lib/merge.js');

describe('shallow', () => {
  describe('with an invalid merge method string', () => {
    it('should return an error in the callback', () => {
      let obj1 = {
        uniqueKeyOne: '1',
        uniqueKeyTwo: 2
      }

      let obj2 = {
        uniqueKeyThree: true,
        uniqueKeyFour: null
      }

      merge.shallow(obj1, obj2, 'not-a-merge-method', (err, result) => {
        expect(err).toBeDefined();
        expect(result).toBeNull();
      });
    });
  });

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

      merge.shallow(obj1, obj2, (err, result) => {
        expect(result).toEqual(expectedResult);
      });
    });

    it('merges two unique objects when given a null merge method', () => {
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
    
    it('merges two unique objects when given a non-string merge method', () => {
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

      merge.shallow(obj1, obj2, {}, (err, result) => {
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
  describe('given a primitive and an object', () => {
    it('should return a clone of the second object.', () => {
      let object1 = 1;
      let object2 = {
        keyOne: 1
      };

      merge.deep(object1, object2, (result) => {
        expect(result).toEqual(object2);
      });
    });
  });

  describe('given two primitives', () => {
    it('should return a clone of the second object.', () => {
      let object1 = 1;
      let object2 = 'string'

      merge.deep(object1, object2, (result) => {
        expect(result).toEqual(object2);
      });
    });
  });

  describe('given two objects', () => {
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
        levelOneKeyThree: {
          levelTwoKeyOne: 'string'
        },
        levelOneKeyFour: 'string'
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
        levelOneKeyThree: 2,
        levelOneKeyFive: null
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
        levelOneKeyFour: 'string',
        levelOneKeyFive: null
      }

      merge.deep(obj1, obj2, (result) => {
        expect(result).toEqual(expectedResult);
      });
    });
  });
});

describe('all', () => {
  describe('shallow', () => {
    it('should merge all objects given', () => {
      let objects = [{ keyOne: 1 }, { keyTwo: 'two', keyThree: false }, { keyThree: null }];
      let expectedResult = {
        keyOne: 1,
        keyTwo: 'two',
        keyThree: null
      };
      
      return merge.all.shallow(objects, 'spread').then((mergedResult) => {
        expect(mergedResult).toEqual(expectedResult);
      });
    });

    it('should return an empty object when nothing is passed', () => {
      let objects = [];
      let expectedResult = { };
      
      return merge.all.shallow(objects, 'spread').then((mergedResult) => {
        expect(mergedResult).toEqual(expectedResult);
      });
    });
  });

  describe('deep', () => {
    it('should merge all objects given', () => {
      let objects = [
        {
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
          levelOneKeyThree: {
            levelTwoKeyOne: 'string'
          },
          levelOneKeyFour: 'string'
        },

        {
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
          levelOneKeyThree: false,
          levelOneKeyFive: null
        },
        {
          levelOneKeyTwo: {
            levelTwoKeyOne: 'string',
            levelTwoKeyTwo: {
              keyFive: true,
              keySix: 'string'
            }
          },
          levelOneKeyFour: 2,
          levelOneKeyFive: {
            levelTwoKeyOne: null
          }
        }
      ];

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
            keyFour: 'string',
            keyFive: true,
            keySix: 'string'
          }
        },
        levelOneKeyThree: false,
        levelOneKeyFour: 2,
        levelOneKeyFive: {
          levelTwoKeyOne: null
        }
      };
      
      return merge.all.deep(objects).then((mergedResult) => {
        expect(mergedResult).toEqual(expectedResult);
      });
    });

    it('should return an empty object when given nothing to merge.', () => {
      let objects = [];
      let expectedResult = {};
      
      return merge.all.deep(objects).then((mergedResult) => {
        expect(mergedResult).toEqual(expectedResult);
      });
    });
  });
});
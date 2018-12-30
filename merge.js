'use strict'

module.exports = {};

module.exports.shallow = function shallow(object1, object2) {
  let mergeType = (arguments.length === 4 && typeof arguments[arguments.length - 2] === 'string') ? arguments[arguments.length - 2] : 'spread';
  let callback = arguments[arguments.length - 1];

  const spreadMerge = (obj1, obj2) => {
    let result = {
      ...obj1,
      ...obj2
    };

    return result;
  }

  const assignMerge = (obj1, obj2) => {
    let result = Object.assign({}, obj1, obj2);

    return result;
  }

  const loopMerge = (obj1, obj2) => {
    var result = {};

    Object.keys(obj1).forEach((key) => {
      result[key] = object1[key];
    });
    
    Object.keys(obj2).forEach((key) => {
      result[key] = object2[key];
    });

    return result;
  }

  if (mergeType === 'spread') {
    let result = spreadMerge(object1, object2);
    callback(null, result);
  } else if (mergeType === 'assign') {
    let result = assignMerge(object1, object2);
    callback(null, result)
  } else if (mergeType === 'loop') {
    let result = loopMerge(object1, object2);
    callback(null, result);
  } else {
    if (typeof mergeType === string) {
      callback('No merge type ' + mergeType + ' is available.', null);
    } else {
      callback('Merge type must be "spread", "assign", or "default".', null);
    }
  }
};

module.exports.deep = function deep(object1, object2, callback) {
  const isMergeable = (obj) => {
    return !!obj && typeof obj === 'object';
  }

  const clone = (obj, callback) => {
    if(isMergeable(obj)) {
      deep({}, obj, (result) => {
        callback(result);
      });
    } else {
      callback(obj);
    }
  };

  const merge = (obj1, obj2, callback) => {
    var result = {};

    if (isMergeable(obj1)) {
      Object.keys(obj1).forEach((key) => {
        clone(obj1[key], (cloneResult) => {
          result[key] = cloneResult;
        });
      });
    }

    Object.keys(obj2).forEach((key) => {
      if (!isMergeable(obj2[key]) || !obj1[key]) {
        clone(obj2[key], (cloneResult) => {
          result[key] = cloneResult;
        });
      } else {
        deep(obj1[key], obj2[key], (mergeResult) => {
          result[key] = mergeResult;
        });
      }
    });

    callback(result);
  }

  if (typeof object1 === typeof object2) {
    merge(object1, object2, (result) => {
      callback(result);
    });
  } else {
    clone(object2, (result) => {
      callback(result);
    });
  }
};

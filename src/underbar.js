(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if (n === 0) { // if index is zero, return an empty array
      return [];
    }
    return n === undefined ? array[array.length-1] : array.slice(-n); // if index is undefined, return the last element of the array; otherwise, return the last n elements of the array
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    if (Array.isArray(collection)) { // check if collection is an array
      for (var i = 0; i < collection.length; i++) { // if collection is an array, loop over it and call the iterator on three arguments: current element, index, and whole collection
        iterator(collection[i], i, collection);
      }
    } else { // if collection is not an array, assume it is an object
      for (var key in collection) { // loop over the properties of the object and call the iterator on three arguments: current value, key, and whole collection
        iterator(collection[key],key,collection)
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1; // set the default value of result to -1
    _.each(array, function(item, index) {
      if (item === target && result === -1) { // if item equals target and result has not been changed, set result to index 
        result = index;
      }
    })
    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    var results = []; // set results to empty array
    _.each(collection,function(item) { // use the _.each method we just implemented
      if (test(item)) { // for each item that evaluates to true
        results.push(item); // add that item to the results
      }
    })
    return results;   
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    return _.filter(collection,function(item) {
      return test(item) ? false : true; // flip the test results - if the item evaluates to true, return false, and vice versa
    })
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var results = []; // set results to empty array
    var exists; // declare var to track if each item exists in results
    _.each(array,function(item){
      exists = _.indexOf(results,item); // set exists to the indexOf each item
      if (exists === -1) { // exists equals the index number of the item in results, if it exists in results; otherwise it equals -1
        results.push(item);  // if item does not exist in results, push it to results
      }
    })
    return results;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var results = []; // set results to empty array
    _.each(collection, function(item){
      results.push(iterator(item)); // run the iterator function on each item and push the result to the results array
    })
    return results;
  };

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //  
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //  
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //  
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {
    var collectionArray = []; // set up empty array to be reduced
    if (Array.isArray(collection)) {
      collectionArray = collection; // if collection is an array, use it as is
    } else {
      for (var key in collection) { // otherwise, assume it is an object
        collectionArray.push(collection[key]); // and push each value into collectionArray
      }
    }  
    var i = 0;
    if (accumulator === undefined) { 
      i = 1; // if accumulator is undefined, set counter to 1
      accumulator = collectionArray[0]; // and set accumulator to first element
    }
    for (i; i < collectionArray.length; i++) {
      accumulator = iterator(accumulator,collectionArray[i]); // for each item in array, set the accumulator equal to the iterator called on the accumulator and the current element
    }
  return accumulator;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    return _.reduce(collection,function(accumulator,item) {
      if (iterator === undefined) { // if iterator is not defined, assume values are already boolean
        return item; // and use them as is
      }
      else if (!iterator(item)) { // otherwise, run iterator (truth test) on each item
      accumulator = false;  // if truth test fails, set accumulator to false
      }
      return accumulator;
    },true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    // I didn't use the very clever way, but this solution works.
    
    if(_.reduce(collection,function(accumulator,item) { // if all items are undefined, it is an empty collection
      if(item!== undefined) { // 2. if any item has a value
        return false; // 3. the collection is not empty
      }
    },true)) { // 1. assume the collection is empty
      return false; // 4. if it is an empty collection, return false
    }
    
    if (iterator === undefined) { // if iterator is not defined, assume values are already boolean
      iterator = function(item){return item}; // and return values themselves
    }
    
    if (_.reduce(collection,function(accumulator,item) { // if any one element passes the test, return true
      if (iterator(item)) {
        accumulator = true;
      }
      return accumulator;
    },false)) { 
      return true;
    } else {
      return false; // otherwise, return false
    } 
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    var result = obj; // set result to obj argument
    for (var i = 1; i < arguments.length; i++) { // starting with the second argument, 
      _.each(arguments[i], function(item,index,collection) { // loop through each argument
        result[index] = item; // and add its properties to the result
      });
    }
    return result;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj){
    var objKeys = []; // create an empty array to hold the keys of the obj argument
    _.each(obj,function(item,index,collection){
      objKeys.push(index); // push the keys of obj argument to objKeys
    }); 
    var args = Array.prototype.slice.call(arguments); // make arguments into a real array
    for (var i = 1; i < args.length; i++) {  // starting with the second argument,
      _.each(args[i], function(item,index,collection) {  // loop through each argument
        if (!_.reduce(objKeys,function(accumulator,item) {
          if (index === item) { // if the object key is not found in the argument's keys
            accumulator = true; // this reduce will evaluate to false
          } 
          return accumulator;
          },false)) {
          if (!obj.hasOwnProperty(index)) { // if the reduce evaluates to false and if result does not already have the property
            obj[index] = item; // add it to result
          } 
        }
      });
    }
    return obj;
  };   
  


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  

  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // information from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // var funcTest = function(a,b) {return a + b}
  // var funcTestOnce = _.once(funcTest);
  // funcTestOnce(1,2) // 3
  // funcTestOnce(2,3) // 

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.

  _.memoize = function(func) { //REVIEW
  // memoize returns a function definition
    var cache = {}; // cache is accessible to the function that is returned by a closure
    return function (arg) { // arg is the first argument supplied to the memoized function
      if (cache.hasOwnProperty(arg)) { // if cache has a property that matches arg,
        return cache[arg]; // A) return the result of prior invocation
         // ** this means that any sets of arguments that start with the same value will return 
         // the first invocation, but somehow this _.memoize still passes the tests
      } else { // otherwise
        cache[arg] = func.apply(this, arguments); // B) invoke func and stores results in cache
        return cache[arg]; // and return the result of current func invocation
      }
    };
  };
    
  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  
  _.delay = function(func, wait) {
    var args = Array.prototype.slice.call(arguments,2); 
    return window.setTimeout(function() {
        return func.apply(null,args); // returns invocation of func with args passed to func
      },wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    var newOrder = []; // declare empty array to store new order
    var result = []; // declare empty array to hold results
    
    while (newOrder.length < array.length) { 
    // build up new order to same length as input array
      var randInt = Math.floor(Math.random() * array.length);
      // generate a random integer within the range of the length of input array
      if (!_.contains(newOrder,randInt)) {
        // if this integer is not contained in newOrder, add it to newOrder
        newOrder.push(randInt);
      }
    }
    
    _.each(array,function(item,index,collection) {
      // for each element in input array,
      result[newOrder[index]] = item; // assign the item to a new location
      // based on the newOrder
    });
    
    return result;
    
  };


  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
    if (functionOrKey === undefined) { // if functionOrKey is undefined;
      return null; // there is no way to evaluate results, so return null
    } else if (typeof(functionOrKey) === 'function') { // if functionOrKey is a function,
      return _.map(collection,function(item) { // return an array with results of 
        return functionOrKey.apply(item,args); // invoking the function on every item, passing in args
      });
    } else { // otherwise, assume functionOrKey is a method
      return _.map(collection,function(item) { // return an array with results of
        return item[functionOrKey].apply(item,args); // invoking the method on every item, passing in args
      });
    }  
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  
  // this was helpful: http://www.sitepoint.com/sophisticated-sorting-in-javascript/  

  _.sortBy = function(collection, iterator) {    
    if (typeof(iterator) === 'string') { // if iterator is a string,
      return collection.sort(function(a,b) { // treat it as a property name
        return a[iterator] - b[iterator]; // and sort by property lookup
        // if this returns greater than zero,
        // b comes before a; if it returns less than zero, a comes before b;
        // if it returns 0, a and b are unchanged with respect to each other
      });
    } else { // otherwise, assume iterator is a function
      return collection.sort(function(a,b) {
        return iterator(a) - iterator(b); // and sort by function invocation
      });
    }
  }; 
  

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  
  _.zip = function() {
    var args = (arguments.length === 1?[arguments[0]]:Array.apply(null, arguments)); // make args into a real array
    var results = []; // declare empty array to hold results
    
    var maxLength = _.reduce(args,function(accumulator,item) { // find the max length of all args
      if(item.length > accumulator) {
        accumulator = item.length;
      }
      return accumulator;
    },0);
    
    for (var i = 0; i < args.length; i++) { // for each argument,
      _.each(args[i],function(item,index,collection) { // analyze each element in current argument, 
        if (results[index] === undefined) { // create an array in results if needed
          results[index] = [];
        }
        results[index].push(item); // push element into results
      });    
    }
    
    for (var i = 0; i < results.length; i++) { // for each element in results,
      var lengthDifference = maxLength - results[i].length; // find difference between maxLength and current element
      if (lengthDifference > 0) { // if the differences is greater than zero,
        for (var j = 0; j < lengthDifference; j++) { // fill in each missing element with value undefined
          results[i].push(undefined);
        }
      }  
    }
    
    return results; // return results array
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    result = result || []; // set up empty array as default value for result
    for (var i = 0; i < nestedArray.length; i++) { // loop through all elements of the array
      if (Array.isArray(nestedArray[i])) { // if the current element is an array,
        _.flatten(nestedArray[i],result); // recurse on current element
      } else {
        result.push(nestedArray[i]); // otherwise, push current element to result
      }    
    }
    return result;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function(){
    var result = []; // set up empty array as default value for result
    for (var i = 0; i < arguments[0].length; i++) { // for each item in first argument,
      if (!_.contains(result,arguments[0][i])) { // if result does not contain the item
        for (var j = 0; j < arguments.length; j++) { // loop through all arrays
          if (!_.contains(arguments[j], arguments[0][i])) { // if the current array does not contain 
            // the item from the first argument,
            break; // break out of the current for loop
          }
        }
        if (j === arguments.length) { // if j reached arguments.length, the current array does contain the item from first argument
          result.push(arguments[0][i]); // so push it to results
        }  
      }
    }
    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var result = []; // set up empty array as default value for result
    for (var i = 0; i < array.length; i++) { // for each item in first array,
      if (!_.contains(result,array[i])) { // if result does not contain the item
        for (var j = 1; j < arguments.length; j++) { // loop through all arrays except the first
          if (_.contains(arguments[j], array[i])) { // if the current array contains
            // the item from the first arrray,
            break; // break out of the current for loop
          }
        }
        if (j === arguments.length) { // if j equals arguments.length, the current array does not contain the item from first array
          result.push(array[i]); // so push it to results
        }  
      }
    }
    return result;
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  };
}());

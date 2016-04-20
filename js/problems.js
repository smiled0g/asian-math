/* Util functions */

// Generate random number on interval [lower, upper]
var randomNumber = function(lower, upper) {
  return Math.round(Math.random()*(upper-lower+1) + lower);
}

var problemGenerators = {
  plus: function(limit) {
    var x = randomNumber(1,limit);
    var y = randomNumber(1,limit);
    return {
      question: [x, '+', y].join(' '),
      answer: x+y
    }
  },

  minus: function(limit) {
    var x = randomNumber(1,limit);
    var y = randomNumber(1,limit);
    return {
      question: [x, '-', y].join(' '),
      answer: x-y
    }
  },

  multiply: function(limit) {
    var x = randomNumber(2,limit);
    var y = randomNumber(2,limit);
    return {
      question: [x, '×', y].join(' '),
      answer: x*y
    }
  },

  divide: function(limit) {
    var x = randomNumber(2,limit);
    var y = randomNumber(2,limit);
    return {
      question: [x*y, '÷', y].join(' '),
      answer: x
    }
  }
}

var problems = {}

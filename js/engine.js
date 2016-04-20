var Engine = {
  currentProblem: null,
  currentLevel: -1,
  currentStar: 0,
  nextLevel: function() {
    Engine.currentLevel++;
    var level = levels[Engine.currentLevel];
    // Populate level label
    $('.level').html('Level: ' + level.label);
    $('.avatar img').attr('src', level.img);
    Engine.currentStar = 0;
    // Populate stars
    $('.exp').empty();
    for(var i=0; i< 3; i++) {
      $($('.exp-template').html()).attr('id','exp-'+i).appendTo($('.exp'));
    }
    // Show problem!
    Engine.nextProblem();
  },
  nextProblem: function() {
    var problem = levels[Engine.currentLevel].problem();
    var timeLimit = levels[Engine.currentLevel].timeLimit;
    // Set current problem
    Engine.currentProblem = problem;
    // Reset state of the game
    $('.task .question').text(problem.question);
    $( ".progress-bar-fill" ).stop(true, true).width('0%'); // Reset progress bar
    showTimeCountdown(timeLimit, function(){
      // Decrease exp
      if(Engine.currentStar > 0) {
        Engine.currentStar--;
        $('#exp-'+Engine.currentStar).removeClass('check');
      }
      Engine.nextProblem();
    });
  },
  answerCurrentProblem: function(answer) {
    if(!Engine.currentProblem) return;

    if(answer == Engine.currentProblem.answer) {
      // Correct
      $( ".progress-bar-fill" ).stop(true, false);
      $('#exp-'+Engine.currentStar).addClass('check');
      Engine.currentStar++;
      if(Engine.currentStar < 3) {
        playCorrectSound();
        setTimeout(Engine.nextProblem, 500);
      } else {
        playCorrectSound();
        setTimeout(playCorrectSound, 300);
        setTimeout(playCorrectSound, 600);
        setTimeout(Engine.nextLevel, 1500);
      }
    } else {
      // Incorrect
    }
  },
  start: function() {
    $('.exp .icon').addClass('check');

    setTimeout(function() {
      $('.progress-bar').css('display', 'inline-block');
      Engine.nextLevel();
    }, 1500);
  }
}

var levels = [
  { // 0
    label: 'Baby',
    img: 'svg/baby.svg',
    problem: problemGenerators.plus.bind(this, 10),
    timeLimit: 4000
  },
  { // 1
    label: 'Pre-school',
    img: 'svg/preschool.svg',
    problem: problemGenerators.plus.bind(this, 50),
    timeLimit: 5000
  },
  { // 2
    label: '1<sup>st</sup> Grade',
    img: 'svg/grade-1.svg',
    problem: function() {
      if(Math.random() < 0.5) {
        return problemGenerators.plus(100);
      } else {
        return problemGenerators.minus(100);
      }
    },
    timeLimit: 6000
  },
  { // 3
    label: '2<sup>nd</sup> Grade',
    img: 'svg/grade-2.svg',
    problem: function() {
      var r = Math.random()
      if(r < 0.25) {
        return problemGenerators.plus(200);
      } else if(r < 0.6) {
        return problemGenerators.minus(200);
      } else {
        return problemGenerators.multiply(12);
      }
    },
    timeLimit: 5000
  },
  { // 4
    label: '3<sup>rd</sup> Grade',
    img: 'svg/grade-3.svg',
    problem: function() {
      var r = Math.random()
      if(r < 0.15) {
        return problemGenerators.plus(1000);
      } else if(r < 0.3) {
        return problemGenerators.minus(1000);
      } else if(r < 0.7) {
        return problemGenerators.multiply(24);
      } else {
        return problemGenerators.divide(12);
      }
    },
    timeLimit: 5000
  }
];

var showTimeCountdown = function(duration, cb) {
  $( ".progress-bar-fill" ).animate({
    width: '100%'
  }, duration, 'linear', cb);
}

var playCorrectSound = function() {
  var audio = new Audio('./sound/correct.mp3');
  audio.play();
}


if (annyang) {
  var commands = {
    'hi': function() {
      speak('hi');
    },
    '*number': function(number) {
      if(number.toLowerCase().indexOf('start') >= 0) {
        Engine.start();
      } else {
        Engine.answerCurrentProblem(number);
      }
    }
  };

  annyang.debug();

  // Add our commands to annyang
  annyang.addCommands(commands);

  // Start listening. You can call this here, or attach this call to an event, button, etc.
  annyang.start();
}

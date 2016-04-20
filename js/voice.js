var speak = function(text) {
  // Pause listening to commands (which would be its own voice)
  annyang.pause();

  var msg = new SpeechSynthesisUtterance();
  msg.text = text;
  msg.lang = 'en-US';
  msg.localService = false;

  speechSynthesis.speak(msg);

  // Resume listening
  msg.addEventListener('end', function () {
    annyang.resume();
  });
}

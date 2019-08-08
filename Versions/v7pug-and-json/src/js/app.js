// .. ваш код Clock
function Clock(options) {
  var elem = options.elem;
  var timer;

  function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  function start() {
    timer = setInterval(function() {
      var d = new Date();
      var hour = addZero(d.getHours());
      var min = addZero(d.getMinutes());
      var sec = addZero(d.getSeconds());
      elem.querySelector('.hour').innerHTML = hour;
      elem.querySelector('.min').innerHTML = min;
      elem.querySelector('.sec').innerHTML = sec;
    }, 1000);

  }

  function stop() {
    clearInterval(timer);

  }
  this.start = start;
  this.stop = stop;
}

var pageClock = new Clock({
  elem: document.getElementById('clock')
});

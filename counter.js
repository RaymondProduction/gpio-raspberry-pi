var gpio = require('rpi-gpio');

gpio.on('export', function(channel) {
  console.log('Channel set: ' + channel);
});


var pins = [7, 11, 12, 13, 15, 16, 18, 22];

var digits = [
  [7, 13, 11, 16, 15, 22],
  [15, 16],
  [22, 15, 18, 13, 11],
  [22, 15, 18, 16, 11],
  [7, 18, 15, 16],
  [22, 7, 18, 16, 11],
  [22, 7, 13, 18, 11, 16],
  [22, 15, 16],
  [22, 7, 15, 18, 13, 16, 11],
  [22, 15, 16, 18, 7, 11]
]


var swichPins = 29;
var delay = 200;
var count = 0;

initPorts(function() {
  var intervalID = setInterval(function() {
    console.log(count);
    showDigit(count);
    count++;
    if (count > 9) {
      closePins();
      clearInterval(intervalID);
    }
  }, 500);
});

function initPorts(call) {
  gpio.setup(swichPins, gpio.DIR_OUT, function() {
    initPort(0, call);
  });
}

function initPort(i, call) {
  var k = i + 1;
  if (i < pins.length) {
    gpio.setup(pins[i], gpio.DIR_OUT, function() {
      initPort(k, call);
    });
  } else {
    call();
  }
}


function showDigit(n) {
  digits[n].forEach(function(pin, i, arr) {
    if (i == arr.length - 1) {
      gpio.write(pin, 1, pause(offPins));
    } else {
      gpio.write(pin, 1);
    }
  });
  gpio.write(swichPins, 0);
}


function pause(call) {
  setTimeout(call, 500);
}

function offPins() {
  pins.forEach(function(pin) {
    gpio.write(pin, 0);
  })
}

function closePins() {
  gpio.destroy(function() {
    console.log('All pins unexported');
  });
}



/*

  22
7    15
  18
13   16
  11   12

 */

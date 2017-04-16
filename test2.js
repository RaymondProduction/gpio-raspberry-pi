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
var max = 8;



gpio.setup(16, gpio.DIR_OUT, pause);

function showDigit(n) {
  gpio.setup(swichPins, gpio.DIR_OUT, function() {
    gpio.write(swichPins, 0);

    digits[n].forEach(function(pin, i, arr) {
      console.log(pin);
      gpio.setup(pin, gpio.DIR_OUT, function() {
        if (i == arr.length - 1) {
          gpio.write(pin, 1, pause);
          console.log('ok');
        } else {
          gpio.write(pin, 1);
        }
      });
    });
  });
}


function pause() {
  setTimeout(closePins, 1000);
}

function closePins() {
  gpio.destroy(function() {
    console.log('All pins unexported');
  });
}


var intervalID = setInterval(function() {
  console.log(count);
  showDigit(count);
  count++;
  if (count > 9) {
    console.log('End!');
    clearInterval(intervalID);
  }
}, 2000);



/*

  22
7    15
  18
13   16
  11   12

 */

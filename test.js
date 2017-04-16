var gpio = require('rpi-gpio');

var pins   = [7,11,12,13,15,16,18,22];
var swichPins = 29;
var delay = 10000;
var count = 0;
var max   = 8;

gpio.setup(pins[count], gpio.DIR_OUT, on);
gpio.setup(swichPins,gpio.DIR_OUT, function() {
    gpio.write(swichPins,0);
});

function on() {
    console.log(pins[count]);
    if (count >= max) {
        gpio.destroy(function() {
            console.log('Closed pins, now exit');
        });
        return;
    }

    setTimeout(function() {
        gpio.write(pins[count], 1, off);
        count += 1;
    }, delay);
}

function off() {
    setTimeout(function() {
        gpio.setup(pins[count], gpio.DIR_OUT, function(){
            gpio.write(pins[count], 0, on);
        });
    }, delay);
}
/*

  22
7    15
  18
13   16
  11   12

 */

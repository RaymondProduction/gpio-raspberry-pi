# My experiments with Rasberry Pi

I use Rasberry Pi 2 Model B V 1.1

## Install nodejs for Rasberry Pi

```
$ curl -sLS https://apt.adafruit.com/add | sudo bash
$ sudo apt-get install node
```
When I install through nvm, I have problem. I saw error
```
/node_modules/bindings/bindings.js:83
        throw e
              ^
```
Maybe problem because of I use version 7.0.0 of nodejs from nvm


## Install rpi-gpio module

This module for use GPIO
```
$ npm install rpi-gpio
```

[rpi-gpio](https://www.npmjs.com/package/rpi-gpio)

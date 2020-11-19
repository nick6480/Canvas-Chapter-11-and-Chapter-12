'use strict';
/**
 * nQuery, *the* JS Framework
 */
export const $ = function (foo) {
    return document.getElementById(foo);
}

export const deg2rad = function(deg) {
    return deg * Math.PI / 180;
}

export const rad2deg = function(rad) {
    return rad * 180 / Math.PI;
}

export const roll = function(foo, bar = 0) {
    return Math.floor(Math.random() * foo + 1) + bar;
}

/*
 * animation pack
 * requires:
 * @param arr: array of objects to be animated, must have move and draw
 * @param onoff: variable for suspending animation
 * @param: delay, number of millisecs between displays
 * Canvas module with prep and clear
 */
export const animate = function(arr, onoff, delay) {
    console.log(arr.length);
    onoff = setInterval(function() {
        if (arr.length < 1) {
            return;
        }
        arr[0].cv.clear();
        arr[0].cv.prep();
        for (let obj of arr) {
            obj.move();
            obj.draw();
        }
    }, delay);
}

export const randomColor = function() {
    let hexDigits = '0123456789abcdef';
    let rrggbb = '#';
    for (let i = 0; i < 6; i++) {
        rrggbb += hexDigits[Math.floor(Math.random() * 16)];
    }
    return rrggbb;
}
/*
 * kudos Brian Suda, https://24ways.org/2010/calculating-color-contrast/
 * yiq
 * @param: toWhat => '#rrggbb'
 */
export const contrastColor = function(toWhat) {
    toWhat = toWhat.substr(1);
    let r = parseInt(toWhat.substr(0,2),16);
    let g = parseInt(toWhat.substr(2,2),16);
    let b = parseInt(toWhat.substr(4,2),16);
    let yiq = ((r*299)+(g*587)+(b*114))/1000;
    return (yiq >= 128) ? 'black' : 'white';
}

export const copyr = function(bar, year=2020) {
    let now = new Date();
    let sml = document.createElement("small");
    let cpr = document.createTextNode(`\u00a9nml, ${year}-${now.getFullYear()}`);
    sml.appendChild(cpr);
    $(bar).appendChild(sml);
}
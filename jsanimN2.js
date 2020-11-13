'use strict';
import {Canvas} from './nmlCanvas.js'



class Umo {
    constructor(canvas, color, radius) {
        this.canvas = canvas;
    //    this.x = this.canvas.getWidth() / 2;
        this.x = this.canvas.getWidth() / 2;
        this.y = radius;
        this.r = radius;
        this.dx = 1;
        this.color = color;
    }

    draw() {
        this.canvas.getContext().beginPath();
        this.canvas.getContext().fillStyle = this.color;
        this.canvas.getContext().arc(this.x, this.y, this.r,
                                     0, Math.PI * 2,
                                     false);
        this.canvas.getContext().fill();
        this.canvas.getContext().closePath();
    }

    move() {
        if (this.x + this.dx > this.canvas.getWidth()|| this.x + this.dx < 0)
            //  this.dx = -this.dx;

        this.x += this.dx;
        this.y += this.dx;
        // a(x-h)^2 + k where h is offset to right, k is offset up
        // http://www.intmath.com/plane-analytic-geometry/4-parabola.php
        this.x = Math.pow(this.y - 200, 2) / 100;


        //this.x = Math.pow(this.y - 10, 2.2) / 50

        //this.y = 2 * Math.PI * Math.sqrt((1/2)*(this.canvas.getWidth()^2 + this.canvas.getHeight()^2))

        //this.y = Math.sqrt(1 - (this.canvas.getWidth()^2 / this.canvas.getHeight()^2))
        // this.toString();     // for debugging
      /*  if (this.y > this.canvas.getHeight())
            //this.dx *= -1;*/
    }

    toString() {
        let s = '';
        s += this.x + ':' + this.y;
        return s;
    }
};

console.log(2 * Math.PI * Math.sqrt((1/2)*(800^2 + 400^2)))




var arr = [];
var canvas;

const redraw = function () {
    canvas.clear();     // clear canvas
    canvas.prep();      // prep canvas with background color
    for (let umo of arr) {
        umo.move();
        umo.draw();
    }
}

const repeater = function () {
    setInterval(redraw, 20);
}

const go = function () {
    canvas = new Canvas('canvas', 'black');
    let c = new Umo(canvas, '#000088', 10);
    console.log(c.toString());
    arr.push(c);
    repeater();
}

window.addEventListener('load', go);

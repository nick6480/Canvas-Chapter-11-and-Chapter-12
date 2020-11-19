'use strict';
import {Canvas} from './nmlCanvas.js'

let angle = 0;

class Umo {
    constructor(canvas, color, radius, movement) {
        this.canvas = canvas;
        this.x = this.canvas.getWidth() / 2;
        this.y = radius;
        this.r = radius;
        this.dx = 1;
        this.color = color;
        this.movement = movement;
        if (movement == false) {
          this.y = this.canvas.getHeight() / 2;
        }
    }

    draw() {
        this.canvas.getContext().beginPath();
        this.canvas.getContext().fillStyle = this.color;
        this.canvas.getContext().arc(this.x, this.y, this.r,0, Math.PI * 2,false);
        this.canvas.getContext().fill();
        this.canvas.getContext().closePath();
    }

    move() {
        if (this.movement == true) {

          this.x += this.dx;
          this.y += this.dx;

          
          let newX  = this.canvas.getWidth()/2.2 * Math.cos(angle * (Math.PI/180));
          let newY = this.canvas.getHeight()/2.2 * Math.sin(angle * (Math.PI/180));


          this.x = newX + this.canvas.getWidth()/2;
          this.y = newY + this.canvas.getHeight()/2;


          angle += this.dx;
        }
    }

    toString() {
        let s = '';
        s += this.x + ':' + this.y;
        return s;
    }
};



let arr = [];
let canvas;

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
    let c = new Umo(canvas, 'aqua', 10, true);
    let c2 = new Umo(canvas, 'yellow', 30, false);
    arr.push(c2);
    arr.push(c);
    repeater();
}

window.addEventListener('load', go);

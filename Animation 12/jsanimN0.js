'use strict';
import {Canvas} from './nmlCanvas.js'



class Umo {
    constructor(canvas, color) {
        this.canvas = canvas;
        this.r = Math.random() * 9 + 3;
        this.x = Math.random() * (this.canvas.getWidth() - this.r - 2);
        this.y = Math.random() * (this.canvas.getHeight() - this.r - 2);
        this.dx = Math.random() * 3; //Horisontal movement
        this.dy = Math.random() * 0; //Vertical movement
        this.color = color;
    }

    draw() {
        this.canvas.getContext().beginPath();
        this.canvas.getContext().strokeStyle = '#222';
        this.canvas.getContext().fillStyle = this.color;
        this.canvas.getContext().arc(this.x, this.y, this.r,0, Math.PI * 2,false);
        this.canvas.getContext().fill();
        this.canvas.getContext().stroke();
        this.canvas.getContext().closePath();
    }

    move() {
        if (this.x + this.dx + this.r > this.canvas.getWidth()|| this.x + this.dx - this.r < 0)
              this.dx = -this.dx;
        if (this.y + this.dy + this.r > this.canvas.getHeight()|| this.y + this.dy - this.r < 0)
              this.dy = -this.dy;

        this.x += this.dx;
        this.y += this.dy;
    }

    toString() {
        s = '';
        s += this.x + ':' + this.y + ', ' + this.r + " \n " + this.color;
        return s;
    }
};




var c0;
var c1;

var cArr = [];

var canvas;

const redraw = function () {
    canvas.clear();
    canvas.prep();

    for (var i = 0; i < cArr.length; i++) {
      cArr[i].move();
      cArr[i].draw();
    }

}

const repeater = function () {
    setInterval(redraw, 10);
}

const init = function () {
    canvas = new Canvas('canvas', '#ffff88');


    for (var i = 0; i < 10; i++) {
      c0 = new Umo(canvas, '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0'));
      cArr.push(c0)
    }



    repeater();
}

var nml = window.addEventListener('load', init);

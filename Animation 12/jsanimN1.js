'use strict';
import {Canvas} from './nmlCanvas.js'

let a = 0;


class Umo {
    constructor(canvas, color) {
        this.canvas = canvas;
        let ctx = canvas.getContext("2d");
        this.r = Math.random() * 1 + 10;
        this.x = Math.random() * (this.canvas.getWidth() - (this.r) / 2);
        this.y = Math.random() * (this.canvas.getHeight() - this.r / 2);
        this.dx = Math.random() * 3; //Horisontal movement
        this.dy = Math.random() * 3; //Vertical movement
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
        let s = '';
        s += this.x + ':' + this.y + ', ' + this.r + " \n " + this.color;
        return s;
    }


    hitDetection(obj) {
      return Math.sqrt(Math.pow(obj.x - this.x, 2) + Math.pow(obj.y - this.y, 2)) <= (obj.r + this.r);

    }


    calcArea() {
     return Math.PI * Math.pow(this.r, 2);
    }

};




var c0;
var c1;

var arr = [];

var canvas;

const redraw = function () {
    canvas.clear();
    canvas.prep();

    for (var i = 0; i < arr.length; i++) {
      arr[i].move();

      for (var o = i; o < arr.length; o++) {

        if (arr[i].hitDetection(arr[o]) && arr[i] !== arr[o]) {
          let a1 = arr[i].calcArea();
          let a2 = arr[o].calcArea();
          a1 += a2;
          a1 /= Math.PI;
          a1 = Math.sqrt(a1);
          if (arr[i].r >= arr[o].r) {
            arr[i].r = a1;
            arr.splice(o, 1);
          } else {
            arr[o].r = a1;
            arr.splice(i, 1);
          }
        }
      }

      if (arr.length <= 1) {
        arr[0].dx = 0;
        arr[0].dy = 0;
        arr[0].x = arr[0].canvas.getWidth() / 2;
        arr[0].y = arr[0].canvas.getHeight() / 2;
      


      }
      arr[i].draw();
      }




}

const repeater = function () {
    setInterval(redraw, 10);
}

const init = function () {
    canvas = new Canvas('canvas', '#ffff88');


    for (var i = 0; i < 50; i++) {
      c0 = new Umo(canvas, '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0'));

      arr.push(c0);
      let b = arr[i]

    }
    console.log(arr)


    repeater();
}






function hitCalc(obj){

  let hit = Math.sqrt((obj.x - this.x)^2 + (obj.y - this.y)^2)

  return hit;
}







var nml = window.addEventListener('load', init);

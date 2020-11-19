"use strict";
import {$} from "./nQuery.js";


 class Canvas {
     constructor(canvasId, color) {
         this.canvas = $(canvasId);
         this.context = this.canvas.getContext("2d");
         this.color = color;
         this.prep();
     }
     prep() {
         this.context.fillStyle = this.color;
         this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
     }
     clear() {
         this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
     }
     getContext() {
         return this.context;
     }
     getHeight() {
         return this.canvas.height;
     }
     getWidth() {
         return this.canvas.width;
     }
 };

 class Shape {
     constructor(cv, x, y, width, height, color, type) {
         if (type == "rect") {
           this.ctx = cv.context;
           this.x = x;
           this.y = y;
           this.width = width;
           this.height = height;
           this.color = color;
           this.clicked = false;

       } else if (type == "semicircle") {

       }
     }

     draw() {
         this.ctx.fillStyle = this.color;
         this.ctx.fillRect(this.x, this.y, this.width, this.height);
     }

     move(dx, dy) {
         this.x += dx;
         this.y += dy;
     }
 };




let room;

function init() {
    $("createCanvasBtn").addEventListener("click", createCanvas);
}


let initialize = function () {

    $("createCanvasBtn").addEventListener("click", createCanvas);

    room = new Canvas("room", "transparent");
    room.canvas.addEventListener("click", hittest);
    console.log(room.context)

    let toolbox = new Canvas("toolbox", "transparent");
    toolbox.canvas.addEventListener("click", hittest);
    console.log(toolbox.context)


    let shape1 = new Shape(toolbox, 10, 10, 120, 40, "rgba(21,129,238,1)", "rect");
    let shape2 = new Shape(toolbox, 10, 60, 80, 60, "rgba(21,182,32,1)", "rect");
    let shape3 = new Shape(toolbox, 10, 130, 200, 50, "rgba(216,26,26,1)", "rect");
    let shape4 = new Shape(toolbox, 10, 190, 80, 80, "rgba(216,110,18,1)", "rect");

    //let shape5 = new Shape(toolbox, 200, 190, 80, 80, "black", "semicircle");


    shapes.push(shape1);
    shapes.push(shape2);
    shapes.push(shape3);
    shapes.push(shape4);


    repeater(toolbox, shapes);
}

let roomShapes = [];
let activeRoomShapes = [];
let selectedShape;
let selectedCx;
let selectedCanvas;

let hittest = function (ev) {
    console.log(this.id)
    selectedCanvas = this;


    var mousePos = getMousePos(this, ev);
    console.log(mousePos.x + "," + mousePos.y);
    console.log(this)

    for (let shape of shapes) {
        let cx = shape.ctx;
        selectedCx = cx
        cx.beginPath();
        cx.rect(shape.x, shape.y, shape.width, shape.height);
        cx.closePath();


        let bb = this.getBoundingClientRect();    // canvas size and pos
        // mouse to canvas coordinates
        let x = (ev.clientX - bb.left) * (this.width / bb.width);
        let y = (ev.clientY - bb.top) * (this.height / bb.height);



        if (event.target.id == "toolbox")

          if (cx.isPointInPath(x, y)) {
            selectedShape = shape;
            roomShapes.push(selectedShape);


            let currentStyle = selectedShape.fillStyle;


            selectedCx = cx
            selectedCx.clicked = false
            console.log(selectedCx.clicked)
            console.log(selectedCx)
            console.log(roomShapes)
          }
        }



    if (event.target.id == "room") {

      let mousePos = getMousePos(event.target, ev);
      console.log(mousePos.x + "," + mousePos.y);
        console.log(selectedCx.clicked)
        //&repeater(event.target, roomShapes);
        console.log(selectedCanvas.width)


        if (mousePos.x + selectedShape.width > selectedCanvas.width == false && mousePos.y + selectedShape.height > selectedCanvas.height == false) {

          if (selectedCx.clicked == false) {
                $("errorMessage").innerHTML = ""
                selectedCx.clicked = true;

                let shape1 = new Shape(room, mousePos.x, mousePos.y, selectedShape.width, selectedShape.height, selectedShape.color, "rect");

                activeRoomShapes.push(shape1);
                console.log(activeRoomShapes)

                repeater(room, activeRoomShapes);
          }
        } else {

          $("errorMessage").innerHTML = "Not enough room"
        }



    }


}

function getMousePos(canvas, ev) {
    let rect = canvas.getBoundingClientRect();
    return {
        x: ev.clientX - rect.left,
        y: ev.clientY - rect.top
    };
}



let redraw = function (cv, arr) {
    cv.clear();
    cv.prep();
    // loop through array and draw
    for (let shape of arr) {
        shape.draw();
    }
}

let repeater = function (cv, arr) {
    // if this is an animation build a setInterval loop here
    // if not, just draw
    redraw(cv, arr);
}


function createCanvas() {

  let canv = document.createElement("canvas");
  canv.id = "room";
  canv.width = $("canvasWidth").value;
  canv.height = $("canvasHeight").value;
  canv.style.outline = "1px solid black";
  $("roomWrapper").appendChild(canv);
  initialize()
  $("createCanvasBtn").removeEventListener("click", createCanvas)
}




let shapes = [];

window.addEventListener("load", init);

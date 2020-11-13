import {$} from './nQuery.js';
/**
 * Canvas object
 */
export class Canvas {
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
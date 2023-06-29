import { ShortRect } from "../shotRect/ShortRect"
import { fabric } from "fabric"
import paintOption from './defaultOptions.json'
import { AbstractCapture, ExportType, SourceType } from "../capture/AbstractCapture"
import { BaseCapture } from "../capture/BaseCapture"

export interface PaintOptions {
    bgColor: string,
    input: SourceType
}

export class PaintContext {
    canvas: fabric.Canvas
    shortRect: ShortRect
    canvasDom: HTMLCanvasElement
    options: PaintOptions
    capturer: AbstractCapture
    successCb: (t: ExportType) => void = () => {}
    constructor(options: Partial<PaintOptions>) {
        this.initOptions(options)
        this.initDom()
        this.initCanvas()
        this.capturer = new BaseCapture(this)
        this.shortRect = new ShortRect(this)
    }

    whenSuccess(output: (t: ExportType) => void = () => {}) {
        this.successCb = output
    }

    private initOptions(options: Partial<PaintOptions>) {
        this.options = Object.assign(paintOption, options)
    }
    beforeDestory() {
        if (this.canvasDom) {
            document.body.removeChild(this.canvasDom)
        }
    }
    private initDom() {
        const canvasDom = document.createElement("canvas")
        canvasDom.id = "ice-dom"
        document.body.appendChild(canvasDom)
        this.canvasDom = canvasDom
    }
    private initCanvas() {
        const canvas = new fabric.Canvas(this.canvasDom, {
            selection: true
        })
        canvas.setWidth(window.innerWidth)
        canvas.setHeight(window.innerHeight)
        canvas.setBackgroundColor(this.options.bgColor, () => {
            canvas.renderAll()
        })
        this.canvas = canvas
    }
}
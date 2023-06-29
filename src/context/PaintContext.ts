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
    resizeEvent: Function
    successCb: (t: ExportType) => void = () => {}
    constructor(options: Partial<PaintOptions>) {
        this.initOptions(options)
        this.initDom()
        this.initCanvas()
        this.capturer = new BaseCapture(this)
        this.capturer.init(options.input)
        this.shortRect = new ShortRect(this)
    }

    whenSuccess(output: (t: ExportType) => void = () => {}) {
        this.successCb = output
    }

    private initOptions(options: Partial<PaintOptions>) {
        this.options = Object.assign(paintOption, options)
    }
    beforeDestory() {
        const canvasDom = document.getElementById("ice-dom")
        if (canvasDom) {
            document.body.removeChild(canvasDom)
        }

        const templateDom = document.getElementById("lit-html__container")
        if (templateDom) {
            document.body.removeChild(templateDom)
        }

        if (this.resizeEvent) {
            window.removeEventListener('resize', this.resizeEvent as EventListener)
        }
    }
    private initDom() {
        const canvasDom = document.createElement("canvas")
        canvasDom.id = "ice-dom"
        document.body.appendChild(canvasDom)
        this.canvasDom = canvasDom

        if (!document.getElementById("lit-html__container")) {
           const dom = document.createElement("div")
           dom.id = 'lit-html__container'
           document.body.appendChild(dom)
        }
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
        this.resizeEvent = () => {
            console.log('动态')
            this.canvas.setWidth(window.innerWidth)
            this.canvas.setHeight(window.innerHeight)
            this.canvas.renderAll()
        }
        window.addEventListener('resize', this.resizeEvent as EventListener)
    }

}
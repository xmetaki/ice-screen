import { fabric } from 'fabric'
import { Menu } from './menu'
const initializeCanvas = (elm: string):fabric.Canvas => {
    const canvas = new fabric.Canvas(elm)
    canvas.setWidth(window.innerWidth)
    canvas.setHeight(window.innerHeight)
    canvas.setBackgroundColor("rgba(0, 0, 0, 0.7)", () => {
        canvas.renderAll()
    })
    return canvas
}


const resizeHandler = (canvas: fabric.Canvas) => {
    canvas.setWidth(window.innerWidth)
    canvas.setHeight(window.innerHeight)
    canvas.renderAll()
}
const canvas = initializeCanvas('app')

window.addEventListener('resize', () => resizeHandler(canvas))

interface axisPoint {
    x: number,
    y: number
}

let isDrawing: boolean = false
let startPoint: axisPoint = null
let hasScreen = false
let tempRect:fabric.Rect = null
let menu: Menu = null
canvas.on('mouse:down', (e) => {
    if (hasScreen) return
    isDrawing = true
    startPoint = canvas.getPointer(e.e)

    tempRect = new fabric.Rect({
        left: startPoint.x,
        top: startPoint.y,
        width: 0,
        height: 0,
        fill: 'transparent',
        stroke: '#273eff',
        strokeWidth: 2
    })
    canvas.add(tempRect)
})

canvas.on("mouse:move", (e) => {
    if (!isDrawing) return
    const currentPoint = canvas.getPointer(e.e)
    const width = currentPoint.x - startPoint.x
    const height = currentPoint.y - startPoint.y
    tempRect.set({width, height})
    canvas.renderAll()
})

canvas.on("mouse:up", (e) => {
    if (!isDrawing) return

    menu = new Menu({
        "closeFn": () => {
            canvas.remove(tempRect)
            hasScreen = false
            tempRect = null
        },
        "confirmFn": () => {
            console.log('confirm')
        }
    })
    menu.updateStyle({
        left: `${e.e.pageX - 400}px`,
        top: `${e.e.pageY + 10}px`
    })
    menu.show()
    hasScreen = true
    isDrawing = false
    startPoint = null

})
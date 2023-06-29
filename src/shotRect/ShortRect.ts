import { fabric } from "fabric"
import { PaintContext } from "../context/PaintContext"
import { Menu } from "../menu/Menu"
interface axisPoint {
    x: number,
    y: number
}
function relativeFocus(x: number, y: number): {
    left: number,
    top: number
} {
    return {
        left: x - 200 > 0 ? x - 200 : 0,
        top: y + 10 > 0 ? y + 10 : 0
    }
}


export class ShortRect {
    private ctx: PaintContext
    private isDrawing: boolean
    private startPoint: axisPoint = null
    private hasScreenshot: boolean = false
    private menu: Menu
    rect: fabric.Rect

    constructor(ctx: PaintContext) {
        this.ctx = ctx
        this.bindMouseDownEvent()
        this.bindMouseMoveEvent()
        this.bindMouseUpEvent()
    }

    getContext(): PaintContext {
        return this.ctx
    }


    bindMouseDownEvent() {
        if (this.hasScreenshot) return
        const { canvas } = this.getContext()

        canvas.on('mouse:down', (e) => {
            if (this.hasScreenshot) return
            this.isDrawing = true
            this.startPoint = canvas.getPointer(e.e)
            this.rect = new fabric.Rect({
                left: this.startPoint.x,
                top: this.startPoint.y,
                width: 0,
                height: 0,
                fill: 'transparent',
                stroke: '#273eff',
                strokeWidth: 2,
                lockRotation: true,
                strokeDashArray: [5, 5],
                selectable: true
            })
            canvas.add(this.rect)
        })
    }

    bindMouseMoveEvent() {
        const { canvas } = this.getContext()
        canvas.on("mouse:move", (e) => {
            if (!this.isDrawing) return
            const currentPoint = canvas.getPointer(e.e)
            const width = currentPoint.x - this.startPoint.x
            const height = currentPoint.y - this.startPoint.y
            this.rect.set({ width, height })
            canvas.renderAll()
        })
    }

    bindMouseUpEvent() {
        const { canvas, capturer, options: { input } } = this.getContext()
        canvas.on("mouse:up", (e) => {
            if (!this.isDrawing) return

            /**处理误触问题 */
            if (this.rect.width < 1 || this.rect.height < 1) {
                this.destoryRect()
                return
            }
            /**加载菜单 */
            const menu = this.menu = new Menu({
                "closeFn": () => {
                    this.destoryRect()
                },
                "confirmFn": () => {
                    capturer.capture(input).then(res => {
                        this.destoryRect()
                        this.getContext().successCb(res)
                        canvas.dispose()
                        this.getContext().beforeDestory()
                    })
                }
            })

            const currentPoint = canvas.getPointer(e.e)

            const { left, top } = relativeFocus(currentPoint.x, currentPoint.y)
            menu.updateStyle({
                left: `${left}px`,
                top: `${top}px`
            })
            menu.show()
            this.rect.on('moving', () => this.handleRectChange(this.rect, menu))
            this.rect.on('scaling', () => this.handleRectChange(this.rect, menu))
            this.hasScreenshot = true
            this.isDrawing = false
            this.startPoint = null
        })
    }

    handleRectChange(rect: fabric.Rect, menu: Menu) {
        const bottomX = rect.left + rect.width * rect.scaleX
        const bottomY = rect.top + rect.height * rect.scaleY
        const { left, top } = relativeFocus(bottomX, bottomY)
        menu.updateStyle({
            left: `${left}px`,
            top: `${top}px`
        })
        menu.show()
    }

    destoryRect() {
        const { canvas } = this.getContext()
        canvas.remove(this.rect)
        this.hasScreenshot = false
        this.isDrawing = false
        this.startPoint = null
        this.rect = null
    }


}
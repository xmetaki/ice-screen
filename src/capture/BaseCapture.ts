import { fabric } from "fabric";
import { AbstractCapture, SourceType } from "./AbstractCapture";

export class BaseCapture extends AbstractCapture{
    parse(source: SourceType): string {
        if (source instanceof HTMLCanvasElement) {
            return source.toDataURL()
        } else if (typeof source === 'string') {
            return source
        } else {
            let exhaustiveCheck: never = source
        }
    }

    transform(dataUrl: string): Promise<fabric.Image> {
        return new Promise((resolve, reject) => {
            fabric.Image.fromURL(dataUrl, (img) => {
                if (img) {
                    resolve(img)
                } else {
                    reject(new Error('Error transform image'))
                }
            }, {
                selectable: false,
                hoverCursor: 'default'
            })
        })
    }

    paint(img: fabric.Image): void {
       const { canvas } = this.getContext()
       img.set({
        left: canvas.width / 2 - img.width /2,
        top: canvas.height / 2 - img.height / 2
       })
       canvas.add(img)
       /**增加鼠标滚轮放缩效果 */
       canvas.on("mouse:wheel", (opt) => {
        const delta = opt.e.deltaY * -1;
        const zoom = 1 + delta / 1000;
        const oldCenter = img.getCenterPoint()
        img.scale(img.scaleX * zoom)
        const newCenter = img.getCenterPoint()
        const deltaX = newCenter.x - oldCenter.x
        const deltaY = newCenter.y - oldCenter.y

        img.set({
            left: img.left - deltaX,
            top: img.top - deltaY
        })
        canvas.renderAll()
        opt.e.preventDefault()
        opt.e.stopPropagation()
       })
    }

    export(): string {
       const { canvas, shortRect: {rect}} = this.getContext()
       const oldWidth = rect.get("strokeWidth")
       rect.set('strokeWidth', 0)
       const url = canvas.toDataURL({
        format: 'png',
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height
       })
       rect.set('strokeWidth', oldWidth)
       return url
    }
}
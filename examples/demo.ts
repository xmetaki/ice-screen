import { PaintContext } from '../src/index'


;import { Menu } from '../src/menu/Menu';
(window as any).onCreate =  () => {
    const c = document.createElement('canvas')
    c.width = 400
    c.height = 400
    const ctx = c.getContext('2d')
    ctx.fillStyle = 'blue'
    ctx.fillRect(120, 120, 160, 160)
    new PaintContext({
        "input": c,
        "bgColor": "rgba(0, 0, 0, 1)"
    }).whenSuccess((url) => {
        const im: HTMLImageElement = document.getElementById("imgtest") as HTMLImageElement
        im.src = url
    })
}
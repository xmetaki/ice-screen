/**
 * @description 屏幕捕捉模板类
 * @author xmetaki
 * @date 2023/06/29
 */

import { PaintContext } from "../context/PaintContext"

/**导入资源类型 */
export type SourceType = 
    HTMLCanvasElement
    |
    string

/**导出资源类型 */
export type ExportType = 
    string

export interface ICapture {
    /**
     * 解析外部元素成DataURL
     * @param source 外部元素来源
     */
    parse(source: SourceType): string
    /**
     * 转换成fabric对象
     * @param string dataUrl 解析阶段生成的URL
     */
    transform(dataUrl: string):Promise<fabric.Image>

    /**
     * 绘制到PaintContext涉及到很多绘制策略
     * @param img fabric图片对象
     */
    paint(img: fabric.Image): void

    /**
     * 导出截图资源
     * @returns 截图资源
     */
    export():ExportType
}


export abstract class AbstractCapture implements ICapture{
    private ctx: PaintContext
    constructor(ctx: PaintContext) {
        this.ctx = ctx
    }
    getContext(): PaintContext {
        return this.ctx
    }

    abstract parse(source: SourceType): string;
    abstract transform(dataUrl: string): Promise<fabric.Image>;
    abstract paint(img: fabric.Image): void;
    abstract export(): ExportType;

    async capture(source: SourceType) {
       const parsed = this.parse(source)
       const image = await this.transform(parsed)
       this.paint(image)
       const output = this.export()
       return output
    }
}
import { html, render, nothing } from 'lit-html'
import { styleMap } from 'lit-html/directives/style-map.js'
export interface MenuOption {
    closeFn: Function,
    confirmFn: Function,
    backspaceFn: Function,
    styles?: Record<string,any>
}

export class Menu {
    styles: Record<string, any> = {}
    private preHandleClose: Function
    private preHandleBackspace: Function
    private preHandleConfirm: Function


    isShow: boolean = false
    
    constructor(options: MenuOption) {
        
        this.preHandleClose = options.closeFn
        this.preHandleBackspace = options.backspaceFn
        this.preHandleConfirm = options.confirmFn
        if (options.styles) {
            this.styles = options.styles
        }
    }

    close() {
        this.isShow = false
        this.render()
    }

    show() {
        this.isShow = true
        this.render()
    }
    handleClose() {
        this.preHandleClose()
        this.close()
    }
    handleConfirm () {
        this.preHandleConfirm()
        this.close()
    }
    handleBackspace() {
        this.preHandleBackspace()
        this.close()
    }
    updateStyle(style: Record<string, any>) {
        Object.keys(style).forEach(k => {
            this.styles[k] = style[k]
        })
    }
    render() {
        const template = this.isShow ? html`
            <div style=${styleMap(this.styles)} class="screen_menu">
                <span title="暂不支持">
                    <i class="gg-edit-markup"></i>
                </span>
                <span @click=${this.handleBackspace.bind(this)} title="重绘">
                    <i class="gg-log-out"></i>
                </span>
                <span @click=${this.handleClose.bind(this)} title="关闭">
                    <i class="gg-close-o"></i>
                </span>

                <span @click=${this.handleConfirm.bind(this)} title="确认">
                    <i class="gg-check-o"></i>
                </span>
            </div>
        ` : nothing
        render(template, document.getElementById("lit-html__container"))
    }
}

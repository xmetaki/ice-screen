import { html, render, nothing } from 'lit-html'
import { styleMap } from 'lit-html/directives/style-map.js'
export interface MenuOption {
    closeFn: Function,
    confirmFn: Function,
    styles?: Record<string,any>
}

export class Menu {
    styles: Record<string, any> = {}
    _innerHandleClose: Function
    _innerHandleConfirm: Function
    isShow: boolean = false
    
    constructor(options: MenuOption) {
        this._innerHandleClose = options.closeFn
        this._innerHandleConfirm = options.confirmFn
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
        this._innerHandleClose()
        this.close()
    }
    handleConfirm () {
        this._innerHandleConfirm()
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
                <span>
                    <i class="gg-edit-markup"></i>
                </span>
                <span @click=${this.handleClose.bind(this)}>
                    <i class="gg-close-o"></i>
                </span>

                <span @click=${this.handleConfirm.bind(this)}>
                    <i class="gg-check-o"></i>
                </span>
            </div>
        ` : nothing
        render(template, document.body)
    }
}

import { UserConfigExport } from "vite";
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

export default ():UserConfigExport => {
    return {
        "plugins": [
            /**css-in-js策略 降低使用者的引入负担 */
            cssInjectedByJsPlugin()
        ],
        "build": {
            "lib": {
                "entry": "src/index.ts",
                "name": "IceScreen",
            },
            "cssMinify": true,
            "emptyOutDir": true,
            "rollupOptions": {
               "output": [
                    {
                        "format": "umd",
                        "exports": "default",
                        "entryFileNames": "[name].js",
                        "dir": "dist/umd",
                        "name": "IceScreen"
                    }
               ]
            }
        }
    }
}
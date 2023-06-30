import { UserConfigExport } from "vite";
import dts from 'vite-plugin-dts'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
const baseOutputOptions = {
    "entryFileNames": "[name].js",
    "chunkFileNames": "[name].js",
    "exports": "named",
} as const

export default ():UserConfigExport => {
    return {
        "plugins": [
            /**css-in-js策略 降低使用者的引入负担 */
            cssInjectedByJsPlugin(),
            dts({
                "outDir": "dist/types",
                "staticImport": true,
                "root": ".",
                "entryRoot": "src",
                "copyDtsFiles": true,
            })
        ],
        "build": {
            "lib": {
                "entry": "src/index.ts",
                "name": "IceScreen",
            },
            "cssMinify": true,
            "emptyOutDir": true,
            "rollupOptions": {
                "external": [
                    "lit-html",
                    "lit-html/directives/style-map.js",
                    "fabric"
                ],
               "output": [
                    {
                        ...baseOutputOptions,
                        "format": "es",
                        "dir": "dist/es",
                        "entryFileNames": "[name].js",
                        /**支持按需引用降低打包体积 */
                        "preserveModules": true
                    },
                    {
                        ...baseOutputOptions,
                        "format": "cjs",
                        "dir": "dist/cjs"
                    }
               ]
            }
        }
    }
}
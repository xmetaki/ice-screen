# ice-screen
A class library for web screenshots

## 演示效果 | Demo

![录屏效果](./screenshot.gif)

## 使用方法 | Usage

### 导入 | Import
```sh
#pnpm
pnpm add @xmetaki/ice-screen 
#npm
npm install @xmetaki/ice-screen
#yarn
yarn add @xmetaki/ice-screen
```
### 业务代码使用 | Experience

```javascript
import IceScreen from '@xmetaki/ice-screen'
const canvas = xxx // 从外部获取的canvas
new IceScreen({
     //背景色 默认rgba(0, 0, 0, 0.7)
    "bgColor": "rgba(0, 0, 0, 1)",
    // 外部输入的canvas
    "input": canvas,
}).whenSuccess((imgs) => {
    // 针对截图生成的图片开始回调
}).
```

## 优势 | Advantage

1. 使用 `CSS-IN-JS` 提高的了易操作性
2. 完全基于 `typescript` 优雅的类型提示
3. 支持多种导入规范 `es`、`cjs` 、`umd`
4. `es`下按照源码结构输出，方便使用者按需引用,降低体积，隔离外部依赖，包体积降低
5. `umd`下将外部依赖联合bundle,降低通过`<script>`导入的负担 
6. 基于面向对象多种设计模式的开发，提供良好的拓展性

## TODO
1. 支持更加丰富的菜单功能
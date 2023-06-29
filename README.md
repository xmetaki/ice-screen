# ice-screen
A class library for web screenshots

## 初始化阶段
1. 初始化浏览器环境
2. 初始化canvas容器PaintContext上下文
3. 初始化截图Rect
4. 初始化截图按钮组

## 运行截图阶段
1. 解析：多个解析策略(目前仅支持canvas)
2. 转换：将图片转换成 fabric对象绘制到PaintContext
3. 绘制：根据当前容器进行绘制(都是相同的)
4. 导出：支持不同格式的输出
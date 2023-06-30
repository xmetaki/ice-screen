module.exports = {
    "bumpFiles": [
        {
            filename: "package.json",
            type: "json"
        },
    ],
    "types": [
        { "type": "init",      "section": "😶‍🌫️ Init | 初始化" },
        { "type": "feat",      "section": "✨ Features | 新功能" },
        { "type": "fix",       "section": "⛅ Bug Fixes | 漏洞修复" },
        { "type": "refactor",  "section": "😤 Code Refactoring | 代码重构" },
        { "type": "release",   "section": "🥳 Release |版本发布"},
        { "type": "depoly",    "section": "🏄 Deploy | 部署", "hidden":true },
        { "type": "ci",        "section": "👷 Continuous Integration | CI 配置" },
        { "type": "docs",      "section": "📖 Documentation | 文档" },
        { "type": "test",      "section": "✅ Tests | 测试" },
        { "type": "chore",     "section": "🚀 Chore | 构建/工程依赖/工具" },
        { "type": "style",     "section": "🦄 Styles | 风格" },
        { "type": "revert",    "section": "⏪ Revert | 回退", "hidden": true },
        { "type": "depend",    "section": "🧵 Dependency | 依赖调整" },
        { "type": "perf",      "section": "⚡ Performance Improvements | 性能优化" },
        { "type": "build",     "section": "📦‍ Build System | 打包构建" },
    ],
    "releaseCommitMessageFormat": "release(project): {{currentTag}}"
}
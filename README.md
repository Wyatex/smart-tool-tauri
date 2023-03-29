# smart-tool
一个简单的快捷方式管理工具，可以将一些常用文件、文件夹、网址、脚本加到里面进行管理，相对于wails版本，tarui支持Windows、Linux、MacOS，但是不支持系统原生窗体的深色浅色切换。

如果加进去的是某些文件路径比如`c:\myDoc.docx`文件将会调用系统默认打开程序进行打开，如果是目录就会直接打开文件管理器并进入某个目录，如果是网址将会使用默认浏览器打开，如果需要选择某个浏览器，可以将浏览器安装路径添加到PATH，然后用类似`chrome https://baidu.com`的格式填入即可选择浏览器，当然也可以编写一些脚本比如js脚本，通过node快速调用：`node c:\test.js`。

<p>
  <a href="https://github.com/Wyatex/smart-tool-tauri/releases/latest">
    <img src="https://img.shields.io/github/v/release/Wyatex/smart-tool-tauri" />
  </a>
  <a href="https://github.com/Wyatex/smart-tool-tauri/actions">
    <img src="https://github.com/Wyatex/smart-tool-tauri/actions/workflows/build.yml/badge.svg" />
  </a>
</p>

## 技术栈

- 语言：Rust、TypeScript
- 打包工具：Tauri
- 前端框架：Vue
- UI 库：Navie-UI

## 使用方式

1. 安装 rust工具链、node1.16+
2. 下载项目，命令行打开到项目目录
3. 按照依赖：`pnpm i`
4. 启动 dev：`pnpm tauri dev`， 打包：`pnpm tauri build`，建议安装 upx，打包时通过upx进行压缩能大幅减少体积


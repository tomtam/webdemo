# weui的wepy示例-微信小程序版本

## 开发须知
1. 安装node，安装wepy 。
    `npm install wepy-cli -g`
2. 安装依赖包：
    `npm install`
3. 运行命令编译成小程序代码。生成目录`dist`
    开发调试命令：`npn run dev`
    发布测试命令：`npn run bulid`
    上线使用微信小程序命令工具发布到后台审核
4. 下载微信开发者工具，并打开项目下的dist目录。`APPID=`.

5. 点击【项目】去掉`es6转es5`的选项。点击【动作】里的【刷新】。然后点击【调试】。
6. 下载开发IDE工具vscode，并安装插件：`wpy-beautify`，`Vue 2 Snippets`,`vscode wxml`等。并在首选项【设置】里配置：
```json
 "files.associations": {
        "*.vue": "vue",
        "*.wpy": "vue",
        "*.wxml": "html",
        "*.wxss": "css"
    },
    "emmet.syntaxProfiles": {
        "vue-html": "html",
        "vue": "html"
    },
```
7. 开发目录是`src`。使用文件后缀`.wpy`。类似`vue`。
8. 结构目录主要是`components`，`images`，`mixins`，`pages`。尽量模块化，样式class使用业务模块名起头，`-`分割。
9. 详细的代码开发技能需要修炼小程序语法，vue语法，wepy开发规范等。
10. 本项目是参照weui的demo制作而成，方便wepy用户使用。在app.wpy中引入weui.wxss.
11. 在项目中，wx所有的功能和语法都是可以的。特别说明的是循环和事件。使用repeat和wx:for;使用@tap和bindtap都可以。
## issues 
1. <navigator>中url的问题。如果是wepy.component中使用，url路径是父级page页面的相对路径。
2. wx:for和@tap最好不要同时出现在一个view标签里
## 参考文档
[wpy开发文档](https://wepyjs.github.io/wepy/)
[小程序开发文档](https://mp.weixin.qq.com/debug/wxadoc/dev/index.html?t=2017327)
[VUE开发文档](https://cn.vuejs.org/v2/guide/index.html)



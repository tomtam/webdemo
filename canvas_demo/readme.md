简介<br/>
本项目使用canvas制作画布.<br/>

实现功能:<br/>
1,任意画线<br/>
2,文本输入<br/>
3,撤销上一步操作<br/>
4,恢复撤销的操作<br/>
5,还原为原图<br/>
6,放大,缩小<br/>
7,翻转,左90度,右90度<br/>
8,关闭保存<br/>
9,上传服务器<br/>
项目运行:<br/>
1,切换到命令行:npm install<br/>
2,运行:npm start<br/>
项目经验分享:<br/>
1,遇到的问题<br/>
2,设计思路及解决方案<br/>
3,图片跨越问题:<br/>
前端:<img src="" id="imgclcd" crossorigin="anonymous"><br/>


服务端:响应头中就会附加上 Access-Control-Allow-Origin: * 字段，问题解决。<br/>
4,放大,缩小图片失真问题.
5,图片旋转90度问题,旋转后放大后找不到图片问题.
6,画线,文本偏移鼠标坐标问题,页面滚动后定位不准的问题.
项目计划:<br/>
1,使用d3实现,d3的canvas和svg各一<br/>
2,使用react,es6语法实现<br/>
参考文献:<br/>
w3c的参考手册:api:http://www.w3school.com.cn/tags/html_ref_canvas.asp<br/>
MND:https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial<br/>
图片上传:http://blog.csdn.net/renfufei/article/details/9836317<br/>

d3学习:http://www.ourd3js.com/wordpress/100/<br/>

项目截图:<br/>

 ![image](https://github.com/webdzq/webdemo/raw/master/canvas_demo/canvasimg.png)<br/>


项目成品截图:<br/>
![image](https://github.com/webdzq/webdemo/raw/master/canvas_demo/imges_canvas.png)<br/>
改版后，<br/>

![image](https://github.com/webdzq/webdemo/raw/master/canvas_demo/canvas_newversion.png)

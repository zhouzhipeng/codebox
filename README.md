# gogo
This a tool box for programmers.


## github action build with pyinstaller on macos and windows
https://data-dive.com/multi-os-deployment-in-cloud-using-pyinstaller-and-github-actions


## fetch
```javascript
let data = new URLSearchParams();
data.append("id", note.id);
data.append("note",note.text);
data.append("timestamp", note.timestamp);
data.append("left",note.left);
data.append("top", note.top);
data.append("zindex", note.zIndex);
fetch('/tables/WebKitStickyNotes/update', {method: "POST",headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}, body: data})

```



## trojan protocol:  
https://trojan-gfw.github.io/trojan/protocol.html


## local dev
```bash
# go startup env
DISABLE_LOG_FILE=1;DONT_START_PY=1

# python startup env
PYTHONUNBUFFERED=1;FILE_UPLOAD_PATH=C:\Users\ZHOUZH~1\AppData\Local\Temp\gogo_files
```

## mail server (receive only)
[see doc](https://notes.eatonphil.com/handling-email-from-gmail-smtp-protocol-basics.html)
https://github.com/kirabou/parseMIMEemail.go



## TODO
- [x] go embed 文件直接读取 (主要用于展示首页框架页面)
- [x] iframe 页面结构 
- [x] 获取系统剪贴板(快捷复制粘贴)
- [x] [废弃]vue 绑定剪贴板数据
- [x] js端封装通用ajax请求方法。 js--> go
- [x] [废弃]js端vue做数据绑定渲染
- [x] [废弃]www.zhouzhipeng.com gogo server 导航
- [x] 中英翻译功能
- [x] win box https://github.com/nextapps-de/winbox
- [x] button style : https://www.runoob.com/try/try.php?filename=bootstrap3-button-options
- [x] dropdown menu :  https://www.runoob.com/try/try.php?filename=bootstrap3-dropdown-basic&basepath=0
- [x] sql runner page see : https://www.runoob.com/try/try.php?filename=bootstrap3-dropdown-basic&basepath=0  (page structure)
- [x] (用div 加属性 contentediable=true轻松解决) http://jsfiddle.net/viliusl/xq2aLj4b/5/ 记事本 图片粘贴 
- [x] mp3 可视化 ，参考：https://codepen.io/heonie/pen/dBLYOP
- [x] mp3 歌词 ：http://lusaisai.github.io/Lyricer/
- [ ] settings page : add open media setting.
- [ ] 自动解压下载目录
- [ ] 加密存储内容 ，不保存密钥
- [ ] html5 postman tool (https://github.com/ravigithub19/postman-clone)
- [ ] https://github.com/mholt/archiver 压缩解压工具
- [ ] 文件拖拽直接打开 （自动识别文本和二进制)
- [ ] https://codemirror.net/mode/shell/



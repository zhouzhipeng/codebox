# codebox
This is a tool box for programmers. 

![img.png](doc/imgs/main_screen.png)
![img.png](doc/imgs/main_screen2.png)

currently tools:
* sqlite db browser
* functions editor
* tables editor
* pages editor
* string template 
* sql runner



## features
[features](doc/features.md)

## debian install
Currently support Debian buster (10)
```bash
curl -sSL https://raw.githubusercontent.com/zhouzhipeng/codebox/master/scripts/install_codebox_on_debian10.sh | sudo bash
```

## docker image
```bash
docker pull zhouzhipeng/codebox:latest
```

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
start golang module: go build codebox, then start web.py  (pip install -r requirements.txt)

## mail server (receive only)
[see doc](https://notes.eatonphil.com/handling-email-from-gmail-smtp-protocol-basics.html)
https://github.com/kirabou/parseMIMEemail.go


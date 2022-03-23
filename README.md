# gogo

html5 browser 


## cross build desktop 
```bash
CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build main.go
CGO_ENABLED=0 GOOS=windows GOARCH=amd64 go build main.go
CGO_ENABLED=0 GOOS=darwin GOARCH=amd64 go build main.go

```


## TODO

- [x] go embed 文件直接读取 (主要用于展示首页框架页面)
- [x] iframe 页面结构 
- [x] 获取系统剪贴板(快捷复制粘贴)
- [ ] vue 绑定剪贴板数据
- [ ] js端封装通用ajax请求方法。 js--> go
- [ ] js端vue做数据绑定渲染
- [ ] go端简单通用的crud
- [ ] tool.zhouzhipeng.com gogo server 导航
- 



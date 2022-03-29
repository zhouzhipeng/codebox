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
- [x] [废弃]vue 绑定剪贴板数据
- [x] js端封装通用ajax请求方法。 js--> go
- [x] [废弃]js端vue做数据绑定渲染
- [x] [废弃]www.zhouzhipeng.com gogo server 导航
- [ ] go+python best practice

## else
go template: http://books.studygolang.com/gowebexamples/templates/ 

go ffmpeg: https://gist.github.com/aperture147/ad0f5b965912537d03b0e851bb95bd38


## ffmpeg
```bash
# 获取视频缩略图
# eg. 如下命令用于截取视频第20秒的一帧,并生成图片
ffmpeg -i input.mp4 -ss 00:00:20.000 -vframes 1 generated.jpg

```


## sql runner example
```sql


-- sss
-- @ds=root:123456@tcp(192.168.0.109:3306)/mysql
select *
from


    p
```
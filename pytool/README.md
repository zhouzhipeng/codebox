# pytool


## 调试构建基础镜像
```bash
docker build -t zhouzhipeng/pytool-base-test -f base.Dockerfile .
```

## 构建基础镜像并上传docker hub
```bash
set -e
docker build -t zhouzhipeng/pytool-base -f base.Dockerfile .
docker push zhouzhipeng/pytool-base
```

## 生成requirements.txt
```bash
pip install pipreqs
pipreqs .  --force
```

## 安装依赖
```bash
pip install -r requirements.txt
```

## 生产地址
[https://www.zhouzhipeng.com](www.zhouzhipeng.com)

## python本地开发最佳实践
1. 下载最新pycharm pro版
2. 项目下写好Dockerfile并构建出一个镜像A
3. pycharm 偏好设置中添加一个interpreter(on docker),基于步骤2中的A镜像 (一定要在这个时候配置好端口映射，因为后续启动项里配置的端口映射不起作用！可能是bug)
4. 步骤3中不要选使用Dockerfile来动态构建镜像，一定要自己构建好然后选择你的镜像。 不然会找不到sitepackage，并且ide里面编译也会有问题。 
5. 有依赖变更只需要重新build镜像，然后来回切换下ide右下角的interpreter。



## proto
```python
# 使用指南：
# # mac
# 1.brew install protobuf
#
# # ubuntu
#
# apt-get install protobuf-compiler
#
# 2.# 安装rust代码生成插件
#
# cargo install protobuf-codegen
#
# 3.# 将 ~/.cargo/bin 放入PATH
# 4.修改source_proto_path， target_rs_path 然后执行本脚本
#

import os
import subprocess
import shutil

source_proto_path = "/Users/zhouzhipeng/IdeaProjects/binance/delivery/delivery-me-messages/src/main/proto"
target_rs_path = "/Users/zhouzhipeng/IdeaProjects/delivery/delivery-rust-me-logging/src/proto"


shutil.rmtree(target_rs_path)
os.makedirs(target_rs_path)

os.chdir(source_proto_path)

cwd = os.getcwd()
os.chdir(source_proto_path)

output = subprocess.run("protoc --rust_out " + target_rs_path + " *.proto", shell=True, check=True, capture_output=True)
print(output)

os.chdir(cwd)
#


rs_files = os.listdir(target_rs_path)
ss = list(map(lambda f: "pub mod " + f[:-3] + ";", rs_files))
result = "\n".join(ss)
open(target_rs_path + '/mod.rs', 'w').write(result)

```

## proto example 
```text
syntax = "proto2";

message Person {
  required string name = 1;
  required int32 age = 2;
  optional string email = 3;
}

```

## protoc 基本用法
```bash
# cd 到proto文件所在目录
protoc --rust_out . *.proto
# 上面命令会在当前目录生成所有proto文件对应的rs文件.
```


## 执行脚本如果需要输入 -y 可以这样跳过(sh 后面加上  -s -- -y)
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh  -s -- -y;
```


##test
```bash
set -eo pipefail

foo | echo a
echo bar
```


## 打包mac
```bash
python3 install pyinstaller
```


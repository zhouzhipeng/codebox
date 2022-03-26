set -eux

md5_str=`md5 requirements.txt | awk '{print $4}'`
df_md5_str=`md5 base.Dockerfile | awk '{print $4}'`
prefix=`echo ${md5_str:0:2}${df_md5_str:0:2}`
echo ${prefix}

docker build -t zhouzhipeng/pytool-base:${prefix} -f base.Dockerfile .

docker tag  zhouzhipeng/pytool-base:${prefix} zhouzhipeng/pytool-base
docker push zhouzhipeng/pytool-base

docker push zhouzhipeng/pytool-base:${prefix}

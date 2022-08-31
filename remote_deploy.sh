#!/bin/bash
#   rm -rf /tmp/gogo.db; \
 ssh root@korea.zhouzhipeng.com "set -eux ; \
  cd /root; \
  systemctl stop gogo ; \
  rm -rf /tmp/_MEI* ; \
  rm -rf /tmp/gogo.db; \
  rm -rf /tmp/message.txt ; \
  docker pull zhouzhipeng/gogo ; \
  docker run -d  --name gogo-test zhouzhipeng/gogo ; \
  docker cp gogo-test:/tmp/web . ; \
  docker cp gogo-test:/tmp/gogo gogo ; \
  docker rm -f gogo-test ;\
  systemctl start gogo ; \
  systemctl status gogo ; \
  tail -f /tmp/message.txt ; \
 "
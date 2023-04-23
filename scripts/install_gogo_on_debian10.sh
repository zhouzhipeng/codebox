#!/bin/sh

## run me : curl -sSL https://raw.githubusercontent.com/zhouzhipeng/public/main/install_gogo.sh | sudo bash

set -eux 

cd /root

curl -sSL  https://github.com/zhouzhipeng/gogo/releases/download/latest/gogo_debian.zip --output gogo_debian.zip
curl -sSL https://github.com/zhouzhipeng/public/releases/download/1.0/gogo --output gogo
curl -sSL https://github.com/zhouzhipeng/public/releases/download/1.0/web --output web

chmod +x gogo web

# register service
# curl -sSL https://raw.githubusercontent.com/zhouzhipeng/public/main/gogo.service --output /etc/systemd/system/gogo.service
cat > /etc/systemd/system/gogo.service << EOF
[Unit]
Description=GoGo Service
After=network.target

[Service]
Environment="MAIN_PORT=80"
Environment="HTTPS_PORT=443"
Environment="IN_DOCKER=true"
Environment="BASE_DIR=/tmp"
Environment="TROJAN_PASSWORD=123456"
Environment="AUTO_REDIRECT_TO_HTTPS=true"
Environment="WHITELIST_ROOT_DOMAINS=zhouzhipeng.com"
Environment="START_MAIL_SERVER=true"
Environment="ENABLE_AUTH=true"
Environment="START_TROJAN_PROXY=false"
Environment="START_443_SERVER=true"

Type=simple
Restart=always
RestartSec=10
ExecStart=/root/gogo

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload

systemctl enable gogo.service

systemctl start gogo

systemctl status gogo
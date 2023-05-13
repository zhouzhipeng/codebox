#!/bin/sh

## run me : curl -sSL https://raw.githubusercontent.com/zhouzhipeng/gogo/master/scripts/install_gogo_on_debian10.sh | sudo bash

systemctl stop gogo
rm -rf /tmp/gogo.db

set -eux 

cd /root

rm -rf gogo web
curl -sSL https://github.com/zhouzhipeng/gogo/releases/download/latest/gogo --output gogo
curl -sSL https://github.com/zhouzhipeng/gogo/releases/download/latest/web --output web

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
Environment="BASE_DIR=/tmp"
Environment="TROJAN_PASSWORD=123456"
Environment="AUTO_REDIRECT_TO_HTTPS=true"
Environment="WHITELIST_ROOT_DOMAINS=zhouzhipeng.com"
Environment="START_MAIL_SERVER=false"
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

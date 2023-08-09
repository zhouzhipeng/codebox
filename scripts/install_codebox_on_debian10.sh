#!/bin/sh

## run me : curl -sSL https://raw.githubusercontent.com/zhouzhipeng/codebox/master/scripts/install_codebox_on_debian10.sh | sudo bash

systemctl stop codebox
rm -rf /tmp/gogo.db

set -eux 

cd /root

rm -rf codebox web
curl -sSL https://github.com/zhouzhipeng/codebox/releases/download/latest/codebox --output codebox
curl -sSL https://github.com/zhouzhipeng/codebox/releases/download/latest/web --output web

chmod +x codebox web

# register service
# curl -sSL https://raw.githubusercontent.com/zhouzhipeng/public/main/codebox.service --output /etc/systemd/system/codebox.service
cat > /etc/systemd/system/codebox.service << EOF
[Unit]
Description=codebox Service
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
ExecStart=/root/codebox

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload

systemctl enable codebox.service

systemctl start codebox

systemctl status codebox
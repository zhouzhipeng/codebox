set -eux

pip3.11 install -r requirements.txt --break-system-packages
pip3.11 install pyinstaller --break-system-packages
rm -rf web.spec build dist/web

#   --hidden-import=pandas   \
pyinstaller  --noconfirm  --console   --log-level "DEBUG"  \
   --hidden-import=sqlite3   \
   --hidden-import=qrcode   \
   --hidden-import=pycron   \
   --hidden-import=cheroot   \
   --hidden-import=psutil   \
   --hidden-import=jwt   \
   --hidden-import=redis   \
   --hidden-import=ecdsa   \
   --hidden-import=base58   \
   --hidden-import=pyminizip   \
   --hidden-import=dns.resolver   \
   --hidden-import=bit   \
   --hidden-import=openai   \
   --hidden-import=uncurl   \
   -c -F    web.py

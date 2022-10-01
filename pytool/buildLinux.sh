set -eux

pip install -r requirements.txt
pip install pyinstaller
rm -rf web.spec build dist/web

#   --hidden-import=pandas   \
pyinstaller  --noconfirm  --console  --collect-datas webssh   --log-level "DEBUG"  \
   --hidden-import=sqlite3   \
   --hidden-import=qrcode   \
   --hidden-import=pycron   \
   --hidden-import=kafka   \
   --hidden-import=snappy   \
   --hidden-import=cheroot   \
   --hidden-import=psutil   \
   --hidden-import=jwt   \
   --hidden-import=redis   \
   --hidden-import=ecdsa   \
   --hidden-import=base58   \
   --hidden-import=pyminizip   \
   --hidden-import=dns.resolver   \
   -c -F    web.py

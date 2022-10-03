set -eux

pip install -r requirements.txt
pip install pyinstaller
rm -rf web.spec build dist/web

#   --hidden-import=pandas   \
pyinstaller  --noconfirm  --console    --log-level "DEBUG"  \
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
   -c -F    web.py

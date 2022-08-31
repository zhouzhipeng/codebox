set -eux

pip install -r requirements.txt
pip install pyinstaller
rm -rf web.spec build dist/web


pyinstaller  --noconfirm  --console  --collect-datas webssh   --log-level "DEBUG" --add-data "lib:lib" \
   --hidden-import=sqlite3   \
   --hidden-import=qrcode   \
   --hidden-import=pandas   \
   --hidden-import=pycron   \
   --hidden-import=kafka   \
   --hidden-import=snappy   \
   --hidden-import=tornado   \
   --hidden-import=psutil   \
   --hidden-import=jwt   \
   --hidden-import=redis   \
   --hidden-import=ecdsa   \
   --hidden-import=base58   \
   --hidden-import=pyminizip   \
   --hidden-import=dns.resolver   \
   -c -F    web.py

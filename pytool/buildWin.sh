
pip install -r requirements.txt
pip install pyinstaller

rm -rf web.spec .eggs build dist/web.exe
pyinstaller --clean  --noconfirm   --noconsole   \
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
 --log-level "DEBUG"  -F  web.py

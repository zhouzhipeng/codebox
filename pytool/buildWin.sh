
pip install -r requirements.txt
pip install pyinstaller

rm -rf web.spec .eggs build dist/web.exe
pyinstaller --clean  --noconfirm --collect-datas coincurve   --noconsole   \
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
  --hidden-import=sqlparse   \
 --log-level "DEBUG"  -F  web.py

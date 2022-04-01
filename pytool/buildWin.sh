
#pip install pyinstaller

rm -rf web.spec .eggs build dist/web.exe
pyinstaller.exe  --noconfirm  --noconsole   --log-level "DEBUG"  -F  web.py

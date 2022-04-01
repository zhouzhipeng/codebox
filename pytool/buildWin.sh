
#pip install pyinstaller

rm -rf web.spec .eggs build dist/web.exe
pyinstaller.exe  --noconfirm  --console   --log-level "DEBUG"  -c -F  web.py


#pip install pyinstaller

rm -rf web.spec .eggs build dist/web.exe
pyinstaller.exe  --noconfirm  --console   --log-level "DEBUG"  -c -F --add-data "views;views" --add-data "static;static" web.py

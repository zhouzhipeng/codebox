
pip install pyinstaller

rm -rf .eggs build dist
pyinstaller.exe  --noconfirm  --console   --log-level "DEBUG"  -c -F --add-data "views;views" --add-data "static;static" web.py
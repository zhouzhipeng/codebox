

#pip install pyinstaller
rm -rf web.spec build dist/web

pyinstaller  --noconfirm  --console   --log-level "DEBUG"  -c -F   --add-data "views:views" --add-data "static:static" -p /Library/Frameworks/Python.framework/Versions/3.10/lib/python3.10/site-packages   web.py

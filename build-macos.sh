#!/bin/sh
set -eux

APP="gogo.app"
rm -rf dist/$APP
mkdir -p $APP/Contents/MacOS
mkdir -p $APP/Contents/Resources
CGO_ENABLED=0 GOOS=darwin go build -o $APP/Contents/MacOS/gogo
cat > $APP/Contents/Info.plist << EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>CFBundleExecutable</key>
	<string>gogo</string>
	<key>CFBundleIconFile</key>
	<string>icon.icns</string>
	<key>CFBundleIdentifier</key>
	<string>com.zhouzhipeng.gogo</string>
</dict>
</plist>
EOF
cp icons/icon.icns $APP/Contents/Resources/icon.icns

# copy python executable file
cp pytool/dist/web $APP/Contents/MacOS/web


mv $APP dist/$APP
cd dist && zip -r gogo_mac.zip gogo.app && rm -rf $APP
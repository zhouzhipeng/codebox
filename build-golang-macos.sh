#!/bin/sh

set -eux

mkdir -p dist


go get


APP="gogo.app"
rm -rf dist/$APP
mkdir -p $APP/Contents/MacOS
mkdir -p $APP/Contents/Resources
CGO_ENABLED=1 GOOS=darwin go build -o $APP/Contents/MacOS/gogo
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
	<!-- avoid showing the app on the Dock -->
  	<key>LSUIElement</key>
  	<string>1</string>
  	<!-- avoid having a blurry icon and text -->
    	<key>NSHighResolutionCapable</key>
    	<string>True</string>
</dict>
</plist>
EOF
cp icons/icon.icns $APP/Contents/Resources/icon.icns

# copy python executable file
cp pytool/dist/web $APP/Contents/MacOS/web


mv $APP dist/$APP
cd dist && zip -r9 gogo_mac.zip gogo.app && rm -rf $APP

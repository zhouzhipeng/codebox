#https://pypi.org/project/qrcode/

if __name__ == '__main__':
    import qrcode
    img = qrcode.make('Some data here')
    type(img)  # qrcode.image.pil.PilImage
    img.save("some_file.png")
import zlib


def compress(data: bytes, level=9) -> bytes:
    c = zlib.compressobj(level)
    bb = c.compress(data)
    bb += c.flush()
    return bb


def decompress(data: bytes) -> bytes:
    c = zlib.decompressobj()
    bb = c.decompress(data)
    bb += c.flush()
    return bb


if __name__ == '__main__':
    print()
    print(decompress(compress()))


import hashlib
import binascii
import ecdsa
import base58


def seed(f):
    return hashlib.sha256(f.encode("utf-8")).hexdigest()

def pub_key(secret_exponent):
    key = binascii.unhexlify(secret_exponent)
    s = ecdsa.SigningKey.from_string(key, curve = ecdsa.SECP256k1)
    return '04' + binascii.hexlify(s.verifying_key.to_string()).decode('utf-8')

def addr(public_key):
    output = []; alphabet = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
    var = hashlib.new('ripemd160')
    var.update(hashlib.sha256(binascii.unhexlify(public_key.encode())).digest())
    var = '00' + var.hexdigest() + hashlib.sha256(hashlib.sha256(binascii.unhexlify(('00' + var.hexdigest()).encode())).digest()).hexdigest()[0:8]
    count = [char != '0' for char in var].index(True) // 2
    n = int(var, 16)
    while n > 0:
        n, remainder = divmod(n, 58)
        output.append(alphabet[remainder])
    for i in range(count): output.append(alphabet[0])
    return ''.join(output[::-1])

def wif(secret_exponent):
    var80 = "80"+secret_exponent
    var = hashlib.sha256(binascii.unhexlify(hashlib.sha256(binascii.unhexlify(var80)).hexdigest())).hexdigest()
    return str(base58.b58encode(binascii.unhexlify(str(var80) + str(var[0:8]))), 'utf-8')

if __name__ == '__main__':
    exp = seed("ZjZlMGExZTJhYzQxOTQ1YTlhYTdmZjhhOGFhYTBjZWJjMTJhM2JjYzk4MWE5MjlhZDVjZjgxMGEwOTBlMTFhZWY2ZTBhMWUyYWM0MTk0NWE5YWE3ZmY4YThhYWEwY2ViYzEyYTNiY2M5ODFhOTI5YWQ1Y2Y4MTBhMDkwZTExYWVmNmUwYTFlMmFjNDE5NDVhOWFhN2ZmOGE4YWFhMGNlYmMxMmEzYmNjOTgxYTkyOWFkNWNmODEwYTA5MGUxMWFlZjZlMGExZTJhYzQxOTQ1YTlhYTdmZjhhOGFhYTBjZWJjMTJhM2JjYzk4MWE5MjlhZDVjZjgxMGEwOTBlMTFhZWY2ZTBhMWUyYWM0MTk0NWE5YWE3ZmY4YThhYWEwY2ViYzEyYTNiY2M5ODFhOTI5YWQ1Y2Y4MTBhMDkwZTExYWVmNmUwYTFlMmFjNDE5NDVhOWFhN2ZmOGE4YWFhMGNlYmMxMmEzYmNjOTgxYTkyOWFkNWNmODEwYTA5MGUxMWFlZjZlMGExZTJhYzQxOTQ1YTlhYTdmZjhhOGFhYTBjZWJjMTJhM2JjYzk4MWE5MjlhZDVjZjgxMGEwOTBlMTFhZWY2ZTBhMWUyYWM0MTk0NWE5YWE3ZmY4YThhYWEwY2ViYzEyYTNiY2M5ODFhOTI5YWQ1Y2Y4MTBhMDkwZTExYWVmNmUwYTFlMmFjNDE5NDVhOWFhN2ZmOGE4YWFhMGNlYmMxMmEzYmNjOTgxYTkyOWFkNWNmODEwYTA5MGUxMWFlZjZlMGExZTJhYzQxOTQ1YTlhYTdmZjhhOGFhYTBjZWJjMTJhM2JjYzk4MWE5MjlhZDVjZjgxMGEwOTBlMTFhZQ==")
    print(wif(exp))
    print(addr(pub_key(exp)))
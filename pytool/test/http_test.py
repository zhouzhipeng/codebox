import requests

src="我们昂首向前"

print(requests.post(url="https://api-free.deepl.com/v2/translate",
                    data={"auth_key": "dd039ec7-c394-cb4d-7894-f3bf631635e9:fx",
                          "text":src,
                          "target_lang": "EN"}
                    , headers={'Content-Type': 'application/x-www-form-urlencoded'}).text)
print(requests.post(url="https://api-free.deepl.com/v2/translate",
                    data={"auth_key": "dd039ec7-c394-cb4d-7894-f3bf631635e9:fx",
                          "text": src,
                          "target_lang": "ZH"}
                    , headers={'Content-Type': 'application/x-www-form-urlencoded'}).text)


print(f"""
{1}sdfsdsdf
""")
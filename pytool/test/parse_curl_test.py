import uncurl

curl ='''
curl 'https://www.google.com/complete/search?q=python%20parse%20curl&cp=0&client=desktop-gws-wiz-on-focus-serp&xssi=t&hl=zh-CN&authuser=0&pq=python%20parse%20curl&psi=hTVJYqL8K4-vmAWywoz4Cg.1648964997714&ofp=EAEysAEKDwoNQ3VybOi9rHB5dGhvbgobChlQeXRob24gcGFyc2UgY3VybCBjb21tYW5kChMKEXB5dGhvbiBjdXJs6K-35rGCCggKBlB5Y1VSTAoRCg9QeXRob24gcnVuIGNVUkwKDwoNQ3VybCB0byBmZXRjaAoJCgdDdXJsaWZ5CgwKCkN1cmwgdG8tR28KDgoMQ3VybCB0byBIVFRQChIKEFB5dGhvbi1tdWx0aXBhcnQQRw&newwindow=1&dpr=1.25' \
  -H 'authority: www.google.com' \
  -H 'pragma: no-cache' \
  -H 'cache-control: no-cache' \
  -H 'sec-ch-ua: " Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.84 Safari/537.36' \
  -H 'sec-ch-ua-arch: "x86"' \
  -H 'sec-ch-ua-full-version: "99.0.4844.84"' \
  -H 'sec-ch-ua-platform-version: "10.0.0"' \
  -H 'sec-ch-ua-bitness: "64"' \
  -H 'sec-ch-ua-model: ' \
  -H 'sec-ch-ua-platform: "Windows"' \
  -H 'accept: */*' \
  -H 'x-client-data: CIS2yQEIorbJAQjEtskBCKmdygEIqtLKAQi47coBCJShywEI6/LLAQie88sBCJ75ywEI5oTMAQiljswBCLafzAEI0KLMAQixpMwB' \
  -H 'sec-fetch-site: same-origin' \
  -H 'sec-fetch-mode: cors' \
  -H 'sec-fetch-dest: empty' \
  -H 'referer: https://www.google.com/' \
  -H 'accept-language: zh,en;q=0.9,zh-CN;q=0.8' \
  -H 'cookie: HSID=AiRgjYHadKZDHTXIp; SSID=AC9G8pvUrIqOgW8tw; APISID=iIf5HuuQVGJ19snc/A-P8JS5KmBiCIOJlZ; SAPISID=tIbQ58nudmzERj_b/AfIbtnWITP4Zca2lR; __Secure-1PAPISID=tIbQ58nudmzERj_b/AfIbtnWITP4Zca2lR; __Secure-3PAPISID=tIbQ58nudmzERj_b/AfIbtnWITP4Zca2lR; SEARCH_SAMESITE=CgQI_ZQB; SID=IQjqmF6KlIRLaz0mobLVvMz-sYVBbpz8_0ZXHOniXcJGEEt1dmHSwtax-hZRW100l1pK5w.; __Secure-1PSID=IQjqmF6KlIRLaz0mobLVvMz-sYVBbpz8_0ZXHOniXcJGEEt1_24CgsgeQygzsLqSmkVeCA.; __Secure-3PSID=IQjqmF6KlIRLaz0mobLVvMz-sYVBbpz8_0ZXHOniXcJGEEt1lnaSKd1s5pO_tOfxlVercg.; AEC=AVQQ_LDdXIBS1jSeQvw9E8qdu1T1E10QWQ9uFCVdYHuqTa-w64Ea8uvATA; NID=511=h990vwTXs6BxfDHkSRv6k3LoV4L2LDG_S7OCGTUkjKwD6_0lqFBi8NKY86zgZvylKEyJZvCBGzxfgKpKT5Vf8s3Zy_Sbr3a4yywoLGXtY6P5yjIiRSzKwvLtCDlMJ9uaAjkVFmEfrilLp9WNQ9vCMWpIKoMakVEHR8l-b_rR03Bc3mlQYrZR40vl2MMF6HpgR0zqpvXXZNIKLwCkGZA1BEDV1lGWyi6d3DG72BaslvhSjV2obE7vcSqNNg0knlbLt0h11lentT1zNtj1iqynFTNtrfmA-lY; 1P_JAR=2022-04-03-05' \
  --compressed

'''

print(uncurl.parse(curl))
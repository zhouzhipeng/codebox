## NAT (Reverse Proxy)
will reverse proxy for local services, domain should like 'xx.proxy.xx'

## Trojan server / client
will use port 443 

## Http/s Server (with autocert)

## Mail receiving server
listen for port 25 and insert emails into table 'email_inbox' (userdata.db)

## Common Proxy (using DNS txt record) 
add a TXT record like '127.0.0.1:8080' for a domain
(need to restart server if old TXT records changing)

## http git server
only git is needed to install in the machine where gogo server is , and no ui , no need to create repo first , just push & pull.
use like this : ` http://{gogo_server_ip}:{gogo_server_http_port}/git/{your_repo}.git`
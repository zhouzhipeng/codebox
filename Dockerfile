FROM scratch

COPY linux/gogo /bin/gogo
ENTRYPOINT ["/bin/gogo"]
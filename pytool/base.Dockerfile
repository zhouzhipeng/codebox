FROM python:3.10.2-slim-bullseye

# install protoc and protoc-gen-rust
RUN set -eux; \
    apt-get update; \
    apt-get install -y --no-install-recommends \
      gcc \
      libc-dev \
      protobuf-compiler \
      curl  \
      ; \
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh  -s -- -y; \
    export PATH="$HOME/.cargo/bin:$PATH"; \
    cargo install protobuf-codegen; \
    cp ~/.cargo/bin/protoc-gen-rust /usr/bin/protoc-gen-rust; \
    rustup self uninstall -y; \
    apt-get remove -y --auto-remove \
        curl \
        gcc \
        libc-dev \
        ; \
    apt-get -qq clean ; \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# install ffmpeg
COPY --from=jrottenberg/ffmpeg:5.0-scratch / /


# install python dependencies (put to the end of current file)
COPY requirements.txt .
RUN set -eux; \
    pip install -r requirements.txt;




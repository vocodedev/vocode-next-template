# Use the official micromamba image as a base
FROM docker.io/mambaorg/micromamba:1.5-jammy as base

# Create a new user '$MAMBA_USER' and set the working directory
COPY --chown=$MAMBA_USER:$MAMBA_USER api/environment.docker.yml /tmp/environment.yml

# Install the specified packages using micromamba
RUN micromamba install -y -n base -f /tmp/environment.yml && \
    micromamba clean --all --yes    

USER root
WORKDIR /usr/local/src

ARG VOCODE_USER=vocode
ARG VOCODE_UID=8476
ARG VOCODE_GID=8476

# Install the required system packages libssl1.1 to azure-cognitiveservices-speech
RUN apt update -y \
    && apt-get install -y build-essential libssl-dev ca-certificates libasound2 wget 

# Manual Install the libssl1.1 package
RUN wget -O - https://www.openssl.org/source/openssl-1.1.1w.tar.gz | tar zxf - && \
    cd openssl-1.1.1w && \
    ./config --prefix=/usr/local && \
    make -j $(nproc) && \
    make install_sw install_ssldirs && \
    ldconfig -v

ENV SSL_CERT_DIR=/etc/ssl/certs

RUN groupadd --gid $VOCODE_GID $VOCODE_USER && \
    useradd --uid $VOCODE_UID --gid $VOCODE_GID --shell /bin/bash --create-home $VOCODE_USER


FROM base AS builder
# Copy the rest of your application files into the Docker image
COPY --chown=$VOCODE_USER:$VOCODE_USER . /vocode
WORKDIR /vocode

# install and build the frontend
RUN PATH="/opt/conda/bin:${PATH}" npm install
RUN PATH="/opt/conda/bin:${PATH}" npm run build

FROM base AS runner
WORKDIR /vocode
#USER vocode
USER root

COPY --from=builder /vocode/public ./public
COPY --from=builder --chown=$VOCODE_USER:$VOCODE_USER /vocode/.next/standalone ./
COPY --from=builder --chown=$VOCODE_USER:$VOCODE_USER /vocode/.next/static ./.next/static
COPY --from=builder --chown=$VOCODE_USER:$VOCODE_USER /vocode/api ./api

ENV DOCKER_ENV="docker"

# # Expose the port your FastAPI app will run on
EXPOSE 3000

# Set build arguments
ARG BUILD_DATE
ARG VCS_REF
ARG VERSION

# Set labels
LABEL org.label-schema.build-date=$BUILD_DATE \
      org.label-schema.name="vocode" \
      org.label-schema.description="Vocode Docker Image" \
      org.label-schema.url="https://vocode.dev/" \
      org.label-schema.vcs-url="https://github.com/vocodedev" \
      org.label-schema.maintainer="seb@vocode.dev" \
      org.label-schema.vcs-ref=$VCS_REF \
      org.label-schema.vendor="Vocode" \
      org.label-schema.version=$VERSION

# Copy supervisord configuration file and start services
COPY docker/etc/supervisor/supervisord.conf /etc/supervisor/supervisord.conf
CMD ["supervisord", "-c", "/etc/supervisor/supervisord.conf"]

FROM node:12

RUN apt-get update && apt-get install -y \
    curl \
    git \
    vim \
    wget \
    zsh

ENV TERM xterm
ENV ZSH_THEME agnoster
RUN wget https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | zsh || true

RUN npm install -g @vue/cli

WORKDIR /app/root

# FROM python:3.9-slim-buster AS base
FROM public.ecr.aws/docker/library/python:3.12.0b4-slim-bullseye AS base


WORKDIR /usr/src/app

COPY . .



# Replace shell with bash so we can source files
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# make sure apt is up to date
RUN apt-get update --fix-missing
RUN apt-get install -y curl
# RUN apt-get install -y build-essential libssl-dev

ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 6.9.5

# Install nvm with node and npm
RUN curl https://raw.githubusercontent.com/creationix/nvm/v0.30.1/install.sh | bash \
    && source $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default

ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH      $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH




#RUN nvm install 6.9.5

RUN npm i body-parser@1.18.3 &&\
npm i --force canvas@1.6.13 &&\
npm i --force chart.js@2.8.0 &&\
npm i --force chartjs@0.3.24 &&\
npm i --force chartjs-node@1.7.1 &&\
npm i --force chartjs-plugin-datalabels@0.5.0 &&\
npm i --force cors@2.8.5 &&\
npm i --force dotenv@6.2.0 &&\
npm i --force express@4.16.4 &&\
npm i --force helmet@3.15.0 &&\
npm i --force morgan@1.9.1 &&\
npm i --force nodemon@1.19.4


EXPOSE 8080

CMD [ "npm", "start" ]

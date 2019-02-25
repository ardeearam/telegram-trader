FROM aaram/node:11.10.0

WORKDIR /home/app
COPY . /home/app

RUN /tmp/runner.sh npm install

ENTRYPOINT ["/tmp/runner.sh", "npm", "start"]

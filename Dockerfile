# Used for speed up usage of jerry-serverless tools
FROM node:18

# Used for install jerry private repo dependencies
ARG GIT_CREDENTIALS
# turn off recording video on CI to save on build time
ENV CYPRESS_VIDEO="false"
# trun off chromium download on CI to save on build time
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD="true"

# Install Docker
RUN curl -fsSLO https://get.docker.com/builds/Linux/x86_64/docker-17.03.1-ce.tgz && \
  tar --strip-components=1 -xvzf docker-17.03.1-ce.tgz -C /usr/local/bin

WORKDIR /jerry-serverless

# Install dependencies
COPY package.json package.json
COPY package-lock.json package-lock.json
COPY .npmrc .
COPY tools/plugins tools/plugins
COPY patches .
RUN git config --global url."$GIT_CREDENTIALS/".insteadOf ssh://git@github.com/
RUN npm ci

# Copy source code
COPY . .


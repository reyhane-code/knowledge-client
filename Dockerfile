FROM mortezahatamikia/base-node

WORKDIR /knowledge/src/app

COPY package.json ./

# COPY yarn.lock ./

RUN yarn install

COPY ./ ./

EXPOSE 3502

CMD npm run dev 
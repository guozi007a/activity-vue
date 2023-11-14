From node:19.9.0

WorkDir /app

COPY . .

RUN npm --registry https://registry.npmmirror.com/ i
RUN npm run build

CMD ["npm", "run", "start"]
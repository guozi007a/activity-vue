From node:19.9.0

WorkDir /app

COPY . .

RUN npm --registry https://registry.npmmirror.com/ i

CMD ["npm", "run", "start"]
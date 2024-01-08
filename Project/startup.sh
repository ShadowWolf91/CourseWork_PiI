#!/bin/sh

cd /app/server || exit
npx prisma migrate dev
npm start &

cd /app/client || exit

# npm run build
npm run dev
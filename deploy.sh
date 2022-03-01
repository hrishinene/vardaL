#!/bin/sh

D=/tmp/deploy$$;
echo "Temp Dir: $D"
cd $D
git clone git@github.com:hrishinene/vardaL.git
git fetch
git checkout shabdak_2
npm i
npm run build
rm -rf -v !("build"|"app.yaml")

gcloud app deploy --quiet
cd /tmp
rm -rf /tmp/deploy$$


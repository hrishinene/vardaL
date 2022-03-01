#!/bin/sh

D=/tmp/deploy$$;
cd $D
git clone XXX
git fetch
git checkout shabdak_2
npm i
npm run build
rm -rf -v !("build"|"app.yaml")

cloud XXX
cd /tmp
rm -rf /tmp/deploy$$


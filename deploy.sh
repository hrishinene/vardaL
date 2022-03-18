#!/bin/sh


D=/tmp/deploy$$;
echo "Temp Dir: $D"
mkdir $D
cd $D
echo "Cloning repository to directory: $D"
git clone git@github.com:hrishinene/vardaL.git
cd vardaL
git fetch
git checkout shabdak_3
gcloud config set project shabdak_3

echo "Running npm build"
npm i
npm run build
rm -rf -v !("build"|"app.yaml")

echo "Deploying to Google Cloud"
gcloud app deploy --quiet

echo "Deployment Done! Cleaning up!"
cd /tmp
rm -rf $D


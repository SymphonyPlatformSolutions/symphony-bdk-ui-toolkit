#!/bin/bash
git fetch origin
git checkout origin/feature/sparc-eq-derivatives
yarn build
mv ./dist ~/Desktop/.
git checkout origin/nightly
rm -rf dist/
mv ~/Desktop/dist dist
sed -i "" "s/\"version\": \".*\"/\"version\": \"$1\"/" package.json
git add .
git commit -m "$2"
# git push origin HEAD:nightly
# git tag v$1
# git push --tags
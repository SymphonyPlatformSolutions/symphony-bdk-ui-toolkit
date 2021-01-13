#!/bin/bash
if [ "$#" -ne 2 ]; then
    echo "USAGE: yarn create-release [patch|minor|major] \"your commit message\""
  exit 1
fi
git fetch origin
git checkout origin/feature/sparc-eq-derivatives
yarn --frozen-lockfile
yarn build
mv ./dist /tmp/dist-tmp
git checkout origin/nightly
rm -rf dist/
mv /tmp/dist-tmp dist
git add dist
npm version $1 -m "release %s - $2" -f
git push origin HEAD:nightly
git push --tags

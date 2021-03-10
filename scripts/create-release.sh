#!/bin/bash
# exit when any command fails
set -e

if [ "$#" -ne 2 ]; then
    echo "USAGE: yarn create-release [patch|minor|major] \"your commit message\""
  exit 1
fi
git fetch origin
yarn --frozen-lockfile
yarn build
rm -rf /tmp/bdk-build && mkdir -p /tmp/bdk-build
mv ./dist /tmp/bdk-build/.
mv package.json /tmp/bdk-build/
git checkout origin/nightly
rm -rf dist/
mv /tmp/bdk-build/dist dist
mv package.json /tmp/bdk-build/nightly-package.json
mv /tmp/bdk-build/package.json package.json
BDK_GOOD_VERSION=$(grep version /tmp/bdk-build/nightly-package.json)
BDK_WRONG_VERSION=$(grep version package.json)
sed -i '' "s/$BDK_WRONG_VERSION/$BDK_GOOD_VERSION/" package.json
git add dist package.json
npm version $1 -m "release %s - $2" -f
git push origin HEAD:nightly
git push --tags

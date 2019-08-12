#/bin/#!/usr/bin/env bash

rm -rf ~/demos
yarn build-storybook
mkdir ~/demos
mv storybook-static ~/demos
cd ~/demos/storybook-static
python -m SimpleHTTPServer

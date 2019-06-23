#!/bin/bash
# echo `jq '.name' data.json`
# if $appname; then
# echo $appname
# cat package.json | json-merge package.json package2.json --parse="dependencies"
touch .babelrc
echo '{
  "presets" : ["@babel/preset-env", "@babel/preset-react"]
}' > ./.babelrc
# mv package.json package1.json
# package-merge package1.json package2.json > package.json
# npm install
webpack-cli --entry  "./src//App.js"  --output-filename="App.bundle.js"
rm -rf dist
npm run build

cp -r node_modules dist/node_modules
ln -s ../app dist/node_modules/app

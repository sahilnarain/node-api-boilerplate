sed -i .bak "s/\${process.env.NODE_ENV}/"$NODE_ENV"/g" app/configs/config.js && sed -i .bak "s/\`/\'/g" app/configs/config.js
./node_modules/pkg/lib-es5/bin.js server.js --config package.json --out-path ./dist
rm app/configs/config.js.bak
git checkout app/configs/config.js

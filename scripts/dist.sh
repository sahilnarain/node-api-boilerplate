files=(server.js app/configs/config.js)

for file in "${files[@]}"
do
  sed -i .bak -e "s/\`\(.*\)\${process.env.NODE_ENV}\(.*\)\`/\'\1"$NODE_ENV"\2\'/g" "$file"
  rm "$file".bak
done

./node_modules/pkg/lib-es5/bin.js server.js --config package.json --out-path ./dist

for file in "${files[@]}"
do
 git checkout "$file"
done

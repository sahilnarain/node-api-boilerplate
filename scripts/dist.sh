if [ -n "$1" ] && [ "$1" != "--force" ] && [ "$1" != "-f" ]
then
  NODE_ENV="$1"
fi

PROJECT_NAME=node-api-boilerplate

unstaged_files=($(git diff --name-only))

if [ ${#unstaged_files[@]} -gt 0 ] && [ "${!#}" != "--force" ] && [ "${!#}" != "-f" ]
then
  echo 'Unsafe - stash unstaged files to avoid losing changes, or use -f or --force to continue';
  echo '  Usage: npm run dist -- [optional] [env] -f|--force ';
  echo '  Usage: npm run dist -- production --force';
  echo
  exit 1
fi

environment_files=($(grep -rl "process.env.NODE_ENV === '$NODE_ENV'" app/* *.js*))

for file in "${environment_files[@]}"
do
  sed -i.bak -e "s/process.env.NODE_ENV === '$NODE_ENV'/true/g" "$file"
  rm "$file".bak
done

files=($(grep -rl "process.env.NODE_ENV" app/* *.js*))

for file in "${files[@]}"
do
  sed -i.bak -e "s/\`\(.*\)\${process.env.NODE_ENV}\(.*\)\`/\'\1"$NODE_ENV"\2\'/g" "$file"
  rm "$file".bak
done

sed -i.bak -e 's/!fs.exists/\/\/!fs.exists/' server.js
rm server.js.bak

if [ ! -d 'dist' ]
then
  mkdir dist
fi

npm install
node scripts/build.js
echo "{\"main\": \".server.js\", \"output\":\"dist/blob.blob\"}" > dist/sea-config.json
node --experimental-sea-config dist/sea-config.json
cp $(command -v node) dist/$PROJECT_NAME  && npx postject dist/$PROJECT_NAME NODE_SEA_BLOB dist/blob.blob --sentinel-fuse NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2
rm .server.js
rm dist/blob.blob
rm dist/sea-config.json

for file in "${environment_files[@]}"
do
 git checkout "$file"
done

for file in "${files[@]}"
do
 git checkout "$file"
done

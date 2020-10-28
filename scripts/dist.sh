if [ -n "$1" ] && [ "$1" != "--force" ] && [ "$1" != "-f" ]
then
  NODE_ENV="$1"
fi

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
  sed -i .bak -e "s/process.env.NODE_ENV === '$NODE_ENV'/true/g" "$file"
  rm "$file".bak
done

files=($(grep -rl "process.env.NODE_ENV" app/* *.js*))

for file in "${files[@]}"
do
  sed -i .bak -e "s/\`\(.*\)\${process.env.NODE_ENV}\(.*\)\`/\'\1"$NODE_ENV"\2\'/g" "$file"
  rm "$file".bak
done

./node_modules/pkg/lib-es5/bin.js server.js --config package.json --out-path ./dist

for file in "${environment_files[@]}"
do
 git checkout "$file"
done

for file in "${files[@]}"
do
 git checkout "$file"
done

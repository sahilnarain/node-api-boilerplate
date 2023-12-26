./scripts/git-check.sh
if [ $? -eq 1 ]
then
  exit
fi
git stash -k -u
echo 'Running linter...'
./node_modules/eslint/bin/eslint.js . --fix-dry-run --quiet
if [ $? -eq 1 ]
then
  echo 'Commmit failed - one or more linting errors found.'
  echo
  git stash pop
  exit 1
fi
./node_modules/eslint/bin/eslint.js . --fix
./scripts/beautify.sh
./node_modules/eslint/bin/eslint.js .

#!/bin/bash

./scripts/git-check.sh
if [ $? -eq 1 ]
then
  exit
fi

git stash -k -u

echo 'Running code linter...'
./node_modules/eslint/bin/eslint.js . --fix-dry-run --quiet
if [ $? -eq 1 ]
then
  echo 'Commmit failed - one or more linting errors found.'
  echo
  git stash pop
  exit 1
fi

echo 'Running document linter...'
./node_modules/@stoplight/spectral-cli/dist/index.js lint docs/api/spec.yaml --ruleset spectral.yaml --quiet
if [ $? -eq 1 ]
then
  echo 'Commmit failed - one or more linting errors found in API spec.'
  echo
  git stash pop
  exit 1
fi

./node_modules/eslint/bin/eslint.js . --fix
./scripts/beautify.sh
./node_modules/eslint/bin/eslint.js .

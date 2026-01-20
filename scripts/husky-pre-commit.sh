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

echo "Running OpenAPI spec linter..."
./node_modules/@stoplight/spectral-cli/dist/index.js lint docs/api/API_Reference.yaml --ruleset spectral.yaml --quiet
if [ $? -eq 1 ]
then
  echo 'Commmit failed - one or more linting errors found in OpenAPI spec.'
  echo
  git stash pop
  exit 1
fi

echo "Running OpenAPI spec validator..."
node scripts/validate-docs.js
if [ $? -eq 1 ]
then
  echo 'Commmit failed - one or more validation errors found in OpenAPI spec.'
  echo
  git stash pop
  exit 1
fi

./node_modules/eslint/bin/eslint.js . --fix
./scripts/beautify.sh
./node_modules/eslint/bin/eslint.js .

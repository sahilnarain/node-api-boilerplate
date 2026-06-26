#!/bin/bash

echo "Running prettier..."
./node_modules/prettier/bin-prettier.js --config ./.prettierrc --write 'app/**/*.js' 'app/**/*.ts' 'types/**/*.ts' server.ts 'tests/**/**/*.js' --loglevel silent
git add $(git diff --name-only --diff-filter d | grep -E '\.(js|ts)$' | xargs)

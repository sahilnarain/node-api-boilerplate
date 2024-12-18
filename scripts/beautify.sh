echo "Running prettier..."
./node_modules/prettier/bin-prettier.js --config ./.prettierrc --write app/**/*.js tests/**/**/*.js --loglevel silent
git add $(git diff --name-only --diff-filter d | grep '\.js$' | xargs)

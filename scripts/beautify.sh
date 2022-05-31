./node_modules/prettier/bin-prettier.js --config ./.prettierrc --write app/**/*.js tests/**/**/*.js
git add $(git diff --name-only --diff-filter d | grep '\.js$' | xargs)

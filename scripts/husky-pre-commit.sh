./scripts/git-check.sh
if [ $? -eq 1 ]
then
  exit
fi
git stash -k -u
./node_modules/eslint/bin/eslint.js . --fix
./scripts/beautify.sh

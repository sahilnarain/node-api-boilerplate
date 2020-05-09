./scripts/git-check.sh
if [ $? -eq 1 ]
then
  exit
fi
git stash -k -u
./scripts/beautify.sh

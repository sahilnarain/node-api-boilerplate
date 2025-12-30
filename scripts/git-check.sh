#!/bin/bash

echo "Checking git version..."

MIN_GIT_VERSION=2.22.0
GIT_VERSION=`git --version | sed -n -e 's/git\ version\ \(.*\)/\1/p'`

MAJOR_VERSION=`echo $GIT_VERSION | sed 's/\([0-9]*\)\.\([0-9]*\)\.\([0-9]*\)/\1/'`
MINOR_VERSION=`echo $GIT_VERSION | sed 's/\([0-9]*\)\.\([0-9]*\)\.\([0-9]*\)/\2/'`
PATCH_VERSION=`echo $GIT_VERSION | sed 's/\([0-9]*\)\.\([0-9]*\)\.\([0-9]*\)/\3/'`

MIN_MAJOR_VERSION=`echo $MIN_GIT_VERSION | sed 's/\([0-9]*\)\.\([0-9]*\)\.\([0-9]*\)/\1/'`
MIN_MINOR_VERSION=`echo $MIN_GIT_VERSION | sed 's/\([0-9]*\)\.\([0-9]*\)\.\([0-9]*\)/\2/'`
MIN_PATCH_VERSION=`echo $MIN_GIT_VERSION | sed 's/\([0-9]*\)\.\([0-9]*\)\.\([0-9]*\)/\3/'`

if [ $MAJOR_VERSION -lt $MIN_MAJOR_VERSION ]
then
  echo "Current git version is $GIT_VERSION, upgrade to $MIN_GIT_VERSION to continue."
  exit 1
elif [ $MAJOR_VERSION -ge $MIN_MAJOR_VERSION ] && [ $MINOR_VERSION -lt $MIN_MINOR_VERSION ]
then
  echo "Current git version is $GIT_VERSION, upgrade to $MIN_GIT_VERSION to continue."
  exit 1
fi

echo "git version OK"

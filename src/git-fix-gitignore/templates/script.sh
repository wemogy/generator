#!/bin/bash
git pull --all
git checkout main

# Rename all tags
tags=$(git tag)
for tag in $tags; do
  git tag v${tag} $tag
  git tag -d $tag
  git push origin v${tag} :$tag
done

git pull --prune --tags

# Rename all branches
branches=$(git branch --all -r --format='%(refname:short)' | grep "release/" | sed 's/origin\/release\///')
for branch in $branches; do
  git checkout "release/$branch"
  git branch -m "release/v${branch}"
  git push origin -u "release/v${branch}"
  git push origin --delete "release/$branch"
done

git checkout main

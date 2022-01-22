# Creative coding website
## an ongoing research seminar that is itself an experiment in creative coding
https://creativecoding.xyz/

# Documentation - yarn commands
```yarn clone_repo```
  - will run cc_install_repo.sh
  - git clone wrapper; using an array of repositories selected for publishing
  :+todo it is suboptimal to install from scratch every time

```yarn clone_notes```
  - will run cc_clone_notes.sh
  - copy files from specific directory 
  :+todo the clone and build steps are needed as separate entity but it's not very intuitive; it would be good to have a specific command to simply update the website with new notes

```yarn build_notes```
  - will run cc_build_notes.sh
  - wrapper for php script that build pages out of markdown files and images in folders

```yarn build```
  - will run cc_build.sh
  - wrapper for php script that build html pages for/from the git repositories that were cloned

```yarn publishing```
  - will run cc_publish.sh
  - git commit and push to remote repositories; the ./docs is used to serve documents via Github pages
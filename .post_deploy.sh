#!/bin/bash

# Need to remove lots of directories and files that are no longer needed once the site has been deployed
# This script is a hidden file so should NOT be allowed to be seen in a browser!
# MUST be run from within the root of the site folder

echo -e "Removing Non-Essential files form the site directory"

rm -Rfv .git
rm -v .gitignore
rm -v .nojekyll
rm -v config.codekit
rm -v gulpfile.js
rm -Rfv node_modules
rm -v package.json
rm -Rfv src


echo -e "Completed removing files. Please ensure only the following remain:"
echo -e ".post_deploy.sh, assets (dir), index.html"

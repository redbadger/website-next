#!/bin/bash

#Lightweight script to automatically detect and install the required Node version in Elastic Beanstalk
#This does this by parsing the .nvrmc file
#To run the script, you must supply the path to the application like this ./install-node.sh "/tmp/deployment/application"
#To see more details about the script, see the blog post here https://thesauceco.de/blog/Automatically-install-custom-Node-for-Meteor-in-Elastic-Beanstalk/

APP_DIR=$1
WORKING_DIR=/tmp/deployment
DEST_DIR=/opt/elasticbeanstalk/node-install
APPDIR_STRING_LENGTH=${#APP_DIR}

#Check to make sure the application path has been supplied.
if [[ -z "${APP_DIR+x}" || $APPDIR_STRING_LENGTH < 1 ]]; then
  echo "ERROR: You must supply the path to the application directory as the first parameter of the script. For example ./install-node.sh /tmp/deployment/application"
  exit 2
fi

#Function to perform Node configuration after version has been downloaded or if it is already unpacked
perform_node_configuration(){
  echo "INFO: Running configuration for node on elasticbeanstalk"
  #Update path in nodejs upstart config to point at new node env
  sed -i "s/\(env NODE_HOME=\)\(.*$\)/\1\"$ESCAPED_NEW_NODE_PATH\"/g" /tmp/deployment/config/#etc#init#nodejs.conf
  #Create symlinks, overwrite existing links if they exist
  ln -s -f "$NEW_NODE_PATH/bin/node" /usr/local/bin/node
  ln -s -f "$NEW_NODE_PATH/bin/npm" /usr/local/bin/npm
  echo "SUCCESS: Node $NODE_VERSION installed."
}

#Get node version from .nvrmc
NODE_VERSION="v$(cat $APP_DIR/.nvmrc)"
NODE_FULLNAME="node-$NODE_VERSION-linux-x64"
NODE_STRING_LENGTH=${#NODE_VERSION}

#Check to make sure the script was able to retreive a version
if [[ -z "${NODE_VERSION+x}" || $NODE_STRING_LENGTH < 1 ]]; then
  echo "ERROR: Unable to detect node version from the application in $APP_DIR."
  exit 2
fi

#Construct filename and path to download from nodejs.org
NODE_FILENAME="$NODE_FULLNAME.tar.gz"
NEW_NODE_PATH="$DEST_DIR/$NODE_FULLNAME"
ESCAPED_NEW_NODE_PATH=$(echo "$NEW_NODE_PATH" | sed -e 's/[\/&]/\\&/g')
DIST_URL="http://nodejs.org/dist/$NODE_VERSION/$NODE_FILENAME"

#Check to see if the node version has already been installed
if [ -d "$DEST_DIR/$NODE_FULLNAME" ]; then
  echo "INFO: Node $NODE_VERSION is already installed."
  perform_node_configuration
  exit 0
fi

URL_TEST=$(curl -I  --stderr /dev/null $DIST_URL | head -1 | cut -d' ' -f2)

#Make sure URL is responding before initiating download, unpack and copy
if [ "$URL_TEST"="200" ]; then
  echo "INFO: URL Check successful - starting download from $DIST_URL"
  cd $WORKING_DIR
  wget $DIST_URL
  tar -zxf $NODE_FILENAME
  mv $NODE_FULLNAME $DEST_DIR
  perform_node_configuration
else
  echo "ERROR: $DIST_URL is not currently responding."
  echo "DEBUG: The URL was built using the following node version $NODE_VERSION"
fi




#!/bin/sh

BASE_URL=${PORTAINER_URL}
AUTH_URL=${BASE_URL}/api/auth
SERVICE_ACCOUNT=account.json
REDEPLOY_JSON=redeploy.json
IMAGE_URL=${BASE_URL}/api/endpoints/2/docker/images/create
REDEPLOY_URL=${BASE_URL}/api/stacks/:STACKID/git/redeploy?endpointId=2
CURL=$(which curl)
STACKID=${PORTAINER_STACK_ID}
login () {
    ${CURL} -s $AUTH_URL -d @${SERVICE_ACCOUNT} | jq '.jwt' | sed 's/"//g'
}

redeployGit () {
    URL=`echo ${REDEPLOY_URL} | sed "s|:STACKID|$STACKID|g"`
    TOKEN=$1
     echo $URL
      ${CURL} -s ${URL} \
        -X 'PUT' \
        -vv \
  -H 'Content-Type: application/json' \
    -H "Authorization: Bearer ${TOKEN}" \
    -d @${REDEPLOY_JSON}
}
pullImage () {
    echo "Pulling Image"
    TOKEN=$1
    IMAGE_NAME=$2
    URL="$IMAGE_URL?fromImage=${IMAGE_NAME}"
    ${CURL} -s -X POST  ${URL}\
    -H "Authorization: Bearer ${TOKEN}"\
    -H "X-Registry-Auth: ${REGISTRY_AUTH}" 
}

grabServicesImagesFromEnvironmentAndPull() {
    API_TOKEN=$1
    $(which env) | grep -E [A-Z].*_IMAGE_NAME | while read line;do
        IMAGE_NAME=`echo $line | awk -F'=' '{print $2}'`
        echo "Pulling Image.... ${IMAGE_NAME}"
        pullImage $API_TOKEN $IMAGE_NAME
    done
    echo "Redeploying Service...."
    redeployGit $API_TOKEN
}

main () {
    if [ -z  "$PORTAINER_URL" ];then
        echo "PORTAINER URL not found ... please expor the URL and run the command again"
        exit 1
    fi
    if [ ! -f ${SERVICE_ACCOUNT} ];then
        echo "Service account file not found"
        exit 1
    fi
    echo -e "Generating Token"
    API_TOKEN=$(login)
    echo "Pulling New Image and Redeploying"
    grabServicesImagesFromEnvironmentAndPull ${API_TOKEN}

}

main

#!/bin/sh

# echo "Running migration ..."
# yarn migration:run

# if [[ $? -eq 0 ]]
# then
#   yarn start:prod
# fi

set -e
sleep 20
exec "$@"
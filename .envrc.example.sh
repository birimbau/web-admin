# Rename this file as .envrc
# in the root of your project

# App
export PHOTION__HTTP__PROTO="http"
export PHOTION__HTTP__HOST="localhost"
export PHOTION__HTTP__PORT="3000"
export PHOTION__HTTP__BASE_URL="$PHOTION__HTTP__PROTO://$PHOTION__HTTP__HOST:$PHOTION__HTTP__PORT"

# Cypress
export CYPRESS_BASE_URL=$PHOTION__HTTP__BASE_URL

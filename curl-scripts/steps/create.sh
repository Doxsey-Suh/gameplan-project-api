#!/bin/bash

API="http://localhost:4741"
URL_PATH="/steps"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "step": {
      "text": "'"${TEXT}"'",
      "goalId": "'"${GOAL_ID}"'"
    }
  }'

echo

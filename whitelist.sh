
if [[ $JOB_NAME = *PR-* ]]
then

NUMBER=$(echo "$JOB_NAME" |  grep -o -E '[0-9]+')

echo "PR Number $NUMBER"
echo "Will try and whitelist https://xui-ao-webapp-pr-${NUMBER}.service.core-compute-preview.internal/oauth2/callback"

PARAM="{
   \"operation\": \"add\",
   \"field\": \"redirect_uri\",
  \"value\": \"https://xui-ao-webapp-pr-${NUMBER}.service.core-compute-preview.internal/oauth2/callback\"
}"

curl -v -X PATCH \
 https://idam-api.aat.platform.hmcts.net/testing-support/services/XUIAO \
 -H 'Accept: application/json' \
 -H 'Content-Type: application/json' \
 -d "[${PARAM}]"

fi




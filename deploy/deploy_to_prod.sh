source /Users/dilshathewzulla/workspace/global-input/global-input-secrets/prod.sh
echo "deploying the version 2.0.9-SNAPSHOT to root@node1.globalinput.co.uk using the property file /Users/dilshathewzulla/workspace/global-input/global-input-secrets/prod.sh (for replacement of the environment specific variables) ..."
deploy/deploy.sh node1.globalinput.co.uk root 2.0.9-SNAPSHOT

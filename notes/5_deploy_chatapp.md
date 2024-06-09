# Deploy the NodeJS Chat Application

## Github Repository Auth config

This step needs to be done because the repository of our Chats App is private

### Generate the SSH Key pair

```bash
# Command used to create the SSH Key pair
#ssh-keygen -t ed25519 -C "Key to access repo from OpenShift"
# this command is already done
```

### Adding them to Github Repo

Settings > Deploy keys > Add deploy key
(> done)

### Create a Secret to authenticate on Github

```bash
# Create a Secret Using with the Private Key:
oc create secret generic github-deploy-key --from-file=ssh-privatekey=./keys/githubDeploy --type=kubernetes.io/ssh-auth

# Link the Secret to the Service Account
oc secrets link builder github-deploy-key --for=pull
```

## Deploy the Application

### Automatically with new-app command

```bash
# Create a New Application
oc new-app nodejs~git@github.com:dominiksaul/HEIG-VD-cld-chatapp.git --name=chat-app

# The build of the pod will fail, the secret needs to be still added
# command to specify the source secret
oc patch bc/chat-app -p '{"spec":{"source":{"sourceSecret":{"name":"github-deploy-key"}}}}'

# apply config map
oc apply -f ./configs/configmap-chatapp.yaml
# specify config map
oc set env --from=configmap/chatapp-config deployment/chat-app


# command to trigger a new build
oc start-build chat-app

# Verify Deployment and check the status of your application
oc logs -f buildconfig/chat-app
oc status

# Expose the Service
oc expose svc/chat-app
# Enable TLS
oc patch route/chat-app -p '{"spec":{"tls":{"termination":"edge"}}}'
```

### Manually with the YAML configuration files

! We did use the command new-app to create the application !

```bash
# apply the image stream
oc apply -f ./configs/imagestream-chatapp.yaml
oc tag is/chat-app chat-app:latest

# TODO error in this config
# The ImageStreamTag "chat-app:latest" is invalid: from: Error resolving ImageStreamTag chat-app:latest in namespace dominik-dev: unable to find latest tagged image
# apply the build config
oc apply -f ./configs/buildconfig-chatapp.yaml 

# start the build
oc start-build chat-app

# apply the deployment
oc apply -f ./configs/deployment-chatapp.yaml

# apply the service
oc apply -f ./configs/service-chatapp.yaml

# apply the route
oc apply -f ./configs/route-chatapp.yaml
```

### Check the deployment

```bash
oc status
oc get builds
oc get pods
oc get svc
oc get routes
```

### Optional useful commands

```bash
# Commands to delete created resources in case of an error
oc delete configmap/chatapp-config
oc delete istag/chat-app:latest
oc delete bc/chat-app
oc delete deployment/chat-app
oc delete svc/chat-app
oc delete route/chat-app

# Command to get the configurations as yaml files
oc get bc/chat-app -o yaml > ./configs/bc-chat-app.yaml
# Command to apply the configuration after the yaml files are updated
oc apply -f ./configs/bc-chat-app.yaml
```

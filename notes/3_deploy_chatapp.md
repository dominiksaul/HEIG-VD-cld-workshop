# Github Repository Auth config
This step needs to be done because the repository of our Chats App is private

## Generate the SSH Key pair
```bash
# Command used to create the SSH Key pair
#ssh-keygen -t ed25519 -C "Key to access repo from OpenShift"
# this command is already done
```

## Adding them to Github Repo
Settings > Deploy keys > Add deploy key
(> done)

## Create a Secret to authenticate on Github
```bash
# Create a Secret Using with the Private Key:
oc create secret generic github-deploy-key --from-file=ssh-privatekey=./keys/id_ed25519 --type=kubernetes.io/ssh-auth

# Link the Secret to the Service Account
oc secrets link builder github-deploy-key --for=pull
```

# Deploy the NodeJS Chat Application

```bash
# Create a New Application
oc new-app nodejs~git@github.com:dominiksaul/HEIG-VD-cld-chatapp.git --name=chat-app

# The build of the pod will fail, the secret needs to be still added
# command to specify the source secret
oc patch bc/chat-app -p '{"spec":{"source":{"sourceSecret":{"name":"github-deploy-key"}}}}'
# command to trigger a new build
oc start-build chat-app

# Verify Deployment and check the status of your application
oc logs -f buildconfig/chat-app
oc status

# Expose the Service
oc expose svc/chat-app




# Commands to delete created resources in case of an error
oc delete deployment/chat-app
oc delete istag/chat-app:latest
oc delete bc/chat-app
oc delete svc/chat-app

# Command to get the configurations as yaml files
#oc get bc/chat-app -o yaml > ./configs/bc-chat-app.yaml

# Command to apply the configuration after the yaml files are updated
#oc apply -f ./configs/bc-chat-app.yaml
```
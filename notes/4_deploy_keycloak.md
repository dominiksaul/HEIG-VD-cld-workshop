# Deploy Keycloak

## Configure TLS Certificate

```bash
# create certificate
openssl req -x509 -nodes -newkey rsa:4096 -keyout keys/key.pem -out keys/cert.pem -days 365

# add certificate to openshift
oc create secret tls keycloak-tls-secret --cert=keys/cert.pem --key=keys/key.pem
```

## Manually with the YAML configuration files

```bash
# apply config map
oc apply -f ./configs/configmap-keycloak.yaml

# apply deployment
oc apply -f ./configs/deployment-keycloak.yaml

# apply service
oc apply -f ./configs/service-keycloak.yaml

# apply route
oc apply -f ./configs/route-keycloak.yaml
 
```

## Check the deployment

```bash
# check the deployment
oc get pvc
oc get pods
oc get svc
og get routes
```

### Optional useful commands

```bash
# Commands to delete created resources in case of an error
oc delete configmap/keycloak-config
oc delete deployment/keycloak
oc delete svc/keycloak
oc delete route/keycloak
```

## Configure Keycloak Realm and Client

### Create Realm

* chatapp
* Create Realm Role: admin
* Go to <keycloak URL>/realms/chatapp/.well-known/openid-configuration to retrieve the issuer URL to connect our app to Keycloack

### Create Client

* Type: OpenID Connect
* Client ID: chatapp
* Valid redirect URLs: https://chat-app-algorhythmn-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/*
* Leave all others options by default and save

### Create new user (for PoC)
* User1: username: donald.trump password:1234
* User2: username: elon.musk password:1234 
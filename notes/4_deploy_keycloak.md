# Deploy Keycloak

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

Content-Security-Policy: The page’s settings blocked the loading of a resource (frame-src) at 
because it violates the following directive: “frame-src 'self'”

### Optional useful commands

```bash
# Commands to delete created resources in case of an error
oc delete configmap/keycloak-config
oc delete deployment/keycloak
oc delete svc/keycloak
oc delete route/keycloak
```
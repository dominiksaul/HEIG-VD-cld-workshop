# Deploy Keycloak-PostgreSQL

## Manually with the YAML configuration files

```bash
# apply config map
oc apply -f ./configs/configmap-keycloak-db.yaml

# apply pvc
oc apply -f ./configs/pvc-keycloak-db.yaml

# apply deployment
oc apply -f ./configs/deployment-keycloak-db.yaml

# apply service
oc apply -f ./configs/service-keycloak-db.yaml
```

## Check the deployment

```bash
# check the deployment
oc get pvc
oc get pods
oc get svc
```

### Optional useful commands

```bash
# Commands to delete created resources in case of an error
oc delete configmap/keycloak-db-config
oc delete pvc/keycloak-db
oc delete deployment/keycloak-db
oc delete svc/keycloak-db
```

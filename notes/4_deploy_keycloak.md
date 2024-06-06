# Deploy Keycloak

## Deploy PostgreSQL for Keycloak

## Automatically with the new-app command

```bash
# deploy postgresql automatically with the new-app command
oc new-app postgresql-persistent \
  -e POSTGRESQL_USER=keycloakadmin \
  -e POSTGRESQL_PASSWORD=HbqQS!#YUbt4M!NB2eVC \
  -e POSTGRESQL_DATABASE=keycloak-db \
  --name=keycloak-db
```


## Automatically with the new-app command

```bash
# Create the Keycloak Applicaiton:
oc new-app quay.io/keycloak/keycloak:latest --name=keycloak

# Expose the Service
oc expose svc/keycloak
```


## Manually with the YAML configuration files

```bash
# apply pvc
oc apply -f ./configs/pvc-keycloak.yaml

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
```

# todo test and create ingres rules
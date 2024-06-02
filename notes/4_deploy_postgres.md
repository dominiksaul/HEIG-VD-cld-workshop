# Deploy PostgreSQL

## Automatically with the new-app command

```bash
# deploy postgresql automatically with the new-app command
oc new-app postgresql-persistent \
  -e POSTGRESQL_USER=admin \
  -e POSTGRESQL_PASSWORD=ov.vLek84#j@n28DeoC9Ri \
  -e POSTGRESQL_DATABASE=chat-db
```

## Manually with the YAML configuration files

```bash
# apply pvc
oc apply -f ./configs/pvc-postgresql.yaml

# apply deployment
oc apply -f ./configs/deployment-postgresql.yaml

# apply service
oc apply -f ./configs/service-postgresql.yaml
```

## Check the deployment

```bash
# check the deployment
oc get pvc
oc get pods
oc get svc
```

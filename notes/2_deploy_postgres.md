# Deploy PostgreSQL

## Manually with the YAML configuration files

```bash
# apply config map
oc apply -f ./configs/configmap-postgresql.yaml

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

### Optional useful commands

```bash
# Commands to delete created resources in case of an error
oc delete configmap/postgresql-config
oc delete pvc/postgresql
oc delete deployment/postgresql
oc delete svc/postgresql
```

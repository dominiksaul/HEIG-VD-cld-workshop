# Deploy PostgreSQL

## Manually with the YAML configuration files

```bash
# create secret
oc create secret generic postgres-db-secret --from-literal=POSTGRES_PASSWORD=ov.vLek84%j@n28DeoC9Ri

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
oc delete pvc/postgres
oc delete deployment/postgres
oc delete svc/postgres
```
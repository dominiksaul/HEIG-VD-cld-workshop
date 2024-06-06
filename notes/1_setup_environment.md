# Set up Environment

## Install OpenShift CLI (oc)
* Download the binary from the OpenShift Platform
```bash
tar -xvf openshift-client-linux.tar.gz
sudo mv oc /usr/local/bin/
sudo mv kubectl /usr/local/bin/
```

## Log In to the OpenShift Cluster
Connect either to the Prod Cluster, the Developer Sandbox (hosted on RedHat) or the local Cluster.

The URL to connect to the Developer Sandbox can be get from sandbox console: https://console.redhat.com/openshift/sandbox > Launch > click on profile on the top right > Copy login command

```bash
oc login <url of sandbox cluster or real one>
```

## Set up and select Project
```bash
# command to list projects
oc projects

# command to create new project
oc new-project cld-workshop

# command to select project
oc project cld-workshop
```

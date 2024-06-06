# Set up Cluster
Discontinued since sandbox solution is sufficient for testing infrastructure.

## Install ROSA 
* Download the binary from the OpenShift Platform
```bash
tar -xvf openshift-client-linux.tar.gz
sudo mv rosa /usr/local/bin/
```
 ## Authenticate to your RedHat acoount
 * Retrieve your token from OpenShift Platform
 ```bash
 rosa login --token=<account_token> 
 ```

## Enable ROSA from your AWS account 
To be able to use OpenShift on AWS we have to ask quotas increases beyond their default value for those parameters:
- ec2 service - Running On-Demand Standard (A, C, D, H, I, M, R, T, Z) instances - from 5 to 100 (in-progress)
- ebs service - Storage for General Purpose SSD (gp3) volumes, in TiB - from 50 to 300 (in-progress)
- ebs service - Storage for General Purpose SSD (gp2) volumes, in TiB - from 50 to 300
- ebs service - Storage for Provisioned IOPS SSD (io1) volumes, in TiB - from 50 to 300


# <Your Subject>

## POC objectives

On the RedHat OpenShift Container Platform we will host a sample NodeJS appliation.
The NodeJS applicaiton uses a PostgreSQL database in the backend. 
Additionnaly we will implement a SSO authentication for the application with Keycloak.

## Infra architecture

![Schema](/schema.drawio.png)

## Scenario

Describe step-by-step the scenario. Write it using this format (BDD style).

### STEP 01
```
//given -> starting context
User isn't logged to application and try to access the website
//when -> event to produce
At the start, when user want to access the application
//then - > expected result
Redirected to KeyCloak for authentication
```

## Cost

<analysis of load-related costs.>

<option to reduce or adapt costs (practices, subscription)>
KeyCloak is opensource so there is only operational costs involved.
  
## Return of experience

<take a position on the poc that has been produced.>

<Did it validate the announced objectives?>

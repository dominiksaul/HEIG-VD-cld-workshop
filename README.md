# <Your Subject>

## POC objectives

In this workshop we want to collect first experiences with the technology RedHat OpenShift Container Platform (Cluster Hosted on AWS) and demonstrage the deployment and integration of a sample NodeJS chat application.
The NodeJS application will use a PostgreSQL database in the backend. 
Additionnaly we will implement a SSO authentication for the application with Keycloak.

The specific goals are
* Set up and manage an OpenShift Container Platform Cluster via RedHat on AWS
* Modify the currently already existing NodeJS Chat Application to use PostgreSQL (instead of currently SQLite)
* Modify the currently already existing NodeJS Chat Application to use Keycloak for the SSO authentication
* Host this NodeJS Chat Application that is scalable now on OpenShift
* Configure and host the PostgreSQL DB with a volume for persistent storage and connect our Chat Application to it.
* Configure and host the Keycloak instance with a volume for persistent storage and connect our Chat Application to it.

The the result of this workshop will be that we do have a SaaS Chat-App.
Users, that aren't authenticated, should be redirected to the Keycloak to authenticate themselves, when trying to access the app.
Only if the users are authenticated they should be able to use the app.
The NodeJS application can be scaled (manually) and the data (chats in PostgreSQL and accounts in Keycloak) are persistent even after restart.

Repository of Chat Application: https://github.com/dominiksaul/HEIG-VD-cld-chatapp

## Infra architecture

![Schema](/schema.drawio.png)

### Todo's
- [ ] Modify the nodejs chat-app to use a postgreSQL DB
- [ ] Modify the nodejs chat-app to use the Keycloak authentication
- [ ] Setup a OpenShift Container Platform Cluster via Redhat (hosted on AWS)
- [ ] Config for the postgreSQL DB (with a volume for persistent storage)
- [ ] Config for the Keycloak pos (with a volume for persistent storage)
- [ ] Config for NodeJS chat-app


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

### STEP 02
```
// given -> starting context
User is authenticated via Keycloak.
// when -> event to produce
User tries to access the application,
// then -> expected result
Access is granted to the chat application.
```

### STEP 03
```
// given -> starting context
User is logged into the application and tries to use the chat feature.
// when -> event to produce
User sends a message in the chat,
// then -> expected result
Message is stored in the PostgreSQL database and displayed to other users.
```

### STEP 04
```
// given -> starting context
User is authenticated via Keycloak.
// when -> event to produce
User tries to logout in the Application,
// then -> expected result
The user is logged out and has to reconnect itself again.
```

### STEP 05
```
// given -> starting context
User account exists with a specific password.
// when -> event to produce
Infrastructure is restarted
// then -> expected result
The useraccount still exists with the same password
```

### STEP 06
```
// given -> starting context
User has send a message to another user which is saved in the DB.
// when -> event to produce
Infrastructure is restarted
// then -> expected result
The message still exists in the DB and is correctly shown in the app
```

## Cost

<analysis of load-related costs.>
* AWS Hosting: Costs associated with running the OpenShift cluster on AWS.
* Persistent Storage: Costs for the storage volumes used by PostgreSQL and Keycloak.
* Licencing Costs: NodeJS, PostgreSQL and KeyCloak are open source.

<option to reduce or adapt costs (practices, subscription)>
* Use AWS free Tier
* Use OpenShift locally or in the Sandbox (30 days trial) during developpement
  
## Return of experience

<take a position on the poc that has been produced.>

<Did it validate the announced objectives?>

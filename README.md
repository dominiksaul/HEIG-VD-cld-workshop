# <Your Subject>

## POC objectives

In this workshop we want to collect first experiences with the technology RedHat OpenShift Container Platform and demonstrate the deployment and integration of a simple NodeJS chat application.
The NodeJS application will use a PostgreSQL database in the backend. 
Additionnaly we will implement a SSO authentication for the application with Keycloak. Keycloak as well uses PostgreSQL in the background.

The specific goals are
* Modify the currently already existing NodeJS Chat Application to use PostgreSQL (instead of currently SQLite)
* Modify the currently already existing NodeJS Chat Application to use Keycloak for the SSO authentication
* Host this NodeJS Chat Application that is scalable now on OpenShift
* Configure and host the PostgreSQL DB with a volume for persistent storage and connect our Chat Application to it.
* Configure and host the Keycloak instance with a volume for persistent storage and connect our Chat Application to it.

The the result of this workshop will be that we do have a SaaS Chat-App.
Users, that aren't authenticated, should be redirected to the Keycloak to authenticate themselves, when trying to access the app.
Only if the users are authenticated they should be able to use the app.
The NodeJS application can be scaled (manually) and the data (chats of the Chat-App saved in PostgreSQL and accounts in Keycloak saved in PostgreSQL) are persistent even after restart.

Repository of Chat Application: https://github.com/dominiksaul/HEIG-VD-cld-chatapp

## Infra architecture

![Schema](/schema.drawio.png)

### Todo's
- [ ] Modify the nodejs chat-app to use a postgreSQL DB
- [ ] Modify the nodejs chat-app to use the Keycloak authentication
- [ ] Config for the PostgreSQL DB for the Chat-App (with a volume for persistent storage)
- [ ] Config for the Keycloak pod
- [ ] Config the PostgreSQL DB for Keycloak (with a volume for persistent storage)
- [ ] Config for NodeJS chat-app


## Scenario

Describe step-by-step the scenario. Write it using this format (BDD style).

### STEP 01
```
//given -> starting context
The NodeJS chat application is deployed on OpenShift.
//when -> event to produce
The NodeJS chat application tries to connect to the PostgreSQL database.
//then -> expected result
The NodeJS chat application successfully connects to the PostgreSQL database hosted on OpenShift.
```

### STEP 02
```
//given -> starting context
The Keycloak instance is deployed on OpenShift.
//when -> event to produce
The Keycloak instance tries to connect to its PostgreSQL database.
//then -> expected result
The Keycloak instance successfully connects to its PostgreSQL database hosted on OpenShift.
```

### STEP 03
```
//given -> starting context
The NodeJS chat application and Keycloak are both deployed and configured.
//when -> event to produce
A user attempts to access the NodeJS chat application.
//then -> expected result
The user is redirected to Keycloak for authentication and, upon successful authentication, is allowed access to the chat application.
```

### STEP 04
```
//given -> starting context
The NodeJS chat application is running, and users are actively using it.
//when -> event to produce
The OpenShift cluster is scaled up to add more instances of the NodeJS chat application.
//then -> expected result
New instances of the NodeJS chat application are successfully created, and the application remains fully functional and accessible.
```

### STEP 05
```
//given -> starting context
The NodeJS chat application is using PostgreSQL for data storage.
//when -> event to produce
The OpenShift cluster is restarted.
//then -> expected result
All data in PostgreSQL (chat messages and user accounts) remains intact and accessible after the restart.
```

### STEP 06
```
//given -> starting context
Keycloak is configured to use PostgreSQL for storing user accounts.
//when -> event to produce
The OpenShift cluster is restarted.
//then -> expected result
All user accounts and authentication data in PostgreSQL remain intact and accessible after the restart.
```

## Cost

<analysis of load-related costs.>
* OpenShift can be used on the RedHat Developer Platform for free for 30 Days.
* Licencing Costs: NodeJS, PostgreSQL and KeyCloak are open source.

<option to reduce or adapt costs (practices, subscription)>
* Use OpenShift locally instead in the Sandbox (30 days trial) during developpement (Not possible on Debian Computers)
  
## Return of experience

<take a position on the poc that has been produced.>

<Did it validate the announced objectives?>

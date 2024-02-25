# AWS security configuration

## AWS IAM configuration for several AWS organizations.

### 1st step: 

Create an AWS organization within the main account. It is free of charge. AWS Organizations provide a way to centrally manage and govern multiple AWS accounts. In this case, we are setting up an organization named "testing" for organizational purposes. 
<img src="./screenshots/01.png" width="400px" alt="AWS organizations">

### 2nd step: 

Create as many users as the company requires. In this scenario, we have two users: "askug-admin" and "zoosman." To enhance security and reduce the risk of data compromise, enable Multi-Factor Authentication (MFA) for all users. 
![ALT text](./screenshots/02.png "AWS IAM users")

### 3rd step: 
Define two roles within the "root" environment (AWS organization, here it is managed account). The role "askug-admin@root" grants administrative privileges to users who assume this role within the "root" environment. Similarly, the role "askug-developer@root" is designated for developers. 

![ALT text](./screenshots/03.png "AWS IAM roles")
![ALT text](./screenshots/04.png "AWS IAM roles")
![ALT text](./screenshots/05.png "AWS IAM roles")
![ALT text](./screenshots/06.png "AWS IAM roles")

### 4th step: 
Assign a root administrator for the new AWS organization. Sign up with the email address testong@askug.net and log in to set up the organization. Repeat the steps for defining roles and establishing role relationships within this new environment. Note that in the "testing" environment, there are currently no users or groups configured. 
![ALT text](./screenshots/07.png "AWS IAM roles")
![ALT text](./screenshots/08.png "AWS IAM roles")
![ALT text](./screenshots/09.png "AWS IAM roles")
![ALT text](./screenshots/10.png "AWS IAM roles")
![ALT text](./screenshots/11.png "AWS IAM roles")


### 5th step: 
Return to the "root" environment/organization. Instead of assigning permissions directly to users, create four groups: "AskugAdmins," "AskugDevelopers," "AskugTestingAdmin," and "AskugTestingDevelopers." This approach helps in managing permissions more efficiently. 
![ALT text](./screenshots/12.png "AWS IAM groups")

### 6th step: 
Assign privileges to the created groups, ensuring that the AWS organization ID is correctly specified in the permission field. This step ensures that the groups have the necessary permissions within the organization. 
![ALT text](./screenshots/13.png "AWS IAM groups")
![ALT text](./screenshots/14.png "AWS IAM groups")
![ALT text](./screenshots/15.png "AWS IAM groups")
![ALT text](./screenshots/16.png "AWS IAM groups")

### 7th step: 
Repeat the process of assigning permissions for the testing roles, ensuring that the appropriate roles and permissions are configured for the testing environment.

### 
8th step: Issue an access key for the user "zoosman" and focus on the next phase of the setup. To maintain security best practices, avoid using "admin" type users in the console and limit access to only necessary users like "zoosman."

### 9th step: 
Create a credentials file on your local PC in the home directory to securely store and manage access credentials. **$HOME/.aws/credentials**

~~~ txt
[default]

[_askug-zoosman]
aws_access_key_id = AKIAXXXXXXXXX
aws_secret_access_key = XXXXXXXXXXX
mfa_serial = arn:aws:iam::852822361563:mfa/zoosman
~~~

### 10th step. 
Create a configuration file in the same directory. **$HOME/.aws/config**

~~~ txt
[default]
region = eu-west-1
output = json

[profile askug-zoosman-root]
role_arn = arn:aws:iam::852822361563:role/askug-developer@root
region = us-east-2
output = json
source_profile = _askug-zoosman

[profile askug-zoosman-testing]
role_arn = arn:aws:iam::400211111076:role/askug-admin@testing
region = us-east-2
output = json
source_profile = _askug-zoosman
~~~

### Summary: 
Two users have been created and granted access to work within two AWS organizations, which represent distinct cloud environments. Each user's permissions are defined based on the group they belong to. Switching between organizations is facilitated by assuming specific roles. To simplify role switching, consider using tools like the Google Chrome extension "AWS Extend Switch Roles." Additionally, when using the AWS CLI, set the environment variable AWS_PROFILE to manage different profiles efficiently.
![ALT text](./screenshots/17.png "AWS IAM role switcher")

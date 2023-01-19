# How To Setup ServiceNow Instance
- Please use the following link to create a ServiceNow account:

    https://developer.servicenow.com/dev.do

    ![image](./images//1.%20ServiceNow%20Signup.png)

- Once you create an account you can sign in.

    ![image](./images//2.%20ServiceNow%20Signin.png)

- Once you sign in you can click on 'Start Building'.

    ![image](./images/3.%20Start%20Building.png)

- Click on 'Tokyo'.

    ![image](./images/4.%20Tokyo.png)

- Click on 'Request'.

    ![image](./images/5.%20Request.png)

- Now you need to wait till ServiceNow sets up the instance.

    ![image](./images/6.%20Setting%20Up%20Instance.png)

- Once instance is ready make a note of the url, username and password.

    ![image](./images/7.%20Instance%20Is%20Ready.png)

- Go to the following url: https://www.base64encode.org

    Pass the username and password in the first text box in the following format:

    username:password

    Example: 

    admin:g9tN-%E4tfDU

    After that just click on encode, and the resulting value can be used for authentication for the APIs in this projects.

    Once encoded it will the username and password will look something like this.

    YWRtaW46Zzl0Ti0lRTR0ZkRV

    ![image](./images/8.%20BASE64%20Encode.png)


- You need to use basic authentication in authorization header using the following format:

    Basic encoded_value

    Example:

    Basic YWRtaW46Zzl0Ti0lRTR0ZkRV

    Replace the url and authorization for the following files:

    - playwright.config.ts

        ![image](./images/9.%20playwright%20config.png)

    - 1.1Basics.spec.ts

        ![image](./images/10.%20Basics.png)

    - 1.2CustomContext.spec.ts

        ![image](./images/11.%20Custom%20Context.png)
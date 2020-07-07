# Restful-api
Before going in details, here are the npm I used to develop my solution: express, joi (for field validation), nodemon and body-parser.
The code is located in server.js file

### Line 1 to 16
Bascially the imports and declarations of what is needed.

### Line 17 - 20
Get request to list all users registered.

### Line 22 - 25
Get request to list all events, whether it be failed or a success

### Line 27 - 35
Get request of the successful login for a specific user using the email. In the endpoint '.../users/login/:email', there's **:email.** Thanks to the colon, it specifies to the program that this part of the url is a data from the json object. Here, the value is the value of the email field.

So let's say we want to get all the successful events of the registered user with the following email: CascadeFinTech@a.co, We need to go to the following URL: .../users/login/CascadeFinTech@a.co then it will list the events.

### Line 37 - 45
Same as the previous get request. But now, the get request allows filtering failed and succeeded login for all users.

### Line 47 - 61
Post request for new users.

### 49 - 53
This is the validation check from the function at line ## 98 to 105. Email field is required: 'email: Joi.string().required()', same for phone with a length condition too. Phone number has to be 10 characters long, and password is required too. For phone number, I declared as a string, different from what it was asked. But it works as well. Only numbers are accepted thanks to regex pattern 'regex(/^[0-9]+$/)'.

'users' variable at line 54 receive the input of the users and these values are pushed (line 59) to the json data.

### Line 63 - 89
Post account for when a user try to log in to his/her account. I could have used Get request but it was already used to retrieve all the events. 2 models are declared, one will be used when it is a failed event, the other one when the user succeeds to login. Then the value entered are compared with the registered value (line 78 to 82), if there's an error in either the email or the password, json data will be pushed and saved to the '.../users/login' endpoint. Same thing if there's a success. I decided to save and mix success and failed events so that for the future, in real world, we can see the total activity/ traffic of the application.

### Line 91 - 95
These 4 lines tells the server to run on PORT 8080.

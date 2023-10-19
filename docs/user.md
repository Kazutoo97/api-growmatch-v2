\*\*# User Api Spec

### Register User API

Endpoint : post/api/v1/auth
Request Body :

````JSON
{
  "firstName": "kazuto",
  "lastName": "kirigaya",
  "userName" : "KazutooKen12",
  "email" : "kazutoo12@gmail.com",
  "password" : "@Passwordrahasia",
  "dob": "1997-08-12",
  "interest": "Programming"
}
```**

Response Body Success :

```JSON
{
  "message": "Register successfully",
  "data": {
  "userName" : "KazutooKen12",
  }
}
````

Response Body Error :

```json
{
  "errors": "Username Already Taken",
  "errors": "Email Already Registered",
  "errors": "Email must be a valid email address",
  "errors": "Password must contain 1 sepecial character @#$%&, 1 capital letter and a minimum length of 6",
  "errors": "All inputs must be filled in"
}
```

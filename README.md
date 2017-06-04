# API Documentation

    Sign Up

## Description
Creates a new user.


## Parameters
- **username** _(required)_ — Email Id of the user.
- **password** _(required)_ — Password of the user.
- **hostUrl** _(required)_ — Client server URL .


## Example
**Request**

    http://localhost:3012/api/v1/signup

``` json
{
"username": "xyz@mail.com",
"password" : "letmein",
"hostUrl" : "http://localhost:8000"
}
```    

**Return** 
``` json
{
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhMW5pbC5tLm5haWtAZ21haWwuY29tIiwiaWQiOiI1OTMzNjRiMDgwNTMzNTRhZTE2YzdlYzQiLCJpYXQiOjE0OTY1NDAzMzZ9.aEbkycTrTWub17ZRreasC7Ror4MXl0QiEq1CGno4lPM"
}
```



    Verify User

## Description
Verifies newly registered user.


## Parameters
- **token** _(required)_ — token sent through email.
- **hostUrl** _(required)_ — Client server URL .


## Example
**Request**

    http://localhost:3012/api/v1/verifyEmail

``` json
{
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhMW5pbC5tLm5haWtAZ21haWwuY29tIiwiaWQiOiI1OTMzNjRiMDgwNTMzNTRhZTE2YzdlYzQiLCJpYXQiOjE0OTY1NDAzMzZ9.aEbkycTrTWub17ZRreasC7Ror4MXl0QiEq1CGno4lPM"
"hostUrl" : "http://localhost:8000"
}
```    

**Return** 
``` json
{
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhMW5pbC5tLm5haWtAZ21haWwuY29tIiwiaWQiOiI1OTMzNjRiMDgwNTMzNTRhZTE2YzdlYzQiLCJpYXQiOjE0OTY1NDAzMzZ9.aEbkycTrTWub17ZRreasC7Ror4MXl0QiEq1CGno4lPM"
}
```



    Login

## Description
Logs user into application .


## Parameters
- **username** _(required)_ — Email Id of the user.
- **password** _(required)_ — Password of the user.


## Example
**Request**

    http://localhost:3012/api/v1/login

``` json
{
"username": "xyz@mail.com",
"password" : "letmein",
}
```    

**Return** 
``` json
{
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhMW5pbC5tLm5haWtAZ21haWwuY29tIiwiaWQiOiI1OTMzNjRiMDgwNTMzNTRhZTE2YzdlYzQiLCJpYXQiOjE0OTY1NDAzMzZ9.aEbkycTrTWub17ZRreasC7Ror4MXl0QiEq1CGno4lPM"
}
```



    Reset Password

## Description
Resets the user password.


## Parameters
- **token** _(required)_ — token sent through email.
- **password** _(required)_ — New password to be set.


## Example
**Request**

    http://localhost:3012/api/v1/resetPassword

``` json
{
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhMW5pbC5tLm5haWtAZ21haWwuY29tIiwiaWQiOiI1OTMzNjRiMDgwNTMzNTRhZTE2YzdlYzQiLCJpYXQiOjE0OTY1NDAzMzZ9.aEbkycTrTWub17ZRreasC7Ror4MXl0QiEq1CGno4lPM"
"password" : "letmein",
}
```    

**Return** 
``` json
{
"message": "Password Reset Successfully"
}
```



    Resend Verification Email

## Description
Resend user verification email.


## Parameters
- **username** _(required)_ — email id of the user.
- **hostUrl** _(required)_ — Client server URL .


## Example
**Request**

    http://localhost:3012/api/v1/resendVerificationEmail

``` json
{
"username": "sanil.m.naik@gmail.com"
"hostUrl" : "http://localhost:8000"
}
```    

**Return** 
``` json
{
"message": "Account verification link is sucessfully sent to your email id"
}
```
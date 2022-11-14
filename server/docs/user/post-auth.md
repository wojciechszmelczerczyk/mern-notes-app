# Authenticate User

## Description

Authenticate user.

<b>URL:</b> `/user/authenticate`

<b>Method:</b> `POST`

<b>Authorized:</b> `NO`

## Data constraints

```json
{
  "email": "string (correct email)",
  "password": "string (correct password)"
}
```

## Data example

```json
{
  "email": "existingUser@gmail.com",
  "password": "correctPassword"
}
```

## Success Response

Code: `200 OK`

Condition: If provided data is correct.

### Context example

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ikpvc2huIERvZSIsImlhdCI6MTUxNjIzOTAyMn0.IhESQPFsfwf-RK89fLWKGrdzoQ0eK_gikDgU-RbSgkc"
}
```

## Error Response

Code: `400 BAD REQUEST`

Condition: If user with provided email doesn't exist.

```json
{ "err": "Note title doesn't provided. Please provide title.", "fail": true }
```

Code: `400 BAD REQUEST`

Condition: If provided password is incorrect.

```json
{
  "err": "Note title is too short. Minimum length is 4 characters",
  "fail": true
}
```

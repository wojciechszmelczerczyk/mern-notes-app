# Create User

## Description

Create user.

<b>URL:</b> `/user`

<b>Method:</b> `POST`

<b>Authorized:</b> `NO`

## Data constraints

```json
{
  "email": "string (valid email)",
  "password": "string (password longer than 6 chars)"
}
```

## Data example

```json
{
  "email": "newUser@gmail.com",
  "password": "newPassword123"
}
```

## Success Response

Code: `200 OK`

Condition: If provided data is correct.

### Context example

Before save to database, password was hashed.

```json
{
  "__v": 0,
  "_id": "63727c5f16d667ebf0846fae",
  "email": "newUser@gmail.com",
  "password": "$2b$10$PiEVDyTYniZvh7mWSxN2qOAHmF1AzvXhVuvs1FDu1HaCge3/qOW52"
}
```

## Error Response

Code: `400 BAD REQUEST`

Condition: If provided email is incorrect.

```json
{ "err": "Please enter a valid email", "fail": true }
```

Code: `400 BAD REQUEST`

Condition: If provided password is shorter than 6 chars.

```json
{
  "err": "Password is too short. Minimum length is 6 characters",
  "fail": true
}
```

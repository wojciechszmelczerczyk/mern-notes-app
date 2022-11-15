# Get current user

## Description

Get current authorized user.

<b>URL :</b> `/user`

<b>Method:</b> `GET`

<b>Authorized:</b> `YES`

## Success Response

Code: `200 OK`

### Context example

Condition: If user provided valid, non-expired jwt.

```json
{
  {
    "__v": 0,
    "_id": "63723da6b7a6c7b6039003f5",
    "email": "test@gmail.com",
    "password": "$2b$10$4scLqExrB8SzU5jcmBVLTO7TeGE7tIlU3vWhg.SPPWfxPJZEhipd.",
  }
}
```

## Error response

Code: `403 Forbidden`

Condition: If user doesn't provided jwt.

```json
{
  "err": "No Jwt provided",
  "fail": true
}
```

Code: `403 Forbidden`

Condition: If user provided expired jwt.

```json
{
  "err": "Jwt has expired",
  "fail": true
}
```

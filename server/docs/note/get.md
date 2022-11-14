# Get products

## Description

Get all notes of currently authorized user.

<b>URL :</b> `/note`

<b>Method:</b> `GET`

<b>Authorized:</b> `YES`

## Success Response

Code: `200 OK`

### Context example

Condition: If user provided valid, non-expired jwt.

```json
[
  {
    "__v": 0,
    "_id": "63723e9cb7a6c7b6039003fa",
    "content": "some content",
    "createdAt": "2022-11-14T13:11:56.672Z",
    "title": "title1",
    "updatedAt": "2022-11-14T13:11:56.672Z",
    "user_id": "63723da6b7a6c7b6039003f5"
  },
  {
    "__v": 0,
    "_id": "61451e1da1bb19b425311ffa",
    "content": "some content",
    "createdAt": "2022-11-14T13:13:56.672Z",
    "title": "title2",
    "updatedAt": "2022-11-14T13:13:56.672Z",
    "user_id": "63723da6b7a6c7b6039003f5"
  }
]
```

## Error response

Code: `403 Forbidden`

Condition: If user doesn't provided jwt.

```json
{
  "error": "No Jwt provided",
  "fail": true
}
```

Code: `403 Forbidden`

Condition: If user provided expired jwt.

```json
{
  "error": "Jwt has expired",
  "fail": true
}
```

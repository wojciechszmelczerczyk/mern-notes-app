# Get product by id

## Description

Get product by id of currently authorized user.

<b>URL :</b> `/note/:id`

<b>URL parameter:</b> `id=[string]` where `id` is mongoose object id syntax.

<b>Method:</b> `GET`

<b>Authorized:</b> `YES`

## Success Response

Code: `200 OK`

Condition: If note with provided correctly id exists.

```json
{
  "__v": 0,
  "_id": "63723e9cb7a6c7b6039003fa",
  "content": "some content",
  "createdAt": "2022-11-14T13:11:56.672Z",
  "title": "title",
  "updatedAt": "2022-11-14T13:11:56.672Z",
  "user_id": "63723da6b7a6c7b6039003f5"
}
```

## Error Response

Code: `403 BAD REQUEST`

Condition: If user doesn't provided jwt.

```json
{ "err": "No Jwt provided", "fail": true }
```

Code: `403 BAD REQUEST`

Condition: If provided jwt has expired.

```json
{ "err": "Jwt has expired", "fail": true }
```

Code: `400 BAD REQUEST`

Condition: If provided id has incorrect type.

```json
{ "err": "Provided id is incorrect", "fail": true }
```

Code: `400 BAD REQUEST`

Condition: If note with provided id doesn't exist.

```json
{ "err": "Product with provided id doesn't exist", "fail": true }
```

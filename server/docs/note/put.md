# Update Note

## Description

Update note with note content.

<b>URL:</b> `/note/:id`

<b>Method:</b> `PUT`

<b>URL parameter:</b> `id=[string]` where `id` is mongoose object id syntax.

<b>Authorized:</b> `YES`

## Data constraints

```json
{
  "content": "[string]?"
}
```

## Data example

```json
{
  "content": "newContent"
}
```

## Success Response

Code: `200 OK`

Condition: If provided data is correct.

### Context example

```json
{
  "__v": 0,
  "_id": "63725f8c4c26471d10e200c0",
  "content": "newContent",
  "createdAt": "2022-11-14T15:32:28.734Z",
  "title": "math",
  "updatedAt": "2022-11-14T16:23:59.460Z",
  "user_id": "63723da6b7a6c7b6039003f5"
}
```

## Error Response

Code: `400 BAD REQUEST`

Condition: If note with provided id doesn't exist.

```json
{ "err": "Note with provided id doesn't exist", "fail": true }
```

Code: `400 BAD REQUEST`

Condition: If provided id is incorrect.

```json
{ "err": "Provided id has incorrect type", "fail": true }
```

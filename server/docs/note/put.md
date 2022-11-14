# Create transaction

## Description

Save new product in database.

<b>URL:</b> `/note/save`

<b>Method:</b> `POST`

<b>Authorized:</b> `YES`

## Data constraints

```json
{
  "id": "[string] (mongoose object id syntax)",
  "content": "[string]?"
}
```

## Data example

```json
{
  "id": "63725f8c4c26471d10e200c0",
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

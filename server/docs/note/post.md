# Create Note

## Description

Save new note without content.

<b>URL:</b> `/note`

<b>Method:</b> `POST`

<b>Authorized:</b> `YES`

## Data constraints

```json
{
  "title": "[string (4-8 characters range)]"
}
```

## Data example

```json
{
  "title": "math"
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
  "content": "",
  "createdAt": "2022-11-14T15:32:28.734Z",
  "title": "math",
  "updatedAt": "2022-11-14T15:32:28.734Z",
  "user_id": "63723da6b7a6c7b6039003f5"
}
```

## Error Response

Code: `400 BAD REQUEST`

Condition: If no title provided.

```json
{ "err": "Note title doesn't provided. Please provide title.", "fail": true }
```

Code: `400 BAD REQUEST`

Condition: If provided title is shorter than 4 chars.

```json
{
  "err": "Note title is too short. Minimum length is 4 characters",
  "fail": true
}
```

Code: `400 BAD REQUEST`

Condition: If provided name is longer than 8 chars.

```json
{
  "err": "Note title is too long. Maximum length is 8 characters",
  "fail": true
}
```

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

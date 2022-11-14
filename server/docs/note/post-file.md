# Download note file

## Description

Download `.pdf` or `.txt` file.

<b>URL:</b> `/note/:id/file`

<b>Method:</b> `POST`

<b>URL parameter:</b> `id=[string]` where `id` is mongoose object id syntax.

<b>Authorized:</b> `YES`

## Data constraints

```json
{
  "format": "[string (pdf or txt)]"
}
```

## Data example

```json
{
  "format": "pdf"
}
```

## Success Response

Code: `200 OK`

Condition: If provided body data and id param is correct, download file.

### Context example

[PDF File](../../example/note.pdf)

## Error Response

Code: `400 BAD REQUEST`

Condition: If no format provided.

### Format

```json
{ "err": "No format provided. Provide 'pdf' or 'txt' value. ", "fail": true }
```

Code: `400 BAD REQUEST`

Condition: If provided format is incorrect.

```json
{
  "err": "Provided format is incorrect. Provide 'pdf' or 'txt' value.",
  "fail": true
}
```

### ID

Code: `400 BAD REQUEST`

Condition: If provided id is incorrect.

```json
{
  "err": "Provided id has incorrect type",
  "fail": true
}
```

Code: `400 BAD REQUEST`

Condition: If note with provided id doesn't exist.

```json
{ "err": "Note with provided id doesn't exist", "fail": true }
```

### Jwt

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

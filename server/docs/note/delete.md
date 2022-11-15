# Delete Note

## Description

Delete note of currently authorized user.

<b>URL :</b> `/note/:id`

<b>Method:</b> `DELETE`

<b>URL parameter:</b> `id=[string]` where `id` is mongoose object id syntax.

<b>Authorized:</b> `YES`

## Success Response

Code: `204 No content`

Condition: If note with provided correctly id exists.

### Context example

No content.

## Error Response

Code: `400 BAD REQUEST`

Condition: If provided id has incorrect type.

```json
{ "err": "Provided id has incorrect type", "fail": true }
```

Code: `400 BAD REQUEST`

Condition: If note with provided id doesn't exist.

```json
{ "err": "Product with provided id doesn't exist", "fail": true }
```

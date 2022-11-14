# Delete Note

## Description

Delete product of currently authorized user.

<b>URL :</b> `/api/products/:id`

<b>Method:</b> `DELETE`

<b>URL parameter:</b> `id=[string]` where `id` is mongoose object id syntax.

<b>Authorized:</b> `YES`

## Success Response

Code: `204 No content`

Condition: If product with provided correctly id exists.

### Context example

No content.

## Error Response

Code: `400 BAD REQUEST`

Condition: If provided id has incorrect type.

```json
{ "id": "Provided id has incorrect type" }
```

Code: `400 BAD REQUEST`

Condition: If product with provided id doesn't exist.

```json
{ "id": "Product with provided id doesn't exist" }
```

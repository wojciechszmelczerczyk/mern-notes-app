# Delete product

## Description

Delete product from database.

<b>URL :</b> `/api/products/:id`

<b>URL parameter:</b> `id=[string]` where `id` is mongoose object id syntax.

<b>Method:</b> `DELETE`

## Success Response

Code: `204 No content`

Condition: If product with provided correctly id exists.

### Context example

No content.

## Error Response

Code: `400 BAD REQUEST`

Condition: If provided id has incorrect type.

```json
{ "id": "Provided id is incorrect" }
```

Code: `400 BAD REQUEST`

Condition: If product with provided id doesn't exist.

```json
{ "id": "Product with provided id doesn't exist" }
```

Code: `400 BAD REQUEST`

Condition: If no id provided.

```json
{ "id": "No id provided" }
```

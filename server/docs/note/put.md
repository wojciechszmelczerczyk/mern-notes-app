# Update product

## Description

Update product in database.

<b>URL :</b> `/api/products/:id`

<b>URL parameter:</b> `id=[string]` where `id` is mongoose object id syntax.

<b>Method:</b> `PUT`

## Data constraints

```json
{
  "name": "[string (4-100 characters range)]",
  "price": "[integer]"
}
```

## Data example

```json
{
  "name": "ball",
  "price": 105
}
```

## Success Response

Code: `200 OK`

Condition: If product with provided correctly id exists and request body data is correct.

### Context example

Updated product returned.

```json
{
  "__v": 0,
  "_id": "6369523318c90dd1e14fd8b0",
  "createdAt": "2022-11-07T18:45:07.229Z",
  "name": "ball",
  "price": 105,
  "updatedAt": "2022-11-07T20:11:20.319Z"
}
```

## Error Response

### ID

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

### Body

#### Name

Code: `400 BAD REQUEST`

Condition: If no name provided.

```json
{ "name": "Please provide the product name" }
```

Code: `400 BAD REQUEST`

Condition: If provided name is shorter than 4 chars.

```json
{ "name": "Product name is too short. Minimum length is 4 characters" }
```

Code: `400 BAD REQUEST`

Condition: If provided name is longer than 100 chars.

```json
{ "name": "Product name is too long. Maximum length is 100 characters" }
```

#### Price

Code: `400 BAD REQUEST`

Condition: If no price provided.

```json
{ "price": "Please provide product price" }
```

Code: `400 BAD REQUEST`

Condition: If provided price is not integer type.

```json
{ "price": "Provided price has to be a numeric value" }
```

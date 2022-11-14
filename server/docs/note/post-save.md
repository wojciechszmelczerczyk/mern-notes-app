# Create transaction

## Description

Save new product in database.

<b>URL:</b> `/api/products`

<b>Method:</b> `POST`

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
  "name": "jacket",
  "price": 200
}
```

## Success Response

Code: `200 OK`

Condition: If provided data is correct.

### Context example

```json
{
    "__v": 0,
    "_id": "6369523318c90dd1e14fd8b0",
    "createdAt": "2022-11-07T18:45:07.229Z",
    "name": "jacket",
    "price": 200,
    "updatedAt": "2022-11-07T18:45:07.229Z"
  },
```

## Error Response

### Name

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

### Price

Code: `400 BAD REQUEST`

Condition: If no price provided.

```json
{ "price": "Please provide the product price" }
```

Code: `400 BAD REQUEST`

Condition: If provided price is not integer type.

```json
{ "price": "Provided price has to be a numeric value" }
```

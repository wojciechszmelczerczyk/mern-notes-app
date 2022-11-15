# Get new access token and refresh token

## Description

Get new access token and refresh token.

<b>URL :</b> `/user/refresh-token`

<b>Method:</b> `GET`

<b>Authorized:</b> `NO`

## Success Response

Code: `200 OK`

### Context example

Condition: If user provided valid, non-expired refresh token.

```json
{
 {
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ikpvc2huIERvZSIsImlhdCI6MTUxNjIzOTAyMn0.IhESQPFsfwf-RK89fLWKGrdzoQ0eK_gikDgU-RbSgkc"
 }
}
```

## Error response

Code: `403 Forbidden`

Condition: If user doesn't provided refresh token.

```json
{
  "err": "rt doesn't exist",
  "fail": true
}
```

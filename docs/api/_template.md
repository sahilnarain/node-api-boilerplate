# Product - API Reference
[//]: # "Use dillinger.io for pdf export"

## Base URLs
#### Production:
-``https://api.domain.com`
#### Development:
- https://dev.api.domain.com

## Number. API name
### Description
  A short description of the API
### Method
  `method`
### URL
  `url`
### Headers
- `x-key`: API Key issued by Xane.
- `x-auth`: Session token for the end-user.
- `x-device-id`: Unique device identifier for the end-user.
- `x-origin`: Origin of any API call. 1 for end-user app, 2 for internal vendor app..
- `x-platform`: Device platform. 1 for Web, 2 for iOS, 3 for Android.
- `x-version`: App release version of the app.
- `user-agent`: Optional, but recommended. User Agent used for calling the API.
### Query
  `query`
### Body
- `param1`: description of param1
- `param2`: description of param2
### curl
```
curl -H ... -d ... -X method URL
```
### Response Type
`JSON`
### Response
```
{
  ...
}
```

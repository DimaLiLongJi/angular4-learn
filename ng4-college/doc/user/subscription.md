# CollegeUsersSubscription

## API

### create

> POST /users/:userId/subscription

#### request

field      | required | eg | desc
:--------- | :------- | :- | :---
{userId}   | true     | 1  |
industryId | true     | 1  |

#### response

```json
{
  "id": 1,
  "userId": 1,
  "industryId": "1",
  "enabled": 1,
  "createdAt": "2017-08-01",
  "createdBy": 1,
}
```

### get user subscription

> GET /users/:userId/subscription

#### request

field    | required | eg | desc
:------- | :------- | :- | :---
{userId} | true     | 1  |

#### response

```json
[{
  "id": 1,
  "userId": 1,
  "industryId": 1,
  "enabled": 1,
  "createdAt": "2017-08-01",
  "createdBy": 1,
}, ……]
```

### destroy

> DELETE /users/:userId/subscription

#### request

field          | required | eg | desc
:------------- | :------- | :- | :---
{userId}       | true     | 1  |

#### response

```json
{
  "result": 1
}
```

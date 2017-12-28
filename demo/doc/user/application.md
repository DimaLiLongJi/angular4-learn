# CollegeUsersApplication

## API

### create

> POST /users/:userId/applications

#### request

field         | required | eg          | desc
:------------ | :------- | :---------- | :---
{userId}      | true     | 1           |
opportunityId | true     | 1           |
attachmentId  | true     | 1           |
title         | true     | test        |
email         | true     | 123@qq.com  |
prefixId      | true     | 1           |
mobile        | true     | 18911223344 |

#### response

```json
{
  "id": 1,
  "userId": 1,
  "opportunityId": 1,
  "title": "test",
  "email": "123@qq.com",
  "createdAt": "2017-08-01",
  "createdBy": 1,
}
```

### get user last apply

> GET /users/:userId/applications/latest

#### request

field    | required | eg | desc
:------- | :------- | :- | :---
{userId} | true     | 1  |

#### response

```json
{
  "id": 1,
  "userId": 1,
  "opportunityId": 1,
  "attachmentId": 1,
  "title": "test",
  "email": "123@qq.com",
  "createdAt": "2017-08-01",
  "createdBy": 1,
}
```

### check user apply available

> GET /users/:userId/applications/:opportunityId/available

#### request

field           | required | eg | desc
:-------------- | :------- | :- | :---
{userId}        | true     | 1  |
{opportunityId} | true     | 1  |

#### response

```json
{
  "available": true,
}
```

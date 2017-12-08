# CollegeUsersAttachments

## API

### create

> POST /users/:userId/attachments

#### request

field        | required | eg       | desc
:----------- | :------- | :------- | :---
{userId}       | true     | 1        |
fileId       | true     | 1        |
originalName | true     | test.doc |
type         | true     | resume   |

#### response

```json
{
  "id": 1,
  "userId": 1,
  "fileId": 1,
  "originalName": "test.doc",
  "type": "resume",
  "enabled": 1,
  "createdAt": "2017-08-01",
  "createdBy": 1,
}
```

### get user attachments

> GET /users/:userId/attachments

#### request

field    | required | eg | desc
:------- | :------- | :- | :---
{userId} | true     | 1  |

#### response

```json
[{
  "id": 1,
  "userId": 1,
  "fileId": 1,
  "originalName": "test.doc",
  "type": "resume",
  "enabled": 1,
  "createdAt": "2017-08-01",
  "createdBy": 1,
}, ……]
```

### destroy

> DELETE /users/:userId/attachments/:attachmentId

#### request

field          | required | eg | desc
:------------- | :------- | :- | :---
{userId}       | true     | 1  |
{attachmentId} | true     | 1  |

#### response

```json
{
  "result": 1
}
```

# CollegeUsersAttachments

## API

### create

> POST /users/customize

#### request

field       | required | eg      | desc
:---------- | :------- | :------ | :---
userId      | true     | 1       |
industryIds | true     | [1,2,3] |
locationIds | true     | [1,2,3] |
positionIds | true     | [1,2,3] |
stageIds    | true     | [1,2,3] |

#### response

```json
{
  "result": 1,
}
```

### get user's customization

> GET /users/:userId/customize

#### request

field       | required | eg      | desc
:---------- | :------- | :------ | :---
{userId}      | true     | 1       |

#### response

```json
{
    "industries": [
        {
            "id": 2,
            "name": "咨询"
        },……
    ],
    "stages": [
        {
            "id": 301,
            "name": "行业认知"
        },……
    ],
    "positions": [
        {
            "id": 311,
            "name": "广告/公关"
        },……
    ],
    "locations": [
        {
            "id": 1,
            "name": "上海"
        },……
    ]
}
```

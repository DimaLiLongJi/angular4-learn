# CollegeUsersFavorite

## API

### create

> POST /users/favorite

#### request

field       | required | eg      | desc
:---------- | :------- | :------ | :---
userId      | true     | 1       |
entityType  | true     | opportunity, question |
entityId    | true     | 123     |

#### response

```json
{
  "result": 1,
}
```

### get user's favorites qa/opps

> GET /users/:userId/favorite

#### request

field       | required | eg      | desc
:---------- | :------- | :------ | :---
userId      | true     | 1       |
type        | true     | opportunity, question |
pageNum
itemsPerPage

#### response

```json
question
[
    {
        "id": 3,
        "question": {
            "id": 603,
            "title": "不同的快消企业笔试面试的策略一样吗？",
            "position": null,
            "industry": "消费品/零售",
            "stage": "行业认知"
        }
    },……
]
opps
[
    {
        "id": 4,
        "opportunity": {
            "id": 36437,
            "position": "营销拓展实习生",
            "company": "中海地产佛山公司",
            "location": null,
            "industry": "房地产",
            "applied": 0
        }
    },……
]
```

### delete user's favorite

> DEL /users/favorite/

#### request

field       | required | eg      | desc
:---------- | :------- | :------ | :---
userId      | true     | 1       |
entityType  | true     | opportunity, question |
entityId    | true     | 123     |

#### response

```json
{
  "result": 1,
}
```

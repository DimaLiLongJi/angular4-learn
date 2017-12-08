# CollegeUsersQuestion

## API

### create

> POST /users/:userId/questions

#### request

field        | required | eg       | desc
:----------- | :------- | :------- | :---
{userId}       | true     | 1        |
title        | true     |          |

#### response

```json
{
  "id": 1,
  "entityType": "college_user",
  "entityId": 1,
  "title": "问题1",
  "status": 0,
  "createdAt": "2017-08-01",
  "createdBy": 1,
}
```

### checkCount

> GET /users/:userId/questions/checkCount

#### request

field        | required | eg       | desc
:----------- | :------- | :------- | :---
{userId}       | true     | 1        |

#### response

```json
{
  "count": 1,
}
```

### getList

> GET /users/questions

#### request

field        | required | eg       | desc
:----------- | :------- | :------- | :---
page_num     | false    |
itemsPerPage | false    |
keyword      | false    | 简历   

#### response

```json
{
    "totalItems": 2,
    "questions": [
        {
            "id": 89,
            "entityType": "member",
            "entityId": 1,
            "industryId": null,
            "stageId": null,
            "position": "简历与ngsh",
            "title": "实习而已，去大公司还是小公司有这么重要吗？",
            "status": true,
            "createdAt": "2017-08-25T09:39:56.000Z",
            "createdBy": 1,
            "created_at": "2017-08-25T09:39:56.000Z",
            "collegeUser": null,
            "member": {
                "id": 1,
                "name": "Admin"
            },
            "answers": [
                {
                    "id": 89,
                    "questionId": 89,
                    "entityType": "member",
                    "entityId": 1,
                    "content": "大公司给人感觉好炫，小公司给人感觉好酷。\n先了解一个现实的情况：\n1.很可能90%好的实习机会都会被内推消化掉\n2.学校好、成绩好的学生往往选择了大公司实习，而非重点大学、成绩一般的学生往往去不了心目中的理想大公司实习\n大公司会让人有一个好的简历背书，学习职场规矩，全面认识公司体系、组织架构、薪酬福利，但做的事情可能非常局限于一个小模块\n小公司什么都要做，一人承担起整个项目，收获能力之外的东西，找到自己感兴趣的方向，节奏快，高压力，迅速感受职场生活",
                }
            ],
            "industry": null,
            "stage": null
        },……
    ]
}
```

### get customized questions list

> GET /users/questions/customize

#### request

field        | required | eg       | desc
:----------- | :------- | :------- | :---
userId       | true     | 1
pageNum      | false    |
itemsPerPage | false    |
keyword      | false    | 简历   

#### response

```json
{
    "totalItems": 2,
    "questions": [
        {
            "id": 89,
            "entityType": "member",
            "entityId": 1,
            "industryId": null,
            "stageId": null,
            "position": "简历与ngsh",
            "title": "实习而已，去大公司还是小公司有这么重要吗？",
            "status": true,
            "createdAt": "2017-08-25T09:39:56.000Z",
            "createdBy": 1,
            "created_at": "2017-08-25T09:39:56.000Z",
            "collegeUser": null,
            "member": {
                "id": 1,
                "name": "Admin"
            },
            "answers": [
                {
                    "id": 89,
                    "questionId": 89,
                    "entityType": "member",
                    "entityId": 1,
                    "content": "大公司给人感觉好炫，小公司给人感觉好酷。\n先了解一个现实的情况：\n1.很可能90%好的实习机会都会被内推消化掉\n2.学校好、成绩好的学生往往选择了大公司实习，而非重点大学、成绩一般的学生往往去不了心目中的理想大公司实习\n大公司会让人有一个好的简历背书，学习职场规矩，全面认识公司体系、组织架构、薪酬福利，但做的事情可能非常局限于一个小模块\n小公司什么都要做，一人承担起整个项目，收获能力之外的东西，找到自己感兴趣的方向，节奏快，高压力，迅速感受职场生活",
                }
            ],
            "industry": null,
            "stage": null
        },……
    ]
}
```

### get user's questions list

> GET /users/:userId/questions

#### request

field        | required | eg       | desc
:----------- | :------- | :------- | :---
{userId}     | true     | 1
pageNum      | false    | 1
itemsPerPage |  false   | 10

#### response

```json
[
  {
      "id": 395,
      "entityType": "college_user",
      "entityId": 821,
      "industryId": 81,
      "stageId": 301,
      "position": null,
      "title": "本科金融研究生转成商务管理类该如何确定就业方向",
      "status": true,
      "createdAt": "2017-09-25T16:25:06.000Z",
      "createdBy": 182,
      "created_at": "2017-09-25T16:25:06.000Z",
      "collegeUser": {
          "id": 821,
          "nickname": "tpf",
          "headImgUrl": "http://wx.qlogo.cn/mmopen/mVFXFtp448RxRxQMNu074nXDE6BHsF8HcO1o7O2diah5wgsExUcWWUXWlSGwagqZWiacicCjkf1Cre4gLicHiaqhmoticVSLUGNONv/0",
          "openId": "oK3nC0Wzz_G1_GeSUKZCe0IUuI6o"
      },
      "member": null,
      "industry": {
          "id": 81,
          "name": "通用"
      },
      "stage": {
          "id": 301,
          "name": "行业认知"
      },
      "checked": 0,
  }
]
```

### check user questions

> GET users/:userId/questions/check_read

#### request

field        | required | eg       | desc
:----------- | :------- | :------- | :---
{userId}     | true     | 1

#### response
allChecked: 0，有未查看回答
```json
{
  "allChecked": 0,   
}
```

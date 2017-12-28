# CollegeDanmu

## API

### get danmu data

> GET /danmu

#### request

field  | required | eg | desc
:----- | :------- | :- | :---
userId | false    |    |

#### response

```json
{
  "questions": {
        "publishedQuestions": [
            {
                "id": 3,
                "entityType": "member",
                "entityId": 1,
                "title": "question test",
                "status": false,
                "createdAt": "2017-08-22T00:00:00.000Z",
                "createdBy": 0,
                "created_at": "2017-08-22T00:00:00.000Z",
                "collegeUser": null,
                "member": {
                    "id": 1,
                    "name": "Admin"
                },
                "answers": [
                    {
                        "id": 2,
                        "questionId": 3,
                        "entityType": "member",
                        "entityId": 1,
                        "content": "answer1234",
                        "published": true,
                        "createdAt": "2017-08-22T00:00:00.000Z",
                        "createdBy": 0,
                        "updatedAt": "2017-08-02T00:00:00.000Z",
                        "updatedBy": 0,
                        "created_at": "2017-08-22T00:00:00.000Z",
                        "updated_at": "2017-08-02T00:00:00.000Z",
                        "collegeUser": null,
                        "member": {
                            "id": 1,
                            "name": "Admin"
                        }
                    }
                ]
            }
        ],
        "userQuestions": [
            {
                "id": 2,
                "entityType": "college_user",
                "entityId": 2,
                "title": "quetion2",
                "status": false,
                "createdAt": "2017-08-22T00:00:00.000Z",
                "createdBy": 0,
                "created_at": "2017-08-22T00:00:00.000Z",
                "collegeUser": {
                    "id": 2,
                    "nickname": "某科学的连装炮君",
                    "headImgUrl": "http://wx.qlogo.cn/mmopen/yl0t8qjmCAAXSeIQLWkJDdmNibtnbNBxObnmw676fEhjHbVzzQ7fMCpgvG9SvXSAzicYamTphqiaR7hfeN3dMsvVw/0",
                    "openId": "oK3nC0ZxVWLOrtB3o40Sddyv5vTk"
                },
                "member": null,
                "answers": []
            }
        ]
  },
  "companies": [
      {
          "id": 20767,
          "name": "墨灿游戏",
          "nameExtend": "",
          "imageUrl": "http://media.careerfrog.com.cn/timg.1503297035236.jpg",
          "officialrl": "www.xinyoudi.com/homepage/",
          "industryId": 5,
          "sizeId": 1003,
          ……,
          "opportunity": {
              "id": 26033,
              "position": "市场管培生等多岗位",
              "applyStart": "2017-07-31T16:00:00.000Z",
              "applyEnd": null,
              "applyLink": "http://www.xinyoudi.com/homepage/schoolwanted#jump-here",
              "applyStatus": "ongoing"
          }
      }
  ],
}
```

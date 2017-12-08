# Company

## Table Schema company

## company

field          | type         | not null | constraint  | desc
-------------- | ------------ | -------- | ----------- | ---------------------------------------
id             | int          | true     | primary key | increment
name           | vachar(256)  | true     |             |
introduction   | text         | false    |             |
image_url      | varchar(256) | false    |             |
industry_id    | int          | false    |             | ref: tag, catagory = 'company_industry'
city_id        | int          | false    |             | ref: location_tag
size_id        | int          | false    |             | ref: tag, catagory = 'company_size'
official_url   | vachar(256)  | false    |             |
average_salary | decimal      | false    |             |
recommended    | tinyint      | false    |             | default: 0
enabled        | tinyint      | true     |             | default: 1
created_at     | datetime     | true     |             |
created_by     | int          | true     |             |
updated_at     | datetime     | true     |             |
updated_by     | int          | true     |             |

## API

### get company list

> GET /companies?pageNum={pageNum}&itemsPerPage={itemsPerPage}&isRecommend={isRecommend}&industryId={industryId}&keyword={keyword}&limit={limit}

#### request

field         | required | eg  | desc
:------------ | :------- | :-- | :---
pageNum       | false    | 1   |
itemsPerPage  | false    | 10  |
isRecommended | false    | 1   |
industryId    | false    | 1   |
keyword       | false    | 埃森哲 |

#### response

```json
{
  "pageNum": 1,
  "itemsPerPage": 10,
  "totalItems": 1,
  "companies": [
    {
      "id": 1,
      "name": "alibaba",
      "industry": {
        "id": 1,
        "name": "互联网／电商",
      },
      "city": {
        "id": 10,
        "name": "杭州",
      },
      "size": {
        "id": 100,
        "name": "10000人以上",
      },
      "officialUrl": "www.alibaba.com",
      "averageSalary": 10000,
      "createdAt": "2017-05-11 00:00:00",
      "createdBy": 1,
    }, ……
  ],
}
```

### get recommend company

> GET /recommend_companies

#### request

#### response

```json
[{
  "id": 1,
  "name": "alibaba",
  "industry": {
    "id": 1,
    "name": "互联网／电商",
  },
  "city": {
    "id": 10,
    "name": "杭州",
  },
  "size": {
    "id": 100,
    "name": "10000人以上",
  },
  "officialUrl": "www.alibaba.com",
  "averageSalary": 10000,
  "createdAt": "2017-05-11 00:00:00",
  "createdBy": 1,
}, ……]
```

### get company detail

> GET /companies/:companyId

#### request

field     | required | eg | desc
:-------- | :------- | :- | :---
companyId | true     | 1  |

#### response

```json
{
  "id": 1,
  "name": "alibaba",
  "industry": {
    "id": 1,
    "name": "互联网／电商",
  },
  "city": {
    "id": 10,
    "name": "杭州",
  },
  "size": {
    "id": 100,
    "name": "10000人以上",
  },
  "officialUrl": "www.alibaba.com",
  "averageSalary": 10000,
  "createdAt": "2017-05-11 00:00:00",
  "createdBy": 1,
}
```

### update company detail

> PUT /companies/:companyId

#### request

field         | required | eg              | desc
:------------ | :------- | :-------------- | :---
companyId     | true     | 1               |
name          | true     | alibaba         |
introduction  | true     | alibaba         |
imageUrl      | true     | 123             |
industryId    | true     | 1               |
cityId        | true     | 10              |
sizeId        | true     | 100             |
officialUrl   | false    | www.alibaba.com |
averageSalary | false    | 10000           |

#### response

```json
{
  "result": 1,
}
```

### get similar company

> GET /similar_companies/:companyId

#### request

field     | required | eg | desc
:-------- | :------- | :- | :---
companyId | true     | 1  |

#### response

```json
[{
  "id": 1,
  "name": "alibaba",
  "industry": {
    "id": 1,
    "name": "互联网／电商",
  },
  "city": {
    "id": 10,
    "name": "杭州",
  },
  "size": {
    "id": 100,
    "name": "10000人以上",
  },
  "officialUrl": "www.alibaba.com",
  "averageSalary": 10000,
  "createdAt": "2017-05-11 00:00:00",
  "createdBy": 1,
}, ……]
```

### get university_tour company

> GET /companies/university_tour

#### request

#### response

```json
[
    {
        "id": 2460,
        "name": "中国太平(TaiPing  Insurance Company)",
        "nameExtend": "中国太平",
        "introduction": "1234",
        "companyLabel": "tttt",
        "imageUrl": "https://img.kanzhun.com/images/logo/20140712/e461d85cda47deb58bd9d2f44f3282c9.jpg",
        "officialUrl": "www.cntaiping.com",
        "industryId": 44,
        "cityId": 45,
        "sizeId": 1001,
        "averageSalary": 4832,
        "isRecommended": false,
        "index": null,
        "enabled": true,
        "createdBy": 1,
        "updatedBy": 255,
        "created_at": "2017-05-16T09:13:44.000Z",
        "updated_at": "2017-08-29T07:16:35.000Z",
        "Opportunities": [
            {
                "id": 30760
            }
        ]
    }
]
```

### get university_tour company detail

> GET /companies/:companyId/university_tour

#### request

field     | required | eg | desc
:-------- | :------- | :- | :---
{companyId} | true     | 1  |

#### response

```json
{
    "id": 2460,
    "name": "中国太平(TaiPing  Insurance Company)",
    "nameExtend": "中国太平",
    "introduction": "12345",
    "companyLabel": "tttt",
    "imageUrl": "https://img.kanzhun.com/images/logo/20140712/e461d85cda47deb58bd9d2f44f3282c9.jpg",
    "officialUrl": "www.cntaiping.com",
    "industryId": 44,
    "cityId": 45,
    "sizeId": 1001,
    "averageSalary": 4832,
    "isRecommended": false,
    "index": null,
    "enabled": true,
    "createdBy": 1,
    "updatedBy": 255,
    "created_at": "2017-05-16T09:13:44.000Z",
    "updated_at": "2017-08-29T07:16:35.000Z",
    "Opportunities": [
        {
            "id": 30760,
            "type": 2,
            "publishDate": "2017-08-29T07:16:35.000Z",
            "status": 2,
            "categoryId": 1324,
            "gradAfter": "2007-08-29T00:00:00.000Z",
            "gradBefore": "2017-08-29T00:00:00.000Z",
            "position": "test",
            "companyId": 2460,
            "applyStart": "2017-08-28T16:00:00.000Z",
            "applyEnd": "2017-08-30T16:00:00.000Z",
            "applyLink": null,
            "enabled": 1,
            "created_by": 255,
            "updated_by": 255,
            "description": "<p>test123</p>",
            "created_at": "2017-08-29T07:16:35.000Z",
            "updated_at": "2017-08-29T07:16:35.000Z",
            "company_id": 2460
        }
    ],
    "city": {
        "id": 45,
        "name": "香港"
    },
    "size": {
        "id": 1001,
        "name": "10000人以上"
    },
    "industry": {
        "id": 44,
        "name": "保险/理财"
    }
}
```

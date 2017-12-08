# Opportunity

## API

### get customized opps

> GET /opportunities/customize

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
    "totalItems": 424,
    "pageNum": 1,
    "itemsPerPage": 10,
    "opps": [
        {
            "id": 35514,
            "type": 0,
            "publishDate": "2017-10-12T09:04:52.000Z",
            "status": 2,
            "position": "电信科技组Intern",
            "categoryId": 47,
            "gradAfter": "2017-10-12T00:00:00.000Z",
            "gradBefore": "2020-10-12T00:00:00.000Z",
            "applyStart": null,
            "applyEnd": null,
            "applyLink": null,
            "created_at": "2017-10-12T09:04:52.000Z",
            "updated_at": "2017-10-12T09:04:52.000Z",
            "created_by": 245,
            "description": "<p>工作内容：</p><p>1、参与到具体项目中，与项目组一起完成proposal制作、desk&nbsp;research、问卷设计、项目管理、数据分析、研究报告撰写等项目全部流程。</p><p>2、协助按时完成市场研究报告;</p><p>3、定期进行数据分析、反馈、上报</p><p>4、负责项目的其他支持工作。</p><p>要求：</p><p>1、沟通能力好，理解能力强。&nbsp;</p><p>2、熟练运用Microsoft&nbsp;Office，尤其是PPT和Excel。&nbsp;</p><p>3、每周至少四天，工作至少三个月。&nbsp;</p><p>4、尽快入职，近期面试。</p><p>你可以得到：&nbsp;</p><p>1、学习尼尔森市场咨询领域的思维模式和大量数据的分析能力，对立志于从事市场分析、咨询、电子商务等行业的同学是个很好的锻炼机会。</p><p>2、公司氛围包容开放，组里的同事都很nice，不懂的会耐心教给你，绝对不是打杂哦。</p><p>3、实习工资100&nbsp;RMB/天，实习地点北京市王府井新东安T1写字楼，可提供实习证明。</p><p>有意向者：请将邮件及简历以“姓名&nbsp;学校&nbsp;年级&nbsp;工作天数/周&nbsp;持续月数”的格式命名，发送至jinning.shui@nielsen.com</p>",
            "category": {
                "id": 47,
                "name": "日常实习"
            },
            "creator": {
                "id": 245,
                "name": "单益敏Michael"
            },
            "locations": [
                {
                    "id": 8,
                    "name": "北京",
                    "OppLocationTag": {
                        "id": 39224
                    }
                }
            ],
            "applications": [],
            "company": {
                "id": 52,
                "name": "尼尔森（Nielsen）",
                "officialUrl": "www.nielsen.com",
                "imageUrl": "https://img.kanzhun.com/image/l20812.gif",
                "averageSalary": 9332,
                "companyLabel": "全球市场调研公司十强",
                "industry": {
                    "id": 2,
                    "name": "咨询"
                },
                "size": {
                    "id": 1002,
                    "name": "1000-9999人"
                },
                "city": {
                    "id": 1,
                    "name": "上海"
                }
            }
        },
    ]
}
```

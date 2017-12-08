# COLLEGE DanMu

pub-date: **2017-08-25**

## ¶ college Checklist

### 1.cf-admin 弹幕问题标签&API 1天

#### 功能检查项

  - [ ] 问题表新增industry_id, type_id, position字段
  - [ ] 新增关键词查询记录表，关键词查询统计
  - [ ] 新增问题搜索接口
          无查询条件、关键字时随机取20条结果
          关键字将与行业、认知维度、职位标签和问题同时匹配
  - [ ] 后台列表页新增标签显示
  - [ ] 后台详情页新增标签编辑功能
          所属行业以及认知维度标签单选，必选。所属职位标签提供文本框，10字以内，选填
          若问题无标签，第一个回答该问题的回答者需要给问题选择标签后作答
          若该问题已有标签。在问题下方显示标签，并提供编辑标签的功能。
  - [ ] 数据迁移

#### 开发检查项

  - [ ] `B` `MODIFY` `models` models/cf-college/user/question
  - [ ] `B` `MODIFY` `services` services/cf-college/user/question
  - [ ] `B` `MODIFY` `routes` routes/cf-college/user/question

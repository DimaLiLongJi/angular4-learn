# college DanMu mobile

pub-date: **2017-09-29**

## ¶ checklist 1.5人/天

## REVIEWER: Steve

### 1. 弹幕、问题详情页

- ##### 功能检查项

- [x] 增加搜索按钮，进入搜索问答页。
- [x] 行业、认知维度标签显示。

- ##### 开发检查项

- [ ] `F` `modify` /components/mobile/app/discovery/template.html
- [ ] `F` `modify` /components/mobile/app/discovery/qa/detail/template.html

### 2. 搜索问答页

- ##### 功能检查项

- [ ] 无搜索条件，推荐30个。
- [x] 滚动加载。
- [x] 每条问答包含：问题、行业标签、认知维度、答案（仅显示三行）。
- [x] 点击问题区域，进入问题详情页。
- [x] 搜索结果，返回条数。

- [x] 聚焦搜索框，无关键字，显示热门关键字，有则不显示。
- [x] placeholder: 请输入你感兴趣的问题关键字
- [x] 问题关键字同时与标签和问题匹配。
- [x] 用户选择关键字，会写到输入框，搜索。

- ##### 开发检查项

- [ ] `F` `add` /components/mobile/app/discovery/template.html


- [x] 三行
- [x] 行间距、问题详情。
- [x] 列表标题字体小点。

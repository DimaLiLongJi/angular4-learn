# cf-college

##  职位？实习？列表页 1人/天

  ### 功能检查项

    - [x] 去除全职tab
    - [ ] 只显示实习职位（日常实习、寒暑假实习）
    - [ ] 过滤所有带有外链的职位
    - [x] 删除职位类型筛选条件
    - [ ] 如果原来逻辑记录筛选状态，后端应该做字段过滤处理
    - [ ] 每天职位有公司logo的优先，无logo的排后。有logo中 按时间倒叙排 越新更新越置顶
    - [x] 职位item显示样式调整(新增公司标签)
    - [x] 下滑搜索框和筛选条件置顶
    - [x] 职位名称过长 ... 显示


  ### 开发检查项

   - [ ] `F` `update` `route` public/modules/mobile/app/route.js
   - [ ] `F` `update` `component` public/components/mobile/app/intern-opportunity

## 职位详情页 0.5人/天

  ### 功能检查项

    - [ ] 样式同设计稿显示修改
    - [ ] 查看申请方式 修改为 立即投递
    - [ ] 职位名称过长 ... 显示
    - [ ] 点击立即投递，用户未登录，进入登录注册页。登录注册完成后，则返回投递信息填写页。
    - [ ] 点击立即投递，用户已登录，进入投递信息填写页面
    - [ ] 用户已经投递，立即投递图标变灰



    - [ ] `F` `update` `ejs` views/opportunity/detail-mobile.ejs


## 简历在线投递页 1人/天

  ### 功能检查项

    - [ ] 用户未上传简历，浮层提示登录PC上传。点击 知道了 返回职位详情
    - [ ] 邮件标题文本输入超过输入框宽度时自动换行显示
    - [ ] 邮件标题验证
      - [ ] 1) 必填
      - [ ] 2) 60个字以内，超过则提示 字符过长
    - [ ] 发至HR邮箱的邮件名，后台自动规范邮件名 投递职位名+用户输入的邮件标题
    - [ ] 邮箱验证
      - [ ] 1) 必填
      - [ ] 2) 符合邮箱格式
    - [ ] 必填或者必选提示
    - [ ] 投递成功，弹窗提示。返回所投递的职位的详情页面

  ### 开发检查项

    - [ ] `F` `add` `view` views/opportunity/application-mobile.ejs
    - [ ] `F` `add` `module` public/modules/opportunity-mobile/application

## 公司详情页 0.5人/天

  ### 功能检查项

    - [ ] 增加公司标签显示
    - [ ] 在招职位样式显示修改（看设计稿）
    - [ ] 日常招聘只显示日常实习和寒暑假实习
    - [ ] 校招全职只显示校招全职类职位

  ### 功能检查项

    - [ ] `F` `update` `component` public/modules/mobile/company/detail

## 百科页 0.5人/天

  ### 功能检查项

    - [ ] 删除公司列表以及公司搜索框，其余逻辑不变

  ### 开发检查项

    - [ ] `F` `update` `component` public/components/mobile/app/discovery

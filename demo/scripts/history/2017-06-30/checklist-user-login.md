# CF 求职大学 注册登陆功能

pub-date: **2017-06-30**

## ¶ checklist

### 1. 前台页面

#### 1.1 页面逻辑 0.5

  - [x] 未注册的用户 **每天** 可无偿看5个职位的投递方式。当看到第六个职位，点击“查看申请方式”时，将弹出注册登录框。
  - [ ] 已登录的用户则可无限次看投递方式。
  - [ ] 登陆有效期15天。

- ##### 开发检查项

  - [ ] `F` `MODIFY` `component` /pages/index/mobile/index.js
  - [ ] `F` `MODIFY` `component` /pages/index/mobile/intern-opportunity/index.js
  - [ ] `F` `MODIFY` `component` /pages/index/mobile/fulltime-opportunity/index.js

#### 1.1  注册页面 1.5

  - ##### 开发检查项

    - [ ] `F` `ADD` `component` /pages/index/mobile/auth/signin

  - ##### 功能检查项

    - [ ] 用户点击“随便看看”则返回跳转前的页面。
    - [ ] 必填项: 手机号、验证码、手机验证码、昵称、密码
    - [ ] 手机号: 可选择国际区号、手机格式校验
    - [ ] 验证码: 必须输入正确的验证码和手机号才能点击“申请发送”
                 点击验证码图片区域即可更换新的验证码
    - [ ] 验证码两分钟失效时间
    - [ ] 输入校验: 昵称、密码字数校验
    - [ ] 非空校验、错误提示

#### 1.2 登陆页面 1.5

  - ##### 开发检查项

    - [ ] `F` `ADD` `component` /pages/index/mobile/auth/login

  - ##### 功能检查项

    - [ ] 必填项：手机号、密码
    - [ ] 若手机号不存在，提示：请输入正确的手机号
          若密码和手机号不能匹配，则提示：请输入正确的密码
    - [ ] 点击忘记密码跳转

#### 1.2 找回密码页面 1.5

  - ##### 开发检查项

    - [ ] `F` `ADD` `component` /pages/index/mobile/password-recover

  - ##### 功能检查项

    - [ ] 必填项：手机号、手机验证码
    - [ ] 输入校验：手机号必须存在，手机验证码必须正确
### 2. 后台接口

#### 2.1 用户表

  - ##### 开发检查项

    - [ ] `B` `ADD` `models` models/cf-college/user.js

  - ##### 功能检查项

    - [ ] 用户Table Schema

#### 2.2 用户注册登陆接口

  - ##### 开发检查项

    - [ ] `B` `ADD` `services` services/cf-college/user-auth.js
    - [ ] `B` `ADD` `routes` routes/cf-college/user-auth.js

  - ##### 功能检查项

    - [ ] 用户登陆API
    - [ ] 用户注册API
    - [ ] API参数校验
    - [ ] 校验接口完整性

#### 2.3 发送验证码短信接口

  - ##### 开发检查项

    - [ ] `B` `ADD` `services` services/cf-college/sms.js
    - [ ] `B` `ADD` `routes` routes/cf-college/sms.js

  - ##### 功能检查项

    - [ ] 验证码接口
    - [ ] 短信发送接口
    - [ ] 校验接口完整性

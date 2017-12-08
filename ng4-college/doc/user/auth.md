# User Auth

## API

### sign in

> POST auth/sign_in

#### request

field      | required | eg          | desc
---------- | -------- | ----------- | ----
nickname   | true     | bb          |
prefixId   | true     | 1           |
mobile     | true     | 18912341234 |
password   | true     | 123         |
verifyCode | true     | 123         |

#### response

##### success

```json
{
  "id": 1,
  "nickname": "bb",
  "prefixId": "1",
  "mobile": "销售",
  "createdBy": 1,
  "createdAt": "2016-05-17T08:32:30.000Z"
}
```

##### error

```json
{
  "msg": "用户注册失败",
  "error": "errors"
}
```

### login

> POST auth/login

#### request

field    | required | eg          | desc
:------- | :------- | :---------- | :---
mobile   | true     | 18912341234 |
password | true     | 123         |

#### response

##### success

```json
{
  "id": 1,
  "nickname": "bb",
  "prefixId": "1",
  "mobile": "销售"
}
```

##### error

```json
{
  "msg": "用户登录失败",
  "error": "errors"
}
```

### recover password

> PUT auth/pw_recover

#### request

field      | required | eg          | desc
:--------- | :------- | :---------- | :---
mobile     | true     | 18912341234 |
password   | true     | 123         |
verifyCode | true     | 132         |

#### response

##### success

```json
{
  "result": 1
}
```

##### error

```json
{
  "msg": "用户修改密码失败",
  "error": "errors"
}
```

### logout

> GET auth/logout

#### request

#### response

##### success

```json
{
  "result": 1
}
```

##### error

```json
{
  "msg": "用户登出失败",
  "error": "errors"
}
```

### get captcha

> GET auth/captcha

#### request

#### response

file stream image

```cookies
{
    captcha: '1AB2'
  }
```

### send code sms

> POST /auth/send_verify_code_sms

#### request

field       | required | eg          | desc
:---------- | :------- | :---------- | :---
mobile      | true     | 18912341234 |
prefixValue | true     | 123         |
captcha     | true     | 132         |

#### response

##### success

```json
{
  "verifyCode": "Z637ZH"
}
```

##### error

```json
{
  "msg": "用户发送验证码失败",
  "error": "errors"
}
```

### check mobile exist

> GET auth/mobile_check

#### request

field    | required | eg          | desc
:------- | :------- | :---------- | :---
mobile   | true     | 18912341234 |
prefixId | true     | 86          |

#### response

##### success

```json
{
  "result": 1
}
```

##### error

```json
{
  "result": 0
}
```

### user logout

> GET auth/logout

#### request

#### response

redirect('/')

### check verifyCode

> POST auth/check_verify_code

#### request

field      | required | eg     | desc
:--------- | :------- | :----- | :---
verifyCode | true     | 1AB2C3 |

#### response

##### success

```json
{
  "result": 1,
}
```

##### error

```json
{
  "msg": "手机验证码校验失败",
  "error": "errors"
}
```

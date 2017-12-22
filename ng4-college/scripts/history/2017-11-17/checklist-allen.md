# college 面经

pub-date: **2017-11-17**

[需求文档](http://note.youdao.com/share/?id=c3abacdf07062e96ab669538199296d8&type=note#/)

## ¶ 首页
- ##### 功能检查项
- [ ] 8个行业，点击进入对应行业。
- [ ] 主页的搜索功能，搜索所有行业的所有面经。**API关键字匹配面经和锦囊的文件名、以及面经锦囊对应的公司名、叙词**
- 搜索结果
 - [ ] 面试锦囊、面试经验都有。
 - [ ] 面试锦囊为空，面试经验平铺显示。
 - [ ] 20分页，实时搜索
 - [ ] 面试经验为空。
 - [ ] 都为空，显示placeholder。

## 2 面经详情页

- ##### 功能检查项
- [ ] 两个模块，面试锦囊、面试经验。
- [ ] 下载需登录。未登录点击下载弹窗登录。
- 面试锦囊
- [ ] 展示该行业的锦囊(API)。
- [ ] 点击图片、文件名、阅读按钮均新开页面预览。
- [ ] 预览需屏蔽下载按钮。
- [ ] 点击下载按钮可下载。
- [ ] 显示阅读下载量。
- [ ] 初始阅读量设定（**阅读、下载的统计**）。
- 面试经验
- [ ] 展示该行业的热门公司(API).
- [ ] 点击热门公司，高亮，展开该公司下面的面经。
- [ ] 页面默认选中第一家热门公司，点击切换。
- [ ] **热门公司的下载量**，是计算该公司所有的面经的下载量。
- [ ] 面经5个一组。
- [ ] 热门公司可左右切换，可切换按钮为蓝色，不可切换按钮为灰色。
- [ ] 更多公司，显示 **除热门公司之外** 的其他面经(API)。
- [ ] 显示更新时间，预览，下载。
- [ ] 10个分页，仅该模块。
- [ ] 面经详情页，搜索该行业的锦囊和面经。


bug list:

- [ ] input 背景
- [ ] 循环？

- [x] 顶部挤乱
- [x] 面试锦囊对齐。
- [x] 文件名超长。
- [x] 热门公司的配图。
- [x] 面试锦囊、热门公司间距
- [x] 只在文件名上点击有效
- [x] 小竖线的浮动高亮去掉
- [x] 资料预览的顶部遮挡。
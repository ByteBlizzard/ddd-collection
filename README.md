# 关于本项目

QQ 群：551966882

收集了一些群内的 交流心得 与 技术分享

如果你对前端功能并不关心，或者本地没有 nodejs 环境，
推荐在 [stackblitz](https://stackblitz.com/)中完成修改与测试等工作

- 框架采用 [Nuxt3](https://nuxt.com.cn/) 搭建
- 组件库采用 [primevue](https://primevue.org/) 虽然在国内不出名，但这是一个很严谨的前端组件库
- 包管理工具采用 [pnpm](https://pnpm.io/zh/)

## 贡献流程

1. fork 项目的主分支
2. 创建新的分支，在这个分支上完成你的修改、并测试
3. 按照[#git 提交描述规则](#git 提交描述规则)进行提交（git commit 功能）
4. 视情况把多次同类提交合并为一次功能明确的提交（git squash 功能）
5. 将代码推送到你自己的分支（git push 功能）
6. 提交 PR（pull request）

## 文档部分

采用Nuxt Content框架提供的\<ContentNavigation>组件进行导航，使一个文档中不需要维护跳转至另一个文档的链接。

### 目录结构

```yaml
- content/ #静态文档目录
  - books/ #书籍目录
    - .书籍推荐.md #只起到说明目录的作用，不会映射到网站中
    - index.md #书籍首页 url映射为 /books
  - examples/ #示例项目目录
    - .项目示例.md #只起到说明目录的作用，不会映射到网站中
    - index.md #示例项目首页 url映射为 /examples
    - parking.md #停车场案例详情 url映射为 /examples/parking
  - .首页一级目录.md #只起到说明目录的作用，不会映射到网站中
  - index.md #网站的首页 url映射为 /
- [others]... #其他目录也和Nuxt3官网的目录结构一样
```

## 提交须知

### 基本准则

- 我要维护文档

  - 尽量在每次提交时都做单一的事情，不要一次性删改大量文件，以防造成大量版本冲突

- 我要修改框架本身的功能/样式

  - 需要自行使用主流浏览器测试完成

  - 任何的代码更改都不能给维护 md 静态文件的工作流带来额外负担

### git 提交描述前缀

所有的提交说明必须遵守 `前缀:[空格]说明` 的格式

#### docs

表示维护了 md 文档

例：`docs: 新增一个 ddd 案例`

#### fix

表示修改了框架的 bug

例：`fix: 修复了搜索导航不跳转的问题`

#### opt

表示优化了某些功能

例：`opt: 优化了当内容过长时的样式问题`

#### feat

表示新增了一项特性

例: `feat: 新增了主题切换功能 (light/dark)`

#### build

表示由于某些特殊原因需要触发 github actions，以达到重新部署的目的

例: `build: 修改了 xxx 配置文件`

### 循环依赖问题

[](https://docs.nestjs.com/fundamentals/circular-dependency)
forwardRef 相互依赖问题解决
NOTE: service  module 都需要配置


###  [class-validator 校验器的使用](https://github.com/typestack/class-validator)

### [全局管道类验证的方式](https://docs.nestjs.cn/9/pipes?id=%e7%b1%bb%e9%aa%8c%e8%af%81%e5%99%a8)
1. main.ts
2. app.module.ts注入

### roles.guard.ts  this.reflector.get is not a function 
个人问题 

### 待办项
- 用户、应用、角色、权限 CRUD
- 接入 swagger ui
- 全局返回过滤器 返回数据结构统一
- 全局类验证 输入字段校验
- 登录鉴权 (所有用户都可以登录，只能查询数据 。admin 可以修改)
- 权限认证
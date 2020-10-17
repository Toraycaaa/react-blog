// 暴露方法
module.exports = app => {
    const {router, controller} = app
    // 配置路由：当访问域名时，使用后面的方法
    router.get('/default/index',controller.default.home.index)
    router.get('/default/getArticleList',controller.default.home.getArticleList)
    //含参数的路由
    router.get('/default/getArticleById/:id',controller.default.home.getArticleById)
    router.get('/default/getTypeInfo',controller.default.home.getTypeInfo)

    router.get('/default/getListById/:id',controller.default.home.getListById)

}

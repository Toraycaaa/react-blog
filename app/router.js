'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  // const { router, controller } = app;
  // router.get('/', controller.home.index);
  // // 设置路由
  // router.get('/list', controller.home.list);

  
  //由外部文件引入路由
  require('./router/default')(app)
  require('./router/admin')(app)
};

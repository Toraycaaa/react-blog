'use strict';

// /** @type Egg.EggPlugin */
// module.exports = {
//   // had enabled by egg
//   // static: {
//   //   enable: true,
//   // }
// };

// 配置egg-mysql
exports.mysql = {
  enable: true,
  package: 'egg-mysql'
}
//egg-cors 解决egg跨域问题
exports.cors = {
  enable: true,
  package: 'egg-cors'
}

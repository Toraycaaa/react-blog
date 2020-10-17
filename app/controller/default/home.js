'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    // // 获取数据库中的数据,第二个参数为条件
    // let result = await this.app.mysql.get('blog_content',{})
    // console.log(result)
    this.ctx.body = 'api hi';
  }
  // 建立接口,使用from_unixtime 修改timestamp   FROM_UNIXTIME(article.addTime,'%y-%m-%d %h-%i-%s')
  async getArticleList(){
    let sql = 'SELECT '+ 
              'article.id as id, ' + 
              'article.title as title,' +
              'article.introduce as introduce,' +
              "from_unixtime(unix_timestamp(article.addTime),'%Y-%m-%d %H:%i:%s') as addTime,"+
              'article.view_count as view_count,' +
              'type.typeName as typeName ' +
              'FROM article LEFT JOIN type ON article.type_id = type.Id'
    // query: 高级查询,可以输入sql语句
    const results = await this.app.mysql.query(sql)
    // 返回数据
    this.ctx.body={data:results}

  }

  async getArticleById(){
    //从前台传入ID
    let id = this.ctx.params.id

    let sql = 'SELECT '+ 
              'article.id as id, ' + 
              'article.title as title,' +
              'article.introduce as introduce,' +
              'article.article_content as article_content,' +
              "from_unixtime(unix_timestamp(article.addTime),'%Y-%m-%d %H:%i:%s') as addTime,"+
              'article.view_count as view_count,' +
              'type.typeName as typeName, ' +
              'type.id as typeId ' +
              'FROM article LEFT JOIN type ON article.type_id = type.Id '+
              'WHERE article.id=' + id
    const result = await this.app.mysql.query(sql)

    this.ctx.body={data:result}
  }
  //得到类别名称和编号

  async getTypeInfo(){
    const result = await this.app.mysql.select('type')
    this.ctx.body={data:result}
  }

  //根据类别ID获得文章列表
  async getListById(){
    //从前台传入ID
    let id = this.ctx.params.id

    let sql = 'SELECT '+ 
              'article.id as id, ' + 
              'article.title as title,' +
              'article.introduce as introduce,' +
              'article.article_content as article_content,' +
              'article.addTime as addTime,'+
              'article.view_count as view_count,' +
              'type.typeName as typeName, ' +
              'type.id as typeId ' +
              'FROM article LEFT JOIN type ON article.type_id = type.Id '+
              'WHERE type_id=' + id
    const result = await this.app.mysql.query(sql)
    this.ctx.body={data:result}
  }

}

module.exports = HomeController;

'use strict';

const Controller = require('egg').Controller

class MainController extends Controller{

    async index(){
        //首页的文章列表数据
        this.ctx.body='hi api'
    }

    async checkLogin (){
        //从前端传入的数据
        let userName = this.ctx.request.body.userName
        let password = this.ctx.request.body.password
        const sql = " SELECT userName FROM admin_user WHERE userName = '"+userName +
        "' AND password = '"+password+"'"
        const res = await this.app.mysql.query(sql)
        //当存在这个user
        if(res.length > 0){
            //时间戳作为密钥
            let openId = new Date().getTime()
            this.ctx.session.openId={'openId': openId}
            this.ctx.body={'data' : 'success',
                           'openId' : openId 
                        }
        }else{
            this.ctx.body={'data':'failed'}
        }
    }

    async getTypeInfo(){
        const resType = await this.app.mysql.select('type')
        this.ctx.body={data:resType}
    }

    
    //添加文章
async addArticle(){

    let tmpArticle= this.ctx.request.body
    //插入数据
    const result = await this.app.mysql.insert('article',tmpArticle)
    //通过改变的行数验证是否插入成功
    const insertSuccess = result.affectedRows === 1
    //返回新插入的Id
    const insertId = result.insertId

    this.ctx.body={
        isSuccess:insertSuccess,
        insertId:insertId
    }
}
//修改文章
async updateArticle (){
    let tempArticle = this.ctx.request.body
    // 更新数据
    const result = await this.app.mysql.update('article',tempArticle)
    const updateSuccess = result.affectedRows === 1
    this.ctx.body={
        isSuccess: updateSuccess
    }

}

async getArticleList(){
    let sql = 'SELECT article.id as id,'+
                'article.title as title,'+
                'article.introduce as introduce,'+
                'article.view_count as view_count,'+
                'article.addTime as addTime,'+
                'type.typeName as typeName '+
                'FROM article LEFT JOIN type ON article.type_id = type.Id '+
                'ORDER BY article.id DESC '
    const resList = await this.app.mysql.query(sql)
    this.ctx.body={list:resList}
}

async delArticle(){
    let id = this.ctx.params.id
    //删除语句（对象表，{列：参数}
    const res = await this.app.mysql.delete('article',{'id':id})
    this.ctx.body = {data:res}
}

async getArticleById(){
    let id = this.ctx.params.id

    let sql = 'SELECT article.id as id,'+
                'article.title as title,'+
                'article.introduce as introduce,'+
                'article.article_content as article_content, '+
                'article.addTime as addTime,'+
                'article.view_count as view_count,'+
                'type.typeName as typeName, '+
                'type.id as typeId '+
                'FROM article LEFT JOIN type ON article.type_id = type.Id '+
                'WHERE article.id = ' + id
    const result = await this.app.mysql.query(sql)
    this.ctx.body = {data:result}
}

}

module.exports = MainController
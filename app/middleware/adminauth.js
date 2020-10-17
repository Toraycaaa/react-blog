module.exports = options => {
    //路由守卫
    return async function adminauth(ctx,next){
        console.log(ctx.session.openId)
        //检测是否存在openID
        if (ctx.session.openId){
            await next()
        }else{
            ctx.body={data:'unlogin'}
        }
    }
}
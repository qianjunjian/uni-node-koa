const SystemError = require("../modal/SystemError");

module.exports = async (ctx, next) => {
    try {
        await next();
    } catch (e) {
        console.log(e)
        if (e instanceof SystemError) {
            ctx.body = {
                errmsg: e.errmsg,
                errcode: e.errcode
            }
        } else {
            console.log(e)
            ctx.body = {
                errcode: 500,
                errmsg: "系统异常"
            }
            ctx.status = 500;
        }
    }
}
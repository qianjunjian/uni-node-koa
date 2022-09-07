const SystemError = require("../modal/SystemError");

module.exports = async (ctx, next) => {
    try {
        await next();
    } catch (e) {
        if (e instanceof SystemError) {
            ctx.body = {
                errmsg: e.errmsg,
                errcode: e.errcode
            }
        } else {
            ctx.body = {
                errmsg: "系统异常"
            }
            ctx.status = 500;
        }
    }
}
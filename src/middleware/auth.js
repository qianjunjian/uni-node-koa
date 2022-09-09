const auth = require("basic-auth");
const SystemError = require("../modal/SystemError");
const { checkToken } = require("../utils/token/token");
const {
    apiWhiteList
} = require("../../config/cloud");

module.exports = async (ctx, next) => {
    const {url, request} = ctx;
    // 白名单
    if (apiWhiteList.indexOf(url) < 0) {
        const token = auth(request);
        if (!token || !token.name) {
            throw new SystemError("没有访问权限", 401);
        }
        try {
            var authCode = checkToken(token.name);
        } catch (e) {
            if (e && e.name == "TokenExpiredError") {
                throw new SystemError("账号过期，请重新登录！", 401);
            }
            throw new SystemError("没有访问权限", 401);
        }
        ctx.auth = {
            uid: authCode.uid
        }
    }
    await next();
}
const router = require("koa-router")();
const Result = require("../../modal/Result");
const SystemError = require("../../modal/SystemError");
const { getToken } = require("../../utils/token/token");
const $post = require("../../cloud/database");

router.post("/login", async (ctx) => {
    const { account, password } = ctx.request.body;
    try {
        const res = await $post("query", `db.collection(\"business_diancan_acc\").where({account:"${account}",password:"${password}"}).get()`)
        if (res.data && res.data.length == 0) {
            new Result(ctx, "账号或者密码错误！", 400).answer();
        } else {
            const obj = JSON.parse(res.data[0]);
            const token = getToken({
                uid: obj.uid
            });
            new Result(ctx, "登录成功！", 200, {
                token
            }).answer();
        }
    } catch(e) {
        throw new SystemError("登录失败，服务器发生错误", 500);
    }
});

module.exports = router;

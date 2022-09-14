const router = require("koa-router")();
const Result = require("../../modal/Result");
const SystemError = require("../../modal/SystemError");
const UserCheck = require("../../utils/check/userCheck");
const $post = require("../../cloud/database");

router.post("/register", async (ctx) => {
    const { account, password } = ctx.request.body;
    new UserCheck(ctx, account, password).check();
    try {
        const res = await $post("query", `db.collection(\"business_diancan_acc\").where({account:"${account}"}).get()`)
        if (res.data.length > 0) {
            new Result(ctx, "此账号已经注册过！", 400).answer();
        } else {
            // 插入数据
            const uid = new Date().getTime();
            const obj = JSON.stringify({
                account,
                password,
                uid: String(uid)
            })
            await $post("add", `db.collection(\"business_diancan_acc\").add({data: ${obj}})`)
            new Result(ctx, "注册成功！", 200).answer();
        }
    } catch(e) {
        throw new SystemError("注册失败，服务器发生错误", 500);
    }
});

module.exports = router;
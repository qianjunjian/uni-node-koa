const router = require("koa-router")();
const Result = require("../../modal/Result");
const SystemError = require("../../modal/SystemError");
const $post = require("../../cloud/database");
const ShopCheck = require("../../utils/check/shopCheck");

router.post("/shopAdd", async (ctx) => {
    const { name, address, logo } = ctx.request.body;
    new ShopCheck(ctx, name, address, logo).check();
    try {
        const uid = ctx.auth.uid;
        const res = await $post("query", `db.collection(\"business_diancan_shop\").where({uid:"${uid}"}).get()`)
        if (res.data.length > 0) {
            new Result(ctx, "您已经拥有店铺！", 400).answer();
        } else {
            const obj = JSON.stringify({
                name,
                address,
                logo: JSON.parse(logo),
                uid: String(uid)
            })
            await $post("add", `db.collection(\"business_diancan_shop\").add({data: ${obj}})`)
            new Result(ctx, "添加成功！", 200).answer();
        }
    } catch(e) {
        throw new SystemError("添加失败，服务器发生错误", 500);
    }
});

module.exports = router;
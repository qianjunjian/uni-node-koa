const router = require("koa-router")();
const Result = require("../../modal/Result");
const SystemError = require("../../modal/SystemError");
const $post = require("../../cloud/database");
const ShopCheck = require("../../utils/check/shopCheck");

router.post("/shopUpdate", async (ctx) => {
    const { id, name, address, logo } = ctx.request.body;
    new ShopCheck(ctx, name, address, logo).check();
    try {
        const obj = JSON.stringify({
            name,
            address,
            logo: JSON.parse(logo)
        })
        const res = await $post("update", `db.collection(\"business_diancan_shop\").doc(\"${id}\").update({data: ${obj}})`)
        if (res.errcode === 0) {
            new Result(ctx, "更新成功！", 200).answer();
        } else {
            throw new SystemError("未更新成功", 500);
        }
    } catch(e) {
        throw new SystemError("更新失败，服务器发生错误", 500);
    }
});

module.exports = router;
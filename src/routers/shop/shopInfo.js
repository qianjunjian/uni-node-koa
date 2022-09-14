const router = require("koa-router")();
const Result = require("../../modal/Result");
const SystemError = require("../../modal/SystemError");
const $post = require("../../cloud/database");
const ShopCheck = require("../../utils/check/shopCheck");

router.get("/shopInfo", async (ctx) => {
    try {
        const uid = ctx.auth.uid;
        const res = await $post("query", `db.collection(\"business_diancan_shop\").field({name: true, logo: true, address: true, _id: true}).where({uid:"${uid}"}).get()`)
        if (res.data.length > 0) {
            new Result(ctx, "SUCCESS", 200, JSON.parse(res.data[0] || {})).answer();
        } else {
            new Result(ctx, "SUCCESS", 200).answer();
        }
    } catch(e) {
        throw new SystemError("添加失败，服务器发生错误", 500);
    }
});

module.exports = router;
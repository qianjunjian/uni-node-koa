const router = require("koa-router")();
const Result = require("../../modal/Result");
const SystemError = require("../../modal/SystemError");
const $post = require("../../cloud/database");
const ShopCheck = require("../../utils/check/shopCheck");

router.get("/unitQuery", async (ctx) => {
    try {
        const res = await $post("query", `db.collection(\"business_diancan_unit\").get()`)
        if (res.data.length > 0) {
            const data = res.data.map(item => JSON.parse(item));
            new Result(ctx, "SUCCESS", 200, data).answer();
        } else {
            new Result(ctx, "SUCCESS", 200).answer();
        }
    } catch(e) {
        throw new SystemError("查询失败，服务器发生错误", 500);
    }
});

module.exports = router;
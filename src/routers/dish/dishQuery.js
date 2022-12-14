const router = require("koa-router")();
const Result = require("../../modal/Result");
const SystemError = require("../../modal/SystemError");
const $post = require("../../cloud/database");
const dayjs = require("dayjs");

router.get("/dishQuery", async (ctx) => {
    const { page = 0 } = ctx.query;
    try {
        const sk = page * 10;
        const res = await $post("query", `db.collection(\"business_diancan_dishes\").orderBy("time", "desc").limit(10).skip(${sk}).get()`);
        const data = res.data.map(item => JSON.parse(item))
        new Result(ctx, "SUCCESS", 200, {
            total: res.pager.Total || 0,
            list: data
        }).answer();
    } catch(e) {
        throw new SystemError("查询失败，服务器发生错误", 500);
    }
});

module.exports = router;

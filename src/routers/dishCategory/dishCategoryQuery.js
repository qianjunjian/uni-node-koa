const router = require("koa-router")();
const Result = require("../../modal/Result");
const SystemError = require("../../modal/SystemError");
const $post = require("../../cloud/database");
const CategoryCheck = require("../../utils/check/CategoryCheck");

router.get("/dishCategoryQuery", async (ctx) => {
    const { page = 0 } = ctx.query;
    try {
        const uid = ctx.auth.uid;
        const sk = page * 10;
        const res = await $post("query", `db.collection(\"business_diancan_dishes_category\").field({label: true, value: true, count: true, _id: true, cid: true}).orderBy("cid", "desc").where({uid:"${uid}"}).limit(10).skip(${sk}).get()`);
        const data = res.data.map(item => JSON.parse(item))
        new Result(ctx, "SUCCESS", 200, {
            total: res.pager.Total || 0,
            list: data
        }).answer();
    } catch(e) {
        throw new SystemError("添加失败，服务器发生错误", 500);
    }
});

module.exports = router;
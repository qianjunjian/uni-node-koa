const router = require("koa-router")();
const Result = require("../../modal/Result");
const SystemError = require("../../modal/SystemError");
const $post = require("../../cloud/database");

router.get("/dishDelete", async (ctx) => {
    const { _id, cid } = ctx.query;
    try {
        await $post("update", `db.collection(\"business_diancan_dishes\").doc(\"${_id}\").update({data: {onSale: false}})`)
        await $post("update", `db.collection(\"business_diancan_dishes_category\").where({cid:"${cid}"}).update({data: {count: _.inc(-1)}})`)
        new Result(ctx, "下架成功！", 200).answer();
    } catch(e) {
        throw new SystemError("下架失败，服务器发生错误", 500);
    }
});

module.exports = router;

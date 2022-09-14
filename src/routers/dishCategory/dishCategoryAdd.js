const router = require("koa-router")();
const Result = require("../../modal/Result");
const SystemError = require("../../modal/SystemError");
const $post = require("../../cloud/database");
const CategoryCheck = require("../../utils/check/CategoryCheck");

router.post("/dishCategoryAdd", async (ctx) => {
    const { category } = ctx.request.body;
    new CategoryCheck(ctx, category).check();
    try {
        const uid = ctx.auth.uid;
        const res = await $post("query", `db.collection(\"business_diancan_dishes_category\").where({label:"${category}", uid:"${uid}"}).get()`)
        if (res.data.length > 0) {
            new Result(ctx, "已有该菜品类目，请重新输入！", 400).answer();
        } else {
            const cid = "a" + new Date().getTime();
            const obj = JSON.stringify({
                label: category,
                value: category,
                count: 0,
                cid: cid,
                uid: String(uid)
            })
            await $post("add", `db.collection(\"business_diancan_dishes_category\").add({data: ${obj}})`)
            new Result(ctx, "添加成功！", 200).answer();
        }
    } catch(e) {
        throw new SystemError("添加失败，服务器发生错误", 500);
    }
});

module.exports = router;
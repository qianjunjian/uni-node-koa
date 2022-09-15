const router = require("koa-router")();
const Result = require("../../modal/Result");
const SystemError = require("../../modal/SystemError");
const $post = require("../../cloud/database");
const UnitCheck = require("../../utils/check/UnitCheck");

router.post("/unitAdd", async (ctx) => {
    const { unit } = ctx.request.body;
    new UnitCheck(ctx, unit).check();
    try {
        const res = await $post("query", `db.collection(\"business_diancan_unit\").where({label:"${unit}"}).get()`)
        if (res.data.length > 0) {
            new Result(ctx, "已有此单位，增加失败！", 400).answer();
        } else {
            const obj = JSON.stringify({
                label: unit,
                value: unit
            })
            await $post("add", `db.collection(\"business_diancan_unit\").add({data: ${obj}})`)
            new Result(ctx, "添加成功！", 200).answer();
        }
    } catch(e) {
        throw new SystemError("添加失败，服务器发生错误", 500);
    }
});

module.exports = router;
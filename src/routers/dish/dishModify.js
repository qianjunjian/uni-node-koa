const router = require("koa-router")();
const Result = require("../../modal/Result");
const SystemError = require("../../modal/SystemError");
const $post = require("../../cloud/database");
const DishCheck = require("../../utils/check/DishCheck");
const dayjs = require("dayjs");

router.post("/dishModify", async (ctx) => {
    const { _id, cid, category, image, name, unitPrice, unit, quintity } = ctx.request.body;
    new DishCheck(ctx, cid, category, image, name, unitPrice, unit, quintity).check();
    try {
        const obj = JSON.stringify({
            cid: cid,
            category: category,
            name: name,
            unitPrice: unitPrice,
            unit: unit,
            quintity: quintity,
            image: JSON.parse(image),
            time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            onSale: true,
        })
        await $post("update", `db.collection(\"business_diancan_dishes\").doc(\"${_id}\").update({data: ${obj}})`)
        new Result(ctx, "修改成功！", 200).answer();
    } catch(e) {
        throw new SystemError("修改失败，服务器发生错误", 500);
    }
});

module.exports = router;

const router = require("koa-router")();
const Result = require("../../modal/Result");
const SystemError = require("../../modal/SystemError");
const $post = require("../../cloud/database");
const DishCheck = require("../../utils/check/DishCheck");
const dayjs = require("dayjs");

router.post("/dishAdd", async (ctx) => {
    const { cid, category, image, name, unitPrice, unit, quintity } = ctx.request.body;
    new DishCheck(ctx, cid, category, image, name, unitPrice, unit, quintity).check();
    try {
        const res = await $post("query", `db.collection(\"business_diancan_dishes\").where({name:"${name}"}).get()`)
        if (res.data.length > 0) {
            new Result(ctx, "已有该菜品，请重新输入！", 400).answer();
        } else {
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
            await $post("add", `db.collection(\"business_diancan_dishes\").add({data: ${obj}})`)
            await $post("update", `db.collection(\"business_diancan_dishes_category\").where({cid:"${cid}"}).update({data: {count: _.inc(1)}})`)
            new Result(ctx, "添加成功！", 200).answer();
        }
    } catch(e) {
        throw new SystemError("添加失败，服务器发生错误", 500);
    }
});

module.exports = router;

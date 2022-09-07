const router = require("koa-router")();
const Result = require("../../modal/Result");
const getToken = require("../../cloud/getToken");

router.get("/register", async (ctx) => {
    const token = await getToken();
    const res = new Result(ctx, undefined, undefined, {
        token
    });
    res.answer();
});

module.exports = router;

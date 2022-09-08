const router = require("koa-router")();
const Result = require("../../modal/Result");

router.get("/register", async (ctx) => {
   const { account, password } = ctx.request.body;
   
});

module.exports = router;

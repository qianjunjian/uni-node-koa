const router = require("koa-router")();
const Result = require("../../modal/Result");
const UserCheck = require("../../utils/check/userCheck");

router.post("/register", async (ctx) => {
   const { account, password } = ctx.request.body;
   new UserCheck(ctx, account, password).check();
});

module.exports = router;
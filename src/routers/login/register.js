const router = require("koa-router")();
const Result = require("../../modal/Result");
const SystemError = require("../../modal/SystemError");
const UserCheck = require("../../utils/check/userCheck");
const $post = require("../../cloud/database");

router.post("/register", async (ctx) => {
   const { account, password } = ctx.request.body;
   new UserCheck(ctx, account, password).check();
   try {
      const res = await $post("query", `db.collection(\"business_diancan_acc\").where({account:${account},password:${password}}).get()`)
      console.log(res)
      if (res.data.length > 0) {
         new Result(ctx, "已经注册过", 202)
      } else {
         //
      }
   } catch(e) {
      throw new SystemError(e, 500)
   }
   
});

module.exports = router;
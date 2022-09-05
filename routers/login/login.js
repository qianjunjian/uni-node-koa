const router = require("koa-router")();

router.get("/register", async (ctx) => {
    ctx.body={
        name: "1231"
    }
});

module.exports = router;
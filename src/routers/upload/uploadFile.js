const router = require("koa-router")();
const Result = require("../../modal/Result");
const SystemError = require("../../modal/SystemError");
const { upload, uploadFile } = require("../../utils/cos/cos");

router.post("/uploadFile", upload.single("file"), async (ctx) => {
    try {
        const res = await uploadFile(ctx.file.filename, ctx.file.path)
        new Result(ctx, "上传成功！", 200, "https://" + res).answer();
    } catch(e) {
        throw new SystemError("上传失败，服务器异常！", 500);
    }
});

module.exports = router;
const Koa = require("koa");
const app = new Koa();
const path = require("path");
const json = require("koa-json");
const parser = require("koa-bodyparser");
const router = require("koa-router")();
const cors = require("koa2-cors");
const errMid = require("./src/middleware/errorMiddleware");
const auth = require("./src/middleware/auth");

const _api = "/api";

const requireContext = require("require-context");
const routePath = path.resolve(process.cwd(), "./src/routers");
const files = requireContext(routePath, true, /\.js$/);

app.use(cors());
app.use(parser());
app.use(json());

app.use(errMid);

router.use(auth);

files.keys().forEach(key => {
    let value = files(key).default || files(key);
    router.use(_api, value.routes());
})

app.use(router.routes())
    .use(router.allowedMethods());

app.listen(4567);

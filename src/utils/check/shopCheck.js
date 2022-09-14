const Check = require("./check");

class ShopCheck extends Check {

    errMsg= ["名称不能为空！", "地址不能为空！", "图片不能为空！"];

    check() {
        super.emptyWithMsg(this.errMsg);
        // JSON 字符串校验
        super.jsonCheck("图片格式错误，需要传入JSON字符串！", 2)
    }
}

module.exports = ShopCheck;

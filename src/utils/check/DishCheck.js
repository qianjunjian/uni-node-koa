const Check = require("./check");

class DishCheck extends Check {

    errMsg= ["菜品种类cid缺失！", "菜品种类缺失！", "菜品图片缺失！", "菜品名称缺失！", "菜品单价缺失！", "菜品单位缺失！", "菜品数量缺失！"];

    check() {
        super.emptyWithMsg(this.errMsg);
        // JSON 字符串校验
        super.jsonCheck("图片格式错误，需要传入JSON字符串！", 2)
    }
}

module.exports = DishCheck;

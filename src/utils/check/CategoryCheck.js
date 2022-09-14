const Check = require("./check");

class CategoryCheck extends Check {

    check() {
        super.singleEmpty("菜品类别不能为空！", 0);
    }
}

module.exports = CategoryCheck;

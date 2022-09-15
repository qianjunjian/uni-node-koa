const Check = require("./check");

class UnitCheck extends Check {

    check() {
        super.singleEmpty("单位不能为空！", 0);
    }
}

module.exports = UnitCheck;

const Check = require("./check");

class UserCheck extends Check {
    check() {
        super.empty();
        super.phone();
        super.password();
    }
}

module.exports = UserCheck;

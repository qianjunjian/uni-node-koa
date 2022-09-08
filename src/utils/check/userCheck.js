const Check = require("./check");

class UserCheck extends Check {
    check() {
        super.empty();
        super.phone(0);
        super.password(1);
    }
}

module.exports = UserCheck;

const SystemError = require("../../modal/SystemError");

class Check {
    constructor(ctx, ...obj) {
        this.ctx = ctx;
        this.obj = obj;
    }

    empty() {
        if (this.obj && this.obj.length > 0) {
            this.obj.forEach(src => {
                if (src === null || src === undefined || src.length === 0 || src === " ") {
                    throw new SystemError("参数不能为空！", 400);
                }
            })
        }
    }

    phone(num) {
        let phoneReg = /^1[3456789]\d{9}/;
        if (!phoneReg.test(this.obj[num])) {
            throw new SystemError("手机号格式错误！", 400);
        }
    }

    password(num) {
        let passwordReg = /^[a-zA-Z0-9_-]{4,16}$/;
        if (!passwordReg.test(this.obj[num])) {
            throw new SystemError("密码格式错误！", 400);
        }
    }
}

module.exports = Check;
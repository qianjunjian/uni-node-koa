const SystemError = require("../../modal/SystemError");

class Check {
    constructor(ctx, ...obj) {
        this.ctx = ctx;
        this.obj = obj;
    }

    phone(num) {
        let phoneReg = /^1[3456789]\d{9}/;
        if (!phoneReg.test(this.obj[num])) {
            throw new SystemError("手机号格式错误！", 400);
        }
    }

    password(num) {
        let passwordReg = /^[a-zA-Z0-9]{4,16}$/;
        if (!passwordReg.test(this.obj[num])) {
            throw new SystemError("密码格式错误！", 400);
        }
    }

    empty() {
        if (this.obj && this.obj.length > 0) {
            this.obj.forEach((src, index) => {
                this.singleEmpty("参数不能为空", index);
            })
        }
    }

    emptyWithMsg(msg = []) {
        if (this.obj && this.obj.length > 0) {
            this.obj.forEach((src, index) => {
                this.singleEmpty(msg[index], index);
            })
        }
    }

    singleEmpty(msg, num) {
        const src = this.obj[num];
        if (src === null 
            || src === undefined
            || src.length === 0 
            || src.split(" ").join("").length === 0
        ) {
            throw new SystemError(msg, 400);
        }
    }

    jsonCheck(msg, num) {
        try {
            const _data = this.obj[num];
            const toObj = JSON.parse(_data);
            if (!toObj || typeof toObj !== 'object') { 
                throw new SystemError(msg, 400);
            }
        } catch {
            throw new SystemError(msg, 400);
        }
    }
}

module.exports = Check;
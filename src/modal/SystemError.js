class SystemError extends Error {
    constructor(errmsg, errcode) {
        super();
        this.errmsg = errmsg;
        this.errcode = errcode;
    }
}
module.exports = SystemError;
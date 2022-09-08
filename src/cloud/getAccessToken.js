const qs = require("qs");
const axios = require("axios");
const { appid, secret, tokenUrl } = require("../../config/cloud");
const SystemError = require("../modal/SystemError");

const params = qs.stringify({
    grant_type: "client_credential",
    appid,
    secret
})

const url = tokenUrl + params;

const getAccessToken = async () => {
    try {
        const res = await axios.get(url);
        console.log(res)
        if (res.status === 200 && !res.data.errcode) {
            return res.data.access_token
        } else {
            throw "获取token失败！"
        }
    } catch (e) {
        throw new SystemError(e, 400);
    }
}

module.exports = getAccessToken;

const getAccessToken = require("./getAccessToken");
const {
    database_record_add,
    database_record_delete,
    database_record_update,
    database_record_query, 
    env 
} = require("../../config/cloud");
const SystemError = require("../modal/SystemError");
const axios = require("axios");

const TYPELIST = {
    add: database_record_add,
    delete: database_record_delete,
    query: database_record_query,
    update: database_record_update
}

const $post = async (type, query) => {
    try {
        const accessToken = await getAccessToken();
        const res = await axios.post(TYPELIST[type] + accessToken, {
            env,
            query
        })
        if (res.data.errcode == 0) {
            return res.data;
        }
        throw "请求出错！";
    } catch(e) {
        throw new SystemError(e, 500)
    }
}

module.exports = $post;

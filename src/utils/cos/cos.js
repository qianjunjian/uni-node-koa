const COS = require('cos-nodejs-sdk-v5');
const multer  = require('@koa/multer');
const fs = require("fs-extra");

const cos = new COS({
    SecretId: 'AKIDzoPlriKgpkPpzvb2EBsKYXHm10jCQO9g',
    SecretKey: 'LBn9F5g05uVqxpRntkLjurZ1GWXJp68u'
});

let fileTempPath = 'upload/images';

const uploadFile = (fileName, filePath) => {
    return new Promise((resolve, reject) => {
        cos.uploadFile({
            Bucket: 'business-diancan-1255751006', /* 填入您自己的存储桶，必须字段 */
            Region: 'ap-nanjing',  /* 存储桶所在地域，例如ap-beijing，必须字段 */
            Key: "diancan-images/" + fileName, /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
            FilePath: filePath, /* 必须 */
            SliceSize: 1024 * 1024 * 5 /* 触发分块上传的阈值，超过5MB使用分块上传，非必须 */
        }).then(res => {
            resolve(res.Location);
        }).catch(err => {
            reject(err)
        })
    })
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        fs.ensureDirSync(fileTempPath)
        cb(null, fileTempPath)
    },
    filename: function (req, file, cb) {
        const fileNameList = file.originalname.split(".")
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + "." + fileNameList[fileNameList.length - 1])
    }
})

const upload = multer({ storage: storage })

module.exports = {
    upload,
    uploadFile
}

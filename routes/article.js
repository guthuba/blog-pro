var express = require('express');
var router = express.Router();

// //添加博客接口
// router.post('/add', (req, res, next) => {
//     console.log(req.body);
// })
// 将用户模板导入
let Article = require('../models/article')
router.post('/add', (req, res, next) => {
    console.log(req.body);
    let date = new Date()
    console.log(date);
    //向数据库添加用户信息
    let articleInfo = {
        title: req.body.title,
        content: req.body.content,
        datetime:date,
    }
    let articleI = new Article(articleInfo)
    articleI.save((err, result) => {
        if (!err) {
            res.send(result)
        }
    })
})
module.exports = router;
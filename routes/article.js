var express = require('express');
var router = express.Router();

// 将用户模板导入
let Article = require('../models/article')
// 上传文件工具multiparty导入
var Multiparty = require('multiparty');
// 导入文件
let fs = require('fs')
// 添加博客接口
router.post('/add', (req, res, next) => {
    // console.log(req.body);
    // 首先来获取夏文章id，以此判断是新增还是编辑
    let _id = req.body.dId || ''
    // console.log(nId);
    if(!_id){//新增
        let date = new Date()
        console.log(date);
        let articleInfo = {
            title: req.body.title,
            content: req.body.content,
            datetime:date,
        }
        // 页面表单数据，放入模型
        let articleI = new Article(articleInfo)
        // 保存
        articleI.save((err, result) => {
            if (!err) {
                // res.send(result)
                res.redirect('/xie')
            }
        })
    }else{//编辑
        let page = req.body.page
        //_id
        //查找一条数据并修改内容
        // 新数据获取
        let date = new Date()
        let articleData = {
            title: req.body.title,
            content: req.body.content,
            datetime:date,
        }
        Article.findByIdAndUpdate(_id,articleData,{new:true},(err,result)=>{
            if(!err){
                res.redirect(`/?page=${page}`)
            }
        })
    }
    
    
})

//新增上传图片的路由
router.post('/upload',(req,res,next)=>{
    //图片文件上传的操作
    // console.log(req.body);
    // 实例化multiparty的form
    let form = new Multiparty.Form();
    form.parse(req,(err,fields,files)=>{
        if(err){
            console.log(err);
        }
        // console.log(fields,"第一个");
        // console.log(files.upload[0]);
        let file = files.upload[0]
        /**
         *  将读取到的文件信息，及文件上传到本项目下也就是服务器
         **/ 
        // 读取文件流
        let rStream = fs.createReadStream(file.path)
        // 拼接路径
        let filePath ='/uploads/' + file.originalFilename
        // 写入文件流
        let wStrema = fs.createWriteStream('./public' + filePath)
        // 触发读写管道，实现上传
        rStream.pipe(wStrema)
        // 将文件返回给ckeditor这个插件
        wStrema.on('close',()=>{
            res.send({uploaded: 1,url: filePath})//将服务器端图片地址拿给文本框，使得文章能正确加载插图
        })
    })
})

//文章删除接口
router.get('/delete',(req,res,next)=>{
    //从接口接收传输的id和页码page
    let id = req.query._id
    let page = req.query.page
    console.log(id,page);
    // 从数据库删除一条
    Article.deleteOne({_id:id},err=>{
        if(!err){
            // res.send('删除成功')
            // 返回删除前那个页面
            res.redirect(`/?page=${page}`)
        }
    })
})

module.exports = router;
var express = require('express');
var router = express.Router();

// 文章模板导入
let Article = require('../models/article')
/* GET home page. */
router.get('/',async function(req,res,next){
  let data = await Article.find()
  console.log(data);
  let userName = req.session.userName || ''
  res.render('index',{userName,data});
})

//首页路由配置
router.get('/', function(req, res, next) {
  let userName = req.session.userName || ''
  res.render('index', { title: 'Express' });
});
//登录路由配置
router.get('/login',function(req,res){
  let userName = req.session.userName || ''
  res.render('login',{userName})
})
//注册路由配置
router.get('/zhuce',function(req,res){
  let userName = req.session.userName || ''
  res.render('zhuce',{userName})
})
//详情页路由配置
router.get('/details',function(req,res){
  let userName = req.session.userName || ''
  res.render('details',{userName})
})
//写文章页路由配置
router.get('/xie',function(req,res){
  let userName = req.session.userName || ''
  res.render('xie',{userName})
})
//头部公共页路由配置
router.get('/nav',function(req,res){
  res.render('nav',{})
})
module.exports = router;

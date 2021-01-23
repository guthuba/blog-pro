var express = require('express');
var router = express.Router();

/* GET home page. */
//首页路由配置
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
//登录路由配置
router.get('/login',function(req,res){
  res.render('login',{})
})
//注册路由配置
router.get('/zhuce',function(req,res){
  res.render('zhuce',{})
})
//详情页路由配置
router.get('/details',function(req,res){
  res.render('details',{})
})
//写文章页路由配置
router.get('/xie',function(req,res){
  res.render('xie',{})
})
//头部公共页路由配置
router.get('/nav',function(req,res){
  res.render('nav',{})
})
module.exports = router;

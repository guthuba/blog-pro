var express = require('express');
var router = express.Router();
let Joi = require('joi');
// 将用户模板导入
let User = require('../models/user')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
//实现用户信息提交,注册事项
// Response响应
// Request请求
router.post('/addUser', async (req, res, next)=>{
  // 通过req.body获取信息
  console.log(req.body);
  // res.send('点击注册了')

  let userInfo = {
    userName:req.body.userName,
    password:req.body.password,
    passwordC:req.body.passwordC,
  }
//用户密码与确认密码是否一致的验证
if(userInfo.password !== userInfo.passwordC){
  // console.log('密码不一致');
  let error ={
    status:0,//错误编码
    stack:''//错误代码
  }
  res.render('error',{error,message:'密码不一致'})
}


/**
 * 处理验证的最佳时期
 * Joi验证
 */

// 定义规则
// const Schema = Joi.object({
//   userName:Joi.string().min(2).max(12).required().error(new Error('用户名不符合验证规则')),
//   password:Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('密码格式不符合要求')),
//   passwordC:Joi.ref('password').error(new Error('两次密码不一致')),

// }).with('password','passwordC')



// try {
//   const value = await schema.validateAsync({userInfo});
// }
// catch (err) {
//   console.log(err.message);
// }

// 相应结果
// res.render('error_alert',{message:err.message})




// 页面表单数据，放入模型
  let userI = new User(userInfo)
// 保存
  userI.save((err,result)=>{
    if(!err){
      res.send(result)
    }
  })
})
//登录————————查询
router.post('/login',(req,res,next)=>{
  //从表单获取数据
  let userinfo = {
    userName:req.body.userName,
    password:req.body.password,
  }
  console.log(userinfo);
  // 验证
  // 查询
  User.findOne(userinfo,function(err,result){
    // 错误处理
    if(err){
      return console.log(err);
    }
    if(result == null){
      console.log('登录失败');
      res.redirect('/zhuce')
    }else{
      // 将用户信息存储
      req.session.userName = userinfo.userName
      console.log('登录成功');
      // 路由重定向
      res.redirect('/')
    }
  })
  // 查询到——登录成功——跳转到首页
  // 查询不到，重定向到注册页去测
})

module.exports = router;

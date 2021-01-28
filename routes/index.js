var express = require('express');
var router = express.Router();
// let moment = require('moment')
// 文章模板导入
let Article = require('../models/article')

/* GET home page. */
router.get('/', async function (req, res, next) {
  let cPage = req.query.page || 1
  console.log(cPage);
  // let data = await Article.find()
  // console.log(data);
  let userName = req.session.userName || ''

  let data = {
    blogList: [],//文章列表
    currPage: cPage,//当前页数
    pagesTotle: '',//总页数
  }
  // 设定每页渲染的条数
  let pageSize = 2
  //确定每页显示的数据
  data.blogList = await Article.find()
    .limit(pageSize)//限定展示出来的条数
    .sort({ _id: 'desc' })//倒叙
    .skip((data.currPage - 1) * pageSize)//限定从第几条开始截取
  // 总数据
  let blogAll = await Article.find()
  //总页码
  data.pagesTotle = Math.ceil(blogAll.length / pageSize)
  console.log(data.pagesTotle);
  //将所有的时间戳转换成时间
  // data.blogList.map(item => {
  //   let a = moment(item.id).format('MMMM Do YYYY');
  //   item['time'] = a
  // })


  res.render('index', { userName, data });
})

//首页路由配置
router.get('/', function (req, res, next) {
  let userName = req.session.userName || ''
  res.render('index', { userName });
});
//登录路由配置
router.get('/login', function (req, res) {
  let userName = req.session.userName || ''
  res.render('login', { userName })
})
//注册路由配置
router.get('/zhuce', function (req, res) {
  let userName = req.session.userName || ''
  res.render('zhuce', { userName })
})
//详情页路由配置
router.get('/details', async function (req, res) {
  let userName = req.session.userName || ''
  let _id = req.query._id || ''
  if (_id) {
    let page = req.query.page
    console.log(_id);
    console.log(page);

    //文章数据查询渲染
    let data = await Article.findOne({ _id:_id})
    data.page = page
    //时间处理
    res.render('details',{userName,data})
  } else {
    let data = {
      title:'',
      content:'',
    }
    res.render('details', { userName,data })
  }
})
//写文章页路由配置
router.get('/xie', async (req, res,next) => {
  let userName = req.session.userName || ''
  let _id = req.query._id || ''
  if (_id) {
    let page = req.query.page
    console.log(_id);
    console.log(page);

    //文章数据查询渲染
    let data = await Article.findOne({ _id:_id})
    data.page = page
    //时间处理
    res.render('xie',{userName,data})
  } else {
    let data = {
      title:'',
      content:'',
    }
    res.render('xie', { userName,data })
  }

})
//头部公共页路由配置
router.get('/nav', function (req, res) {
  res.render('nav', {})
})
module.exports = router;

var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var bodyParser = require('body-parser')

mongoose.connect('mongodb://localhost:27017/cjyiz', { useNewUrlParser: true })
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

var UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  status: String
})
const Users = mongoose.model('login', UserSchema)

router.get('/register', (req, res) => {
  Users.find({ username: '张三' }, (err, docs) => {
    console.log(docs)
    res.send(docs)
  })
})

// 用户注册，向数据库中添加用户数据
router.post('/register', function(req, res) {
  // 按道理使用了body-parser后，响应应该是req.body.name?但是为什么不对呢？？
  console.log(req.body.username)
  const newUser = new Users({
    username: req.body.username,
    password: req.body.password
    // status: req.body.status
  })
  const username = req.body.username
  Users.find({ username: username }, (err, docs) => {
    if (docs.length > 0) {
      res.send({ isSuccess: false, message: '用户名已存在' })
    } else {
      newUser.save(err => {
        const datas = err
          ? { isSuccess: false }
          : { isSuccess: true, message: '注册成功' }
        res.send(datas)
      })
    }
  })
})

// 用户登录,查询数据库，判断用户名和密码是否匹配
router.post('/login', function(req, res) {
  // console.log(req.body.username)
  const username = req.body.username
  // console.log(username)
  const password = req.body.password
  // console.log(Users)
  Users.find({ username: username }, function(err, users) {
    // console.log('用户')
    // console.log(users);
    if (users.length == 0) {
      res.send({ isSuccess: false, message: '该用户不存在' })
    } else if (users[0].password === password) {
      res.send({ isSuccess: true, message: '登录成功' })
    } else if (users[0].password !== password) {
      res.send({ isSuccess: false, message: '密码不正确，请重新输入' })
    }
  })
})

// 修改密码
router.post('/change', function(req, res) {
  const username = req.body.name
  const OldPass = req.body.OldPass
  const NewPass = req.body.NewPass
  Users.find({ username: username }, function(err, user) {
    if (user.length === 0) {
      res.send({ isSuccess: false, message: '该用户名不存在' })
    } else {
      const data = user[0]
      if (data.password === OldPass) {
        data.password = NewPass
        data.save(err => {
          const datas = err
            ? { isSuccess: false, message: '密码修改失败' }
            : { isSuccess: true, message: '密码修改成功' }
          res.send(datas)
        })
      } else {
        res.send({ isSuccess: false, message: '您输入的密码不正确' })
      }
    }
  })
})

// DELETES A USER FROM THE DATABASE
router.delete('/:id', function(req, res) {
  Users.findByIdAndRemove(req.params.id, function(err, user) {
    if (err)
      return res.status(500).send('There was a problem deleting the user.')
    res.status(200).send('User: ' + user.username + ' was deleted.')
  })
})

// UPDATES A SINGLE USER IN THE DATABASE
router.put('/:id', function(req, res) {
  Users.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(
    err,
    user
  ) {
    if (err)
      return res.status(500).send('There was a problem updating the user.')
    res.status(200).send(user)
  })
})

module.exports = router

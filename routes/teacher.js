const express = require('express')
const router = express.Router()
const Teacher = require('../models').Teacher
const Subject = require('../models').Subject

router.get('/', (req, res) => {
  Teacher.findAll({
    include: [{model: Subject}]
  })
    .then((teachers) => {
      res.render('teachers', { data: teachers })
      // res.send(teachers)
    })
    .catch(err => {
      res.send(err)
    })
})

router.get('/add', (req, res) => {
  res.render('teacher_add',{err:null})
})

router.post('/add', (req, res) => {

  let teacher = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email
  }

  Teacher.create(teacher)
    .then(newTeacher => {
      res.redirect(`/`)
      // res.send(newTeacher)
    })
    .catch(err => {
      // console.log(err.errors[0].message,'ini eror')
      if(err.errors[0].path == 'email') {
        // console.log('masuk')
        err = 'Validation error : ' + err.errors[0].message
      }
      res.render('teacher_add',{err})
    })

})

router.get('/edit/:id', (req, res) => {

  Teacher.findOne({
    where:
      { id: req.params.id }
  })

    .then(function (teacher) {
      res.render('teacher_edit', { data: teacher })
    })

    .catch(function (err) {
      res.send(err)
    })
    
})

router.post('/edit/:id', (req, res) => {
  Teacher.findOne({
    where : {
      email: req.body.email
    }
  })
  .then((data) => {
    // console.log(data,'-----------------------')
    console.log(req.params.id)
    if(data.dataValues.id != req.params.id && data.dataValues.email == req.body.email) {
      res.send('Email sudah digunakan')
    }
    // console.log(data)
    Teacher.update(req.body, { where: { id: req.params.id } })
      .then(() => {
        res.redirect('/teachers')
      })
      .catch(err => {
        res.send(err)
      })
  })

})

router.get('/delete/:id', (req, res) => {

  Teacher.destroy({ where: { id: req.params.id } })
    .then(() => {
      res.redirect('/teachers')
    })
    .catch(err => {
      res.send(err)
    })

})

module.exports = router
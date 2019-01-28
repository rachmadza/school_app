const express = require('express')
const router = express.Router()
const Subject = require('../models').Subject

router.get('/', (req, res) => {
  Subject.findAll({
  })
    .then((subjects) => {
      // res.render('subjects', { data: subjects })
      // res.send(subjects)
      
      let dataTeacher = subjects.map(subject => {
        return new Promise ((resolve,reject) => {
          subject.getTeachers()
          .then(teacher => {
              subject.dataValues.Teacher = teacher
              resolve(subject)
          })
          .catch(err => {
            reject(err)
          })
        })
      })

      return Promise.all(dataTeacher)
    })
    .then(dataTeacher => {
      res.render('subjects', { data: dataTeacher })

    })
    .catch(err => {
      res.send(err)
    })
})

router.get('/add', (req, res) => {
  res.render('subject_add')
})

router.post('/add', (req, res) => {

  let subject = {
    subject_name: req.body.subject_name,
  }

  Subject.create(subject)
    .then(newSubject => {
      res.redirect(`/`)
    })
    .catch(err => {
      res.send(err)
    })

})

router.get('/edit/:id', (req, res) => {

  Subject.findOne({
    where:
      { id: req.params.id }
  })

    .then(function (subject) {
      res.render('subject_edit', { data: subject })
    })

    .catch(function (err) {
      res.send(err)
    })
})

router.post('/edit/:id', (req, res) => {

  Subject.update(req.body, { where: { id: req.params.id } })
    .then(() => {
      res.redirect('/subjects')
    })
    .catch(err => {
      res.send(err)
    })
})

router.get('/delete/:id', (req, res) => {
  
  Subject.destroy({ where: { id: req.params.id } })
    .then(() => {
      res.redirect('/subjects')
    })
    .catch(err => {
      res.send(err)
    })
})

module.exports = router
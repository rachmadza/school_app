const express = require('express')
const router = express.Router()
const Student = require('../models').Student
const Subject = require('../models').Subject
const StudentSubject = require('../models').StudentSubject

router.get('/', (req, res) => {
  Student.findAll({
  })
    .then((students) => {
      res.render('students', { data: students })
    })
    .catch(err => {
      res.send(err)
    })
})

router.get('/add', (req, res) => {
  res.render('student_add')
})

router.post('/add', (req, res) => {

  let student = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email
  }

  Student.create(student)
    .then(newStudent => {
      res.redirect(`/`)
    })
    .catch(err => {
      res.send(err)
    })

})

router.get('/edit/:id', (req, res) => {

  Student.findOne({
    where:
      { id: req.params.id }
  })

    .then((student) => {
      res.render('student_edit', { data: student })
    })

    .catch((err) => {
      res.send(err)
    })
})

router.post('/edit/:id', (req, res) => {

  Student.update(req.body, { where: { id: req.params.id } })
    .then(() => {
      res.redirect('/students')
    })
    .catch(err => {
      res.send(err)
    })

})

router.get('/delete/:id', (req, res) => {

  Student.destroy({ where: { id: req.params.id } })
    .then(() => {
      res.redirect('/students')
    })
    .catch(err => {
      res.send(err)
    })

})

router.get('/:id/add-subject', (req, res) => {
  Student.findByPk(req.params.id)
    .then((student) => {
      Subject.findAll()
        .then(subjects => {
          console.log(student, 'ini student')
          console.log(subjects, 'ini subject')
          subjects.forEach(subject => {

          })
          res.render('student_subject', { student, subjects })
        })
    })
})

router.post('/:id/add-subject', (req, res) => {
  StudentSubject.
    update({
      SubjectId: req.body.subjectid
    },
      {
        where: { StudentId: req.params.id }
      })
    .then((data) => {
      console.log(data, 'sobri')
      res.redirect('/students')
    })
    .catch(err => {
      res.send(err)
    })
})

module.exports = router
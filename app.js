const express = require('express')
const app = express()
const port = 3000

const Student = require('./routes/student')
const Teacher = require('./routes/teacher')
const Subject = require('./routes/subject')

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

app.use('/students', Student)
app.use('/teachers', Teacher)
app.use('/subjects', Subject)

app.get('/', (req,res) => {
  res.render('home')
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

const checkAgeMiddleware = (req, res, next) => {
  if (!req.query.age) {
    return res.redirect('/')
  }

  return next()
}

nunjucks.configure('views', {
  autoscape: true,
  express: app,
  watch: true
})

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'njk')

app.get('/', (req, res) => {
  return res.render('new')
})

app.get('/minor', checkAgeMiddleware, (req, res) => {
  return res.render('minor', req.query)
})

app.get('/major', checkAgeMiddleware, (req, res) => {
  return res.render('major', req.query)
})

app.post('/check', (req, res) => {
  return req.body.age < 18
    ? res.redirect(`/minor?age=${req.body.age}`)
    : res.redirect(`/major?age=${req.body.age}`)
})

app.listen(3000)

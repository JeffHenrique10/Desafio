const express = require('express')
const nunjucks = require('nunjucks')

const app = express()
nunjucks.configure('view', {
  autoscape: true,
  express: app,
  watch: true
})
app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'njk')
const logMiddleware = (req, res, next) => {
  console.log(
    `Host: ${req.headers.host} | URL: ${req.url} METHOD: ${req.method}`
  )
  const { idade } = req.query
  if (!idade) {
    res.redirect('/')
  } else return next()
}

app.get('/', (req, res) => res.render('inicio'))
app.get('/maior', logMiddleware, (req, res) => {
  const { idade, nome } = req.query
  res.render('maior', { idade, nome })
})
app.get('/menor', logMiddleware, (req, res) => {
  const { idade, nome } = req.query
  res.render('menor', { idade, nome })
})
app.post('/check', (req, res) => {
  const { idade, nome } = req.body
  if (idade >= 18) {
    res.redirect(`/maior?nome=${nome}&idade=${idade}`)
  } else {
    res.redirect(`/menor?nome=${nome}&idade=${idade}`)
  }
})

app.listen(3000)

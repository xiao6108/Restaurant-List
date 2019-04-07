// app.js
// require packages used in the project
const express = require('express')
const app = express()
const port = 3000
const restaurantList = require('./restaurant.json')

// require handlebars in the project
const exphbs = require('express-handlebars')


app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 設定 Express 路由以提供靜態檔案
app.use(express.static('public'))

// routes setting
app.get('/', (req, res) => {
  res.render('index', { store: restaurantList.results })
})

// params
app.get('/restaurants/:store_id', (req, res) => {
  const store = restaurantList.results.filter(store =>
    store.id == req.params.store_id
  )
  res.render('show', { store: store[0] })
})

// query.keyword
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const store = restaurantList.results.filter(store => {
    return store.name.toLowerCase().includes(keyword.toLowerCase()) ||
      store.name_en.toLowerCase().includes(keyword.toLowerCase()) ||
      store.category.includes(keyword)
  })
  res.render('index', { store: store, keyword: keyword })
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})


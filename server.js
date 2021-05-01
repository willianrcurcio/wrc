const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()

var port = process.env.PORT || 5000;  // Declaring to ports to support heroku
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
})

const db = mongoose.connection
db.once('open', () => console.log('We are connected to database'))
//db.on('error', (error) => console.error(error))
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.use(express.static('views/articles'))

app.get('/', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' })
  res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter)

//app.listen(5000)
app.listen(port, function(error){ // Listening to the server on the avaliable port either 5000 or avaliable one. Also show error if their is any.
  console.log('Server Started on port: ' + port);// Server Running Console Message
});
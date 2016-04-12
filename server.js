var express = require('express')
var path = require('path')
var compression = require('compression')
var fs = require('fs-extra')

try {
  fs.copySync('./assets', './public/assets')
  console.log("assets copy success!")
} catch (err) {
  console.error(err)
}

var app = express()
app.use(compression())

// serve our static stuff like index.css
app.use(express.static(path.join(__dirname, 'public')))

// send all requests to index.html so browserHistory in React Router works
app.get('*', function (req, res) {
  // and drop 'public' in the middle of here
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

var PORT = process.env.PORT || 81
app.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT)
})

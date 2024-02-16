let express = require('express');
let app = express();
let path = require('path');
const PORT = 3000;
let fs = require("fs");


// set the view engine to ejs
app.set('view engine', 'ejs');

// set the public file folder to public
app.use(express.static(path.join(__dirname, 'public')));

app.get('/profile', function(req, res) {
  let id = req.query.id;
    // use res.render to load up an ejs view file
  res.render('profile', {id});
  console.log(`User enterd id: ${id}`);
});

app.listen(PORT);
console.log(`Server is listening on port ${PORT}`);

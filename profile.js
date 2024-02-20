let express = require('express');
let app = express();
let path = require('path');
const PORT = 3000;
let fs = require("fs");


// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/profile', function(req, res) {
  // get ID entered by user
  let id = req.query.id;

  // get right title & short description by ID
  let title_file = fs.readFileSync(`private/${id}/title.txt`,'utf-8');
  let title = title_file.split("\n");
  
  // use res.render to load up an ejs view file with the right parameters
  res.render('profile', {id,title});
});

app.listen(PORT);
console.log(`Server is listening on port ${PORT}`);

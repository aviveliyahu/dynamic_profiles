let express = require('express');
let app = express();
let path = require('path');
let fs = require("fs");


const PORT = 3000;
const BIO_FILE_NAME = "bio.txt";
const FRIENDS_PATH = path.join(__dirname, "private/");

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/profile', function(req, res) { 
  // get ID entered by user
  let id = req.query.id;

  // get right title & short description by ID
  let title_file = fs.readFileSync(`private/${id}/title.txt`,'utf-8');
  let title_lines = title_file.split("\n");
 // get relevant bio file to the id
 let bio = fs.readFileSync(`private/${id}/${BIO_FILE_NAME}`, { encoding: 'utf-8', flag: 'r' });
 let bio_lines = bio.split("\n"); 
 // get friends list (except the one that the user view his profile)
 let friends = fs.readdirSync(FRIENDS_PATH,{ encoding: 'utf-8', flag: 'r' });
 let filtered_friends = friends.filter(function (friend) {
   if(friend!==id){
     return friend;
   };
 });
 // load the page with relevant filling to the id entered
 res.render('profile', {id,title_lines,bio_lines,filtered_friends});
});

app.listen(PORT);
console.log(`Server is listening on port ${PORT}`); 

//require dotenv
const dotenv = require('dotenv');
//envoke dotenv
dotenv.config();
//require express
const express = require('express');
//require path module to deal with file paths
const path = require('path');
//require pageInfo
const pageInfo = require('./pageInfo');
//require middleware
const middleware = require('./middleware');
//envoke express
const app = express();
//require mongoose
const mongoose = require('mongoose');

//Made and included favicon
const favicon = require('express-favicon');
app.use(favicon(__dirname + '/assets/img/gem.ico/favicon.ico'));

//need the mongoose code higher up, it is used to connect to db (works!)
mongoose.connect(process.env.DB_CONNECTION, { useUnifiedTopology: true,useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('DB Connected!!!');
});

//exclude .ejs from url
app.set('view engine','ejs'); 

app.use(express.urlencoded({ extended: true }));


//use app.get to render the .ejs
//required pageInfo to loop through values in the pageInfo module in the header paritial so that the correct title and css pages were linked
app.get('/:page', function(request, response){
  response.render(request.params.page,pageInfo[request.params.page]);
})

app.get('/', function(request, response){
  response.render('index',pageInfo.index);
})

//evoking middleware module to log name:email in log.txt when form is submitted
app.use(middleware)

//assignment3
app.post('/submit', function(req,res){ 
  const name = req.body.name; 
  const email =req.body.email; 

  const data = { 
      "name": name, 
      "email": email
  } 

db.collection('details').insertOne(data, (err, collection) => { 
      if (err) throw err; 
      console.log("Record inserted Successfully"); 
            
  }); 
        
  res.render('submit', {data: req.body})
}) 


app.get('/',function(req,res){ 
  res.set({ 
    'Access-control-Allow-Origin': '*'
    }); 
  return res.redirect('index'); 
  })


//use app.post to redirect users to /submit upon submitting form in footer
// app.post('/submit', function(request,response) {
//   response.render('submit', {data: request.body})
//   console.log('updated')
// });

//set assets as a static folder so it renders all the files within it
app.use(express.static(path.join(__dirname, 'assets')));

//create a variable with a PORT number. (process.env.port looks at the environment variables for PORT or PORT 3000)
const PORT = process.env.PORT || 4000;

//listen on port 3000, add a console.log callback to verify port is running
app.listen(PORT, () => console.log(`Server started on port ${PORT}`) );


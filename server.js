const express = require("express")
const path = require('path') //path is necessary to have the files paths joined corectly  
const app = express() //creates an server 

app.use(express.urlencoded({extended: true}))

app.set('view engine', 'ejs') //passing in the argument to use the engine 
//downloaded the ejs library 


  //middleware runs top to bottom so for every instance that we run console.log('here'),
  //it'll print out to the console
  // if we want to reference the function logger within the app.get then we 
  //can just put logger between "/", (req,res) so it would look like 
  //app.get("/",logger (req, res)
  //you can put in >1 function that's non exculsive meaning you can get 
  //app.get("/",logger, logger (req,res)) and that would run fine 
// app.use(logger)


app.get("/", (req, res) => {

  // console.log('Here')
  //res.download("file") causes the user to download a file 
  res.render('index')
  //redirects to the filepath called index.ejs in views/users 

}) 


//within the server we need to declare the references of the files that we want to open to get them to work



// app.get('/consent', (req, res) => {

//   const filePath = path.join(__dirname, 'views', 'users', 'consent.html');
//   res.sendFile(filePath);
  
// });

//we should just make a main function and put the rests as a subset 

function serveHTMLFile(filename) {
  return (req, res) => {
    const filePath = path.join(__dirname, 'views', 'users', `${filename}.html`);
    res.sendFile(filePath);
  };
}

function serveJSFile(filename) {
  return (req, res) => {
    const filePath = path.join(__dirname, 'views', 'users', `${filename}.js`);
    res.set('Content-Type', 'text/javascript');
    res.sendFile(filePath);
  };
}



// app.get('instructions', referenceHTMLFile('instructions'));

app.get('/instructions', serveHTMLFile('instructions')); 
app.get('/strategy', serveHTMLFile ('strategy'));
app.get('/consent', serveHTMLFile ('consent'));
app.get('/rankingtasks', serveHTMLFile ('rankingtasks'));
app.get('/demographic', serveHTMLFile ('demographic'));
app.get('/retrievedata', serveHTMLFile ('retrievedata'));
app.get('/debrief', serveHTMLFile ('debrief'));
app.get('/study', serveHTMLFile ('study'));
app.get('/study.js', serveJSFile('study'));
app.get('demographic.js', serveJSFile('demographic'));




//routes are defined so that all userRouter would use /users 
const userRouter = require('./routes/users')

app.use('/users', userRouter)

//logger is a middleware function that takes a req,response and next 
function logger(req, res, next) {
  console.log(req.originalUrl)
  next() 
  //we use next to prevent the function from being stuck

}

// app.use(express.static(path.join(__dirname, 'public')));


app.listen(8080)

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






// app.get('/consent', (req, res) => {

//   const filePath = path.join(__dirname, 'views', 'users', 'consent.html');
//   res.sendFile(filePath);
  
// });

//we should just make a main function and put the rests as a subset 


app.get('/instructions', (req, res) => {

  const filePath = path.join(__dirname, 'views', 'users', 'instructions.html');
  res.sendFile(filePath);
  
});



app.get('/strategy', (req, res) => {

  const filePath = path.join(__dirname, 'views', 'users', 'strategy.html');
  res.sendFile(filePath);
  
});

app.get('/consent', (req, res) => {

  const filePath = path.join(__dirname, 'views', 'users', 'consent.html');
  res.sendFile(filePath);
  //allows us to access html files otherwise we need to use ejs
});





app.get('/rankingtasks', (req, res) => {

  const filePath = path.join(__dirname, 'views', 'users', 'rankingtasks.html');
  res.sendFile(filePath);
  //allows us to access html files otherwise we need to use ejs
});


app.get('/demographic', (req, res) => {

  const filePath = path.join(__dirname, 'views', 'users', 'demographic.html');
  res.sendFile(filePath);

});

app.get('/retrievedata', (req, res) => {

  const filePath = path.join(__dirname, 'views', 'users', 'retrievedata.html');
  res.sendFile(filePath);

});


app.get('/debrief', (req, res) => {

  const filePath = path.join(__dirname, 'views', 'users', 'debrief.html');
  res.sendFile(filePath);

});





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

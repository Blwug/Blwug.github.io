const express = require("express")
const router = express.Router() //router is like an app but capable of nesting within parent route



//the code only works by enabling expres 
router.get('/', (req, res) => {
    console.log(req.participantid) 
    console.log(req.query.name) //req.query name accesses the name of the person
    res.send(req.body.participantid)
  })



// router.use(logger)
//for all user routers used, they will all run the logger function
  
router.get('/new', (req, res) => {
  //req.body.participantid
  res.render("users/new") //renders out the page
  })



router.post("/", (req,res) => {
//router.post is a callback function that logs the participant id and redirects them to 
//users/consent
      console.log(req.body.participantid)
      res.render("users/consent")


}




)
    //remember that the code functions from top to bottom


//router.route chains the route and it matches the routes 
router.route("/:id")
.get( (req, res) => {
    console.log(req.user)
    //we can acccess the user code because of specifying the parameter
    res.render("users/participant")

}).put((req, res) => {
    res.send(`updates user ${req.params.id}`)
    //updates the user with the id 
})


const users = []

//router.param is that anytime you see id you run the function
//param is a middleware that runs between the server and the resposne sent
router.param("id", (req,res,next,id) =>{
   //anytime we have an id we get the id and save it in request.users 

    req.user = users[id]
    next()

})



module.exports = router
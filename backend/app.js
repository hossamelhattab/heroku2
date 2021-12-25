const express = require("express");
const mongoose = require('mongoose');
const bodyparser = require("body-parser");
const config = require('config');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cors = require('cors');

//Models
const admin = require('./Models/Admin');
const User = require('./Models/User');
const bcrypt = require('bcrypt');

const Reservation = require("./Models/Reservation");
 
// Controller Imports
const adminController = require('./Controllers/AdminController');
const userController = require('./Controllers/UserController');


//App variables
const app = express();
const port = process.env.PORT || "8000";
app.use(bodyparser.urlencoded({extended : true}));
app.use(express.json());
app.use(cors());
// configurations

const MongoURI =  config.get('mongoURI');
const secret = config.get('sessionSecret');
const stripeSecretKey = config.get('stripe_secret');


// Mongo DB
mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() =>console.log("MongoDB is now connected") )
.catch(err => console.log(err));

const stripe = require('stripe')(stripeSecretKey);
// Session Initialization

// secret is used to validate the session think password store is the place we store the session,
//in this case as mentioned before its the mongoStore aka in mongo db 
// you can see that it takes the same mongoUri meaning its currently in the same
// DB but in a different collection named sessions

app.use(session({

  secret: secret,
  resave:false,
  saveUninitialized:true,
  cookie:{
      maxAge: 1000 * 60 * 60 
  },
  store: MongoStore.create({ mongoUrl:MongoURI })

}));


///middlewares

//Routes
//------------Admin
app.post('/searchFlights',AdminAuth, adminController.searchFlight);

app.post('/searchFlightsuser',AdminAuth, adminController.searchFlightuser);

app.get('/allFlights',AdminAuth , adminController.getAllFlights);

app.get('/getFlight/:getID',AdminAuth, adminController.getFlightById);

app.put('/updateFlight/:updateID', AdminAuth , adminController.updateFlightById);

app.post('/createFlight', AdminAuth ,adminController.newFlight);

app.delete('/deleteFlight/:deleteID', AdminAuth ,adminController.deleteFlightById);

app.get('/allreservedflights', AdminAuth , adminController.getAllreservedFlights);

app.delete('/deletereservedFlight/:deleteID', AdminAuth ,adminController.deletereservedflight);
//-------------

//------------User
app.put('/user/update/:id', userController.updateUserById);

app.get('/user/getInfo/:id', userController.getUserById);

app.get('/user/reservedSeats', userController.getAllReservedSeats);

app.get('/user/reservedFlight/:id', userController.getReservedFlightById);

app.post('/user/createReservedFlight', userController.createReservedFlight);

app.delete('/user/deleteReservedFlight/:id', userController.deleteReservedFlightById);

app.get('/user/getAllReservedFlights/:id', userController.getAllreservedFlights);

app.post('/user/register', userController.register);

app.post('/user/sendsummary/:id',userController.sendsummary);
//--------------

//for login we store ONLY and ONLY I SAY AGAIN the USERNAME or ID not the password , NEVER!!!


async function StripeCallAPI (req, res) {
  const customer = await stripe.customers.create({
  description: 'My First Test Customer',
  })

  const paymentIntent = await stripe.paymentIntents.create({
  customer: customer.id,
  currency: 'usd',
  amount: 2000,
  payment_method_types: ['card'],
  setup_future_usage: 'on_session',
})

res.send(customer);
}





app.post("/create-checkout-session-test", async (req, res) => {
  console.log(req.body);
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items:
          [
           { price_data: {
              currency: "usd",
              product_data: {
                name: "reservation number: "+req.body.reservationNumber,
                // description: "reservation ID: "+req.body.reservationId
              },
              unit_amount: req.body.price,
            },
            quantity: 1,
           }],
        success_url: `http://localhost:3000/confirmPayment/${req.body.reservationId}`,
        cancel_url: `http://localhost:3000/`
      })
      res.json({ url: session.url,session:session })
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e.message })
    }
  })



app.post("/create-checkout-session", async (req, res) => {
  console.log(req.body);
    try {
     
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items:
          [
           { price_data: {
              currency: "usd",
              product_data: {
                name: "reservation number: "+req.body.reservationNumber,
                // description: "reservation ID: "+req.body.reservationId
              },
              unit_amount: req.body.price,
            },
            quantity: 1,
           }],
        success_url: `http://localhost:3000/confirmPayment/${req.body.reservationId}`,
        cancel_url: `http://localhost:3000/cancelReservation/${req.body.reservationId}`
      })
      await Reservation.findByIdAndUpdate(req.body.reservationId,{paymentIntent:session.payment_intent},{new: true}).then(res=>{console.log(res)});
      res.json({ url: session.url,session:session })
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e.message })
    }
  })
  app.post("/refund-payment/:id", async (req,res)=>{
    await Reservation.findById(req.params.id)
    .then(data=>{

      stripe.refunds.create({
        payment_intent: data.paymentIntent,
      }).then(()=>{
        res.status(200).send({msg:'payment refunded'})})
        .catch((e)=>{
          console.log("error");
          res.send({error:e});
        })
      });
})

  app.post("/confirm-payment/:id", async (req,res)=>{
      await Reservation.findByIdAndUpdate(req.params.id,{payed:true})
      .then(data=>{res.status(200).send(data)})
      .catch(err=>{
        res.send({statusCode : err.status, message : err.message})
        console.log(err.status)
      })
  })




app.get('/admin/check',(req,res)=>{
    const admin = req.session.adminName;
    const id = req.session.adminId;
    res.send('your logged in as '+ admin +  ' with admin id : '+ id)

})

app.post('/admin/login',(req,res)=>{
  const user = req.body.username;
  const pass = req.body.password;

  admin.findOne({username:user},(err,data)=>{
      if(err)
          console.log(err);
      else{
          if(data){
            bcrypt.compare(pass, data.password)
            .then((result) => {
                if(result){
                    req.session.adminName = user;
                    req.session.adminId=data._id;
                    req.session.save(() => {});
                    res.session = req.session;
                    res.session.save(() => {});
                    res.send({statusCode:200,loginAdmin:true,admin:req.session.adminId});
                    console.log(res.session)
                }
                else{
                    res.send({statusCode:401,loginAdmin:false});
                }
            });
//              if(pass==data.password){
//                  req.session.adminName = user;
//                  req.session.adminId=data._id;
//                  res.send({statusCode:200,loginAdmin:true,admin:req.session.adminId});
//                }
          }
          else{
            res.send({statusCode:401,loginAdmin:false});
        }
          }
  });

});

app.post('/user/login',(req,res)=>{
    const Email = req.body.email;
    const pass = req.body.password;
    
    console.log(Email , pass);

    User.findOne({email:Email},(err,data)=>{
        if(err)
            console.log(err);
        else{
            if(data){
                if(pass==data.password){
                    req.session.userEmail = Email;
                    req.session.userID=data._id;
                    res.send({statusCode:200,login:true,user:req.session.userID});
                }else{
                  res.send({statusCode:401,login:false});
                }
            }
            else{
                    res.send({statusCode:401,login:false});
                }
            }
    });
  
  });





  app.get('/user/logout',(req,res)=>{
    if(req.session.Email)
        req.session.destroy();
    res.clearCookie('connect.sid');
  res.status(200).send({statusCode:200,message:'logout successful'})

})

//destory the session using this method also dont destory the cookie and 
//create a new one in the same route because as said before server sends the session from the previous req
//if you destroy it its now null and u cant instanciate a session anyway
app.post('/admin/logout',(req,res)=>{
    if(req.session.admin)
        req.session.destroy();
    res.clearCookie('connect.sid');
  res.send({statusCode:200,message:'logout successful'})

})

function AdminAuth(req,res,next){
//    console.log(req.session);
//     if(req.session.adminId){
//         next();
//     }else{
//         res.send({statusCode:403,succsess:false});
//     }
    next();
}



// Server is Listening
app.listen(port, () => {console.log(`Listening to requests on http://localhost:${port}`)})


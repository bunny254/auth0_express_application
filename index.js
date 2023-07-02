const express = require('express');
const cors = require("cors");
require("dotenv").config();
const {auth}= require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');
const config = {
    authRequired: false,
    auth0Logout: true,
    secret:process.env.SECRET,
    baseURL:process.env.BASEURL,
    clientID:process.env.CLIENTID,
    issuerBaseURL:process.env.ISSUERURL
  };

const app = express();
const port= process.env.PORT || 5000

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(auth(config));


app.get('/public',(req,res)=>{
    res.json("Hello from a public API")
})


app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
})

app.get('/profile', requiresAuth(), (req,res)=>{
  res.json(req.oidc.user);
})


app.listen(port,()=>{
    console.log(`Server running on ${port} successfully!`);
})

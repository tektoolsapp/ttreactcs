const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('config');
const generatePassword = require('password-generator');
//const con = require('./client/src/config')
//import con from "./client/src/config"
//const con = require('./client/src/config')

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../ttreact/client/build')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

const rp = require('request-promise-native');

app.post("/api/myob", function(req, res) {
   
    var queryString = Object.keys(req.body).map((key) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(req.body[key])
    }).join('&'); 
    
    const options = {
        uri: 'https://secure.myob.com/oauth2/v1/authorize?',
        method: 'POST',
        //json: true,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: queryString
    }

    console.log("OPTIONS: ", options)

    rp(options)
        .then(parsedBody => {
        res.send(parsedBody);
    })
    .catch(err => {
        res.send(err);
    });
  
});

app.get('/api/company', function(req, res) {
    
    // `req.get()` is case-insensitive.
    //const authorization = req.get('authorization');
    // Or you can use `req.headers`
    //req.headers.authorization;

    console.log("HEADERS:") 
    console.dir(req.headers)
  
    const myobAccessToken = req.headers.authorization
    const cfToken = req.headers.cftoken
    const apiKey = req.headers.apikey

    const options = {
        method: 'GET',
        uri: 'https://api.myob.com/accountright/8f9f3d03-4a60-421d-88e9-f1287205e4fe/Company',
        headers: {
            'Authorization' : myobAccessToken,
            'x-myobapi-cftoken' : cfToken,
            'x-myobapi-key' : apiKey,
            'x-myobapi-version' : 'v2'
        },
        json: true
    };
    
    rp(options)
        .then(parsedBody => {
        res.send(parsedBody);
    })
    .catch(err => {
        res.send(err);
    });

  });

  const db = config.get('mongoURI');

  mongoose.connect(
    db, { 
    useNewUrlParser: true, 
    useCreateIndex: true, 
    useFindAndModify: false, 
    useUnifiedTopology: true 
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

  const ContactsModel = require('./models/contacts');

  app.get('/api/contacts', async (req, res) => {
  
    console.log("SERVER GET CONTACTS")
    
    //const contacts = await ContactsModel.find({});

    const contacts = await ContactsModel.find({},
      {
        "_id": 0,
        "firstname": 1
      })
  
    try {
      res.send(contacts);
      console.log("CONTACTS", contacts);
    } catch (err) {
      res.status(500).send(err);
    }
  });

// app.post('/api/send', (req, res) => {
    
//     console.log(`Sending EMAIL`);

//     const emailData = [
//         {
//           "to" : "localseo@gmail.com",
//           "subject" : "HELLO LOCAL SEO",
//           "message" : "MESSAGE FOR LOCAL SEO"     
//         },
//         {
//           "to" : "allan.hyde@tektools.com.au",
//           "subject" : "HELLO TEKTOOLS",
//           "message" : "MESSAGE FOR TEKTOOLS"  
//         }
//     ];

//     for(var k in emailData) {
//         var o = emailData[k];
//         console.log("MY",o.to);

//         client.sendEmail({
//             "From": "test@www.formalize.com.au",
//             "To": o.to,
//             "Subject": o.subject,
//             "TextBody": o.message
//           }).then(res => {tek
//             console.log(res.To);
//             console.log(res.SubmittedAt);
//             console.log(res.Message);
//             console.log(res.MessageID);
//             console.log(res.ErrorCode);
    
//         })

//         console.log("SENT TO:", o.to);
        
//     }
// });

// Put all API endpoints under '/api'
app.get('/api/passwords', (req, res) => {
  
    console.log(`Sending PASSWORDS`);
    const count = 5;

  // Generate some passwords
  const passwords = Array.from(Array(count).keys()).map(i =>
    generatePassword(12, false)
  )

  // Return them as json
  res.json(passwords);

  console.log(`Sent ${count} passwords`);
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Password generator listening on ${port}`);
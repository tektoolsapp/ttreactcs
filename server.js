const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const generatePassword = require('password-generator');

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../ttreact/client/build')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

const rp = require('request-promise-native');

app.post("/api/myob", function(req, res) {
   
  const options = {
      uri: 'https://secure.myob.com/oauth2/v1/authorize',
      method: 'POST',
      json: true,
      body: req.body
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

/*
app.post("/api/myob", function(req, res) {
   
    //console.log('Post a MYOB: ' + JSON.stringify(req.body));

    console.log('Got body:', req.body);

    res.send({ express: req.body});

});
*/

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

app.get('/api/express_backend', (req, res) => {
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
    console.log(`Sending PASSWORDS`);
    const count = 5;

  // Generate some passwords
  //const passwords = Array.from(Array(count).keys()).map(i =>
    //generatePassword(12, false)
  //)

  // Return them as json
  //res.json(passwords);

  console.log(`Sent ${count} passwords`);

  });

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Password generator listening on ${port}`);
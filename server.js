const express = require('express');
const path = require('path');
var cors = require('cors');
const generatePassword = require('password-generator');

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../ttreact/client/build')));

// app.post('/api/myob', async (req, res) => {
    
//     //console.log('Post a User: ' + JSON.stringify(req.body));
    
//     //const people = new peopleModel(req.body);
    
//     try {people
//       await people.save();
//       res.send(people);
//     } catch (err) {
//       res.status(500).send(err);
//     }
    
// });

const http = require('http');

app.post("api/myob", function(request, response) {
   proxyRequest = http.request({
      host: 'https://secure.myob.com/oauth2/v1/authorize',
      //port: 80,
      method: 'POST',
      //path: '/endpoint/url',
      headers: {
        'Content-Type':"application/json"
      }
    },
    function (proxyResponse) {
      proxyResponse.on('data', function (chunk) {
        response.send(chunk);
      });
    });

  //proxyRequest.console.log(response.body);
  proxyRequest.end();
});




//app.use(express.static(__dirname)); //here is important thing - no static directory, because all static :)

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
    //res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
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
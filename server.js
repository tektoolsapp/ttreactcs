// const express = require('express');
// const app = express();
// const port = process.env.PORT || 5000;

// console.log that your server is up and running
//app.listen(port, () => console.log(`Listening on port ${port}`));

//new

const express = require('express');
const path = require('path');
const generatePassword = require('password-generator');

//const postmark = require("postmark");
//var serverToken = "c5072a02-99f4-4512-9cdf-ae3f1ebe3d2b";
//var client = new postmark.ServerClient(serverToken);

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

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
//           }).then(res => {
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

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.

//app.use(express.static(__dirname)); //here is important thing - no static directory, because all static :)

// app.get("/*", function(req, res) {
//   res.sendFile(path.join(__dirname, "index.html"));
// });

app.get("/*", function (req, res) {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
})


// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname+'/client/build/index.html'));
// });

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Password generator listening on ${port}`);




//end new

// create a GET route
app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});
import React from "react"
import axios from 'axios';
import con from "../config"

function MyobAuth() {
    
  const queryString = window.location.search;
  console.log(queryString);

  const urlParams = new URLSearchParams(queryString);

  const code = urlParams.get('code')

  // if(code.length > 0){
  //   localStorage.setItem('myobToken', code);
  // } else {
  //   code = localStorage.getItem('myobToken');
  // }

  console.log("CODE:", code);

  const apiKey = con.API_KEY
  const apiSecret = con.API_SECRET
  const companyFile = con.API_COMPANY_FILE
  const redirectUrl = con.REDIRECT_URL

  if(code !== null && code !== 'undefined' && code.length > 0){
  //   const tokens = getTokens(apiKey, apiSecret, companyFile, redirectUrl)
  //   console.log("GET TOKENS");
  //   console.log(tokens);
    const tokens = getTokens(apiKey, apiSecret, companyFile, redirectUrl)
    console.log("GET TOKENS");
    console.log(tokens);
  
  } else {
     console.log("TRY AGAIN");
  }

  // const tokens = getTokens(apiKey, apiSecret, companyFile, redirectUrl)
  //   console.log("GET TOKENS");
  //   console.log(tokens);

  // getPasswords = () => {
  //   // Get the passwords and store them in state
  //   fetch('/api/passwords')
  //     .then(res => res.json())
  //     .then(passwords => this.setState({ passwords }));
  // }

  // axios.post(`http://localhost:5000/people`, params)
  //   .then(res => {
  //       console.log(res);
  //       console.log(res.data);
  //   })

  // const postHelper = {
  //   url: "https://secure.myob.com/oauth2/v1/authorize",
  //   headers: {
  //     'Content-Type': "application/json"
  //   }
  // }

  async function getTokens(apiKey, apiSecret, companyFile, redirectUrl) {

    const config = { headers:{'Content-Type':"application/json"}}
    const params={
        client_id: apiKey,
        client_secret: apiSecret,
        scope: companyFile,
        code: code,
        redirect_uri: redirectUrl,
        grant_type : "authorization_code"
    }

    let res = await axios.post('/api/myob', params)
      .then((response) => {
        
        console.log("AXIOS RESP: ", response.data);
        let tokens = response.data;
        //STORE THE TOKENS > REDIRECT HOME
        let myobAccessToken = tokens.access_token
        console.log("MAT: ", myobAccessToken)
        localStorage.setItem('myobAccessToken', myobAccessToken);
        let myobRefreshToken = tokens['refresh_token']
        console.log("MRT: ", myobRefreshToken)
        localStorage.setItem('myobRefreshToken', myobRefreshToken);

        window.location = '/';

    }, (error) => {
      console.log(error);
    });

  }

  return (
      <div>
        <h1>Auth</h1>
      </div>
  );
};

export default MyobAuth

import React, {useState} from "react"
import axios from 'axios';
import con from "../config"

import { Button } from "@chakra-ui/core";
//import { stringify } from "querystring";

const apiKey = con.API_KEY
const apiSecret = con.API_SECRET
const companyFile = con.API_COMPANY_FILE
const redirectUrl = con.REDIRECT_URL
const code = "BLA"

function MyobTest(){

    async function postMyob(){

        //const config = { headers:{'Content-Type':"application/json"}}
        const params={
            client_id: apiKey,
            client_secret: apiSecret,
            scope: companyFile,
            code: code,
            redirect_uri: redirectUrl,
            grant_type : "authorization_code"
        }

        let res = await axios.post('/api/myob', params);

        // let res = await axios.post('/api/myob', {
        //          firstName: 'Fred',
        //          lastName: 'Flintstone'
        //       })

        console.log(res.data);


        // axios.post('/api/myob', {
        //     firstName: 'Fred',
        //     lastName: 'Flintstone'
        //   })
        //   .then(function (response) {
        //     console.log(response);
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   });

        // axios.post("/api/myob", data)

        // .then(function (response) {
        // console.log(response);
        // })
        // .catch(function (error) {
        // console.log(error);
        // });
        
        //alert("POST TO MYOB")
        // fetch('/api/myob')
        // .then(res => console.log(res));

        // axios({
        //     method: 'post',
        //     url: '/api/myob',
        //     data: {
        //       firstName: 'shedrack',
        //       lastName: 'akintayo'
        //     }
        //   });

    }
    
    return(
        <div>
          <h1>Myob Post Test</h1>

          <Button variantColor="green" onClick={() => postMyob()}>Post to MYOB</Button>

        </div>
    )

} 

export default MyobTest
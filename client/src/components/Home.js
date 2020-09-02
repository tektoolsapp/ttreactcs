import React, {useState} from "react"
import axios from 'axios'
import con from "../config"
import { Button } from "@chakra-ui/core"

//const config = require('config');
//const myob = config.get('myob');
//console.log(myob)

function Home(){

    //const myobConnected = useState(false)
    //console.log(myobConnected)

    const apiKey = con.API_KEY
    const redirectUrl = con.REDIRECT_URL

    const apiCoyUn = con.API_COY_UN
    const apiCoyPw = con.API_COY_PW

    const accessCodeUrl =`https://secure.myob.com/oauth2/account/authorize?client_id=${apiKey}&redirect_uri=${redirectUrl}&response_type=code&scope=CompanyFile`

    console.log(accessCodeUrl)

    function getMyob(accessCodeUrl){
        window.location = accessCodeUrl; 
    }

    async function getMyobInfo(){
        
        const myobAccessToken = localStorage.getItem('myobAccessToken');
        const apiKey = con.API_KEY
        const cf = apiCoyUn + ':' + apiCoyPw
        const cftoken = Buffer.from(cf).toString('base64');
        
        const res = await axios.get('/api/company', {
        headers: {
                "authorization" : `Bearer ${myobAccessToken}`,
                'cftoken' : cftoken,
                'apikey' : apiKey,
                'apiversion' : 'v2'
            }
        })
        .then((response) => {
            
            console.log("AXIOS INFO RESP: ", response.data);
            let info = response.data;
            
            console.log("INFO: ", info)
            
        }, (error) => {
        console.log(error);
        });

    }

    async function getContacts(){

        const res = await axios.get('/api/contacts')
        .then((response) => {
            
            console.log("AXIOS CONTACTS INFO RESP: ", response.data);
            let info = response.data;
            
            console.log("CONTACTS INFO: ", info)
            
        }, (error) => {
        console.log(error);
        });

    }

    return(
        <div>
          <h1>Home</h1>
          <div>
            <Button variantColor="green" onClick={() => getMyob(accessCodeUrl)}>Connect to MYOB</Button>
          </div>
          <div>
            <Button variantColor="green" onClick={() => getMyobInfo()}>MYOB Info</Button>
          </div>
          <div>
            <Button variantColor="green" onClick={() => getContacts()}>Email Contacts</Button>
          </div>
        </div>
    )

} 

export default Home
import React, {useState} from "react"
import axios from 'axios';
//import con from "../config"

import { Button } from "@chakra-ui/core";
import { stringify } from "querystring";

function MyobTest(){

    function postMyob(){

        //alert("POST TO MYOB")
        // fetch('/api/myob')
        // .then(res => console.log(res));

        axios({
            method: 'post',
            url: '/api/myob',
            data: {
              firstName: 'shedrack',
              lastName: 'akintayo'
            }
          });

    }
    
    return(
        <div>
          <h1>Myob Post Test</h1>

          <Button variantColor="green" onClick={() => postMyob()}>Post to MYOB</Button>

        </div>
    )

} 

export default MyobTest
import React, { Component} from 'react';
import axios from 'axios';
import { request, gql } from 'graphql-request'


const SpaceXApp = () => {
   
    const spaceXQuery = gql`
{
  launches {
    flight_number
    mission_name
    launch_date_utc
    launch_success
  }
}`

    request('/graphql', spaceXQuery).then((res) => {
        console.log(res)
    }).catch(((err) => {
        console.log(err)
    }));

        return (
            <div className="SpaceXApp">
                SpaceX
            </div>
        )
    
}

export default SpaceXApp
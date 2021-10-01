/**
 * @description Query info is used to store boilerplate GraphQL queries
 */

const QueryInfo = [
  `query { 
    launches {
      flight_number
      mission_name
      launch_date_utc
      launch_success
      cost_per_launch
      rocket{
          rocket_id
          rocket_name
          rocket_type
          cost_per_launch
          boosters
      }
    }
  }`,
  `query { 
    launches {
      flight_number
      mission_name
      launch_date_utc
      launch_success
      cost_per_launch
    }
  }`, 
    `query {
        launches{
            flight_number
        }
    }`

 
]

export default QueryInfo
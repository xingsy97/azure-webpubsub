const GRAPHQL_ENDPOINT = 'wss://xsy-wps-dev.webpubsub.azure.com/client/hubs/graphql_main?access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjkzNTkxNzAsImV4cCI6MTYyOTM2Mjc3MCwiYXVkIjoiaHR0cHM6Ly94c3ktd3BzLWRldi53ZWJwdWJzdWIuYXp1cmUuY29tL2NsaWVudC9odWJzL2dyYXBocWxfbWFpbiIsInN1YiI6IkFwb2xsb1NlcnZlci00MTE5YmJkMC1lMTVhLTRjNzItYjQ1Mi05OTRmMGJhYzY2YTAifQ.vG4SNqn4ZI6_mhItE2qcZ2-vHsPggxt34raiGVEB8jQ';
import ws from 'ws';
import {SubscriptionClient} from 'subscriptions-transport-ws';
import { gql } from 'apollo-server';

const client = new SubscriptionClient(GRAPHQL_ENDPOINT, {
    reconnect: true,
    connectionParams: {
        authToken: "test",
    },
}, ws);

var x = client.request({
    query: gql`
        subscription{
          numberIncremented
         }
      `,
})

console.log("after");
x.subscribe( {
    next (data) {
        console.log(data);
    }
})

// const apolloClient = new ApolloClient({
//     cache,
//     uri: "http://localhost:5000/graphql",
//     networkInterface: client,
// } as any);


// apolloClient.subscribe({
//     query: gql`
//         subscription{
//           numberIncremented
//          }
//       `,
//     variables: {}
//   }).subscribe({
//     next (data) {
//         console.log(data);
//       // Notify your application with the new arrived data
//     }
//   });
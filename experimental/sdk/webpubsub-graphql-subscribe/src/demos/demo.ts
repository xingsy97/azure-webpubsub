// Modified From https://github.com/apollographql/docs-examples/blob/7105d77acfc67d6cb4097cc27a7956051ec0c1b5/server-subscriptions-as3/index.js
import { getWebPubSubServerOptions, WpsPubSub } from '../index';
import { ApolloServer, gql } from "apollo-server-express";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { SubscriptionServer, ConnectionContext } from 'subscriptions-transport-ws';
import { PubSub } from "graphql-subscriptions";
import { execute, subscribe } from "graphql";
import { DEFAULT_OPTIONS } from '../utils';
import express from 'express';
import session from 'express-session';
import * as https from "https";
import {applySimpleAuthToExpress, authWebSocket, applyGithubOAuthToExpress} from "./auth";
const fs = require('fs');
const key = fs.readFileSync('./key.pem');
const cert = fs.readFileSync('./cert.pem');

// const webpubsub_conn_string = "<webpubsub-connection-string>";
const webpubsub_conn_string = 'Endpoint=http://localhost;AccessKey=ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789ABCDEFGH;Port=8080;Version=1.0;';
//const webpubsub_conn_string = 'Endpoint=https://xsy-wps-dev.webpubsub.azure.com;AccessKey=V2BiOd98dKFcWGaBlCwjH0o9XaRg4DaWrEIIMhFudho=;Version=1.0;';
const githubClientId = "c7c3bb449781f830f0c9";
const githubClientSecret = "006c27050535a2eaeaf4f4b14c80f012e7e79770";
const secret="asdjlfkaasdfkjlads";
const sessionStore = new session.MemoryStore();
const authMethod: "OAUTH" | "SIMPLE" = "SIMPLE";
const users = {};

// when useWPS = false, subscription server will be launched without Azure WebPub support
const useWPS = true;

let currentNumber = 0;
const pubsub = useWPS ? new WpsPubSub(webpubsub_conn_string, DEFAULT_OPTIONS.pubsubOptions) : new PubSub();

// Schema definition
const typeDefs = gql`
	type User {
		userName: String!
		userId: String!
	}
	type Query { currentNumber: Int }
	type Subscription { numberIncremented: Int }
	type Mutation {
		login(email: String!, password: String!): User
	}
`;

// Resolver map
const resolvers = {
	Query: {
		currentNumber() { return currentNumber; }
	},
	Subscription: {
		numberIncremented: {
			// subscribe: () => pubsub.asyncIterator(['NUMBER_INCREMENTED']),
			subscribe: (_, __, { connection }) => {
				// console.log(_, __, connection);	if (!connection.context.req.session.userName) throw new Error("not authed");
				return pubsub.asyncIterator(['NUMBER_INCREMENTED']);
			}
		}
	},
	Mutation: {
		login: async (_, __, { req }) => {
			let user = {userName:"bob"};
			req.session.userName = user.userName;
			return user; 
		  },
	}
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

function incrementNumber() {
	currentNumber++;
	pubsub.publish('NUMBER_INCREMENTED', { numberIncremented: currentNumber });     // publish: publish(<event-name>, <event-data>)
	setTimeout(incrementNumber, 1000);
}

async function main() {
	// --------------------		Step 1 : Create an Apollo HTTP server		---------------------
	
	const app = express();		// Create an Express application

	const apolloServer = new ApolloServer({		// Create an Apollo Server and apply it to the Express application
		schema,
		context: ({ req, res, connection }: any) => ({ req, res, connection }),
	});
	app.use(apolloServer.getMiddleware());

	// await apolloServer.start();	
   
	// 1.2	Create a HTTP server with the Express application
	const httpServer = https.createServer({key: key, cert: cert }, app);
	
	// --------------------		Step 2 : Create an Subscription Server		---------------------
	var createOptions = useWPS 
					? await getWebPubSubServerOptions(apolloServer, pubsub as WpsPubSub, webpubsub_conn_string, DEFAULT_OPTIONS.subscribeServerOptions)
					: { server: httpServer, path: apolloServer.subscriptionsPath }

	var subscribeServer = new SubscriptionServer({  	// https://stackoverflow.com/questions/36842159/node-js-ws-and-express-session-how-to-get-session-object-from-ws-upgradereq
			schema, execute, subscribe,
			async onConnect(connectionParams, webSocket, context: ConnectionContext) {
				console.log('--- OnConnect ---');
				console.log("upgradeReq = ", webSocket.upgradeReq);
				return true;
				return await authWebSocket(webSocket, sessionStore, secret);
			}, 
			async onDisconnect(webSocket, context) {
				console.log('Disconnected!')
			},
		}, 
		createOptions
	);

	var wsPath = useWPS ? apolloServer.subscriptionsPath : `wss://localhost:${DEFAULT_OPTIONS.apolloPort}${apolloServer.subscriptionsPath}`;

	if (authMethod == "OAUTH") 
		applyGithubOAuthToExpress(app, secret, sessionStore, [], githubClientId, githubClientSecret, wsPath);
	else
		applySimpleAuthToExpress(app, sessionStore, secret, wsPath);

	app.get('/negotiate', async (req: any, res) => { 
		if (authMethod == "OAUTH" && (!req.user || !req.user.username)) { res.status(401).send('No Auth'); return; }
		if (authMethod == "SIMPLE" && !req.session.userName) {	res.status(401).send('No Auth'); return;	}
		res.json({url: wsPath}); 
	});

	// --------------------		Step 3 : Launch the httpServer				---------------------
	httpServer.listen(DEFAULT_OPTIONS.apolloPort, () => {
		console.log(`🚀 Query endpoint ready at http://localhost:${DEFAULT_OPTIONS.apolloPort}${apolloServer.graphqlPath}`);
		console.log("🚀 Subscription endpoint ready at "  + (useWPS ? apolloServer.subscriptionsPath : `ws://localhost:${DEFAULT_OPTIONS.apolloPort}${apolloServer.subscriptionsPath}`));
	});

	incrementNumber();

}

main()

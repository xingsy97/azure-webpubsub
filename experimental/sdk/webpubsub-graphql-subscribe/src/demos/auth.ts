import session from 'express-session';
import cookieParser from 'cookie-parser';
import express from 'express';
var cookie = require('cookie');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const hubName = 'chat';
import {readFileSync} from 'fs';
const cors = require('cors');

const deployIndex = (app: express.Express, wsPath: string) => {
    var indexContent = readFileSync("public/index.html");
    app.get("/", (req, res) => { 
      // res.header("Access-Control-Allow-Origin", "*"); res.header("Access-Control-Allow-Credentials", "*");
      res.send(indexContent.toString().replace("<websocket-url>", wsPath)); 
    });
}

export const applySimpleAuthToExpress = (app, sessionStore, secret, wsPath) => {
  const sessionMiddleware = session({
		store: sessionStore,
		secret: secret,
		resave: false,
		saveUninitialized: false,
    cookie: {
      sameSite: 'none',
      secure: true,
    }
	});
  app.use(sessionMiddleware);
	app.use(cookieParser(secret));
	
	app.get('/auth', function(req, res) {
    console.log(req.headers.cookie);
    
		if (req.session.userName) {
      res.send(`Hello ${req.session.userName}, You're Already Authed`);
    }
		else {
			req.session.userName = "Bob";
			// console.log("req.session = ", req.session);
			// console.log("req.cookies = ", req.cookies);
			res.send("You are Authed Now!");
		}
	});
	deployIndex(app, wsPath);
}

export const authWebSocket = (webSocket: any, sessionStore:any, secret: string) => {
    return new Promise<void>((resolve, reject) => {
        console.log("headers=", webSocket.upgradeReq.headers);
        var cookies = webSocket.upgradeReq.headers.cookie;
        console.log(cookies);
        if (cookies === undefined) 
            return reject("No Cookie");
        var cookies = cookie.parse(cookies);
        var sid = cookieParser.signedCookie(cookies["connect.sid"], secret);
        console.log("cookies=", cookies);
        console.log("sid=", sid);
        if (typeof(sid) !== 'string') return reject("Session Parse Failed")
        sessionStore.get(sid as string, (err, session) => { 
            console.log("err = ", err);
            console.log("session = ", session);
            if (session !== undefined) {
                console.log(`userName = ${session["userName"]}`);
                resolve();
            }
            else reject("no sesssion or no userName in session")
        });
    });
}

export const applyGithubOAuthToExpress = (
    app: express.Express, 
    cookieSecret: string,
    sessionStore: any,
    users: any, 
    githubClientId: string, 
    githubClientSecret: string,
    wsPath: string
) => {
    passport.use(
      new GitHubStrategy({
        clientID: githubClientId,
        clientSecret: githubClientSecret
      },
      (accessToken, refreshToken, profile, done) => {
        users[profile.id] = profile;
        return done(null, profile);
      }
    ));
    
    passport.serializeUser((user, done) => { done(null, user.id); });
  
    passport.deserializeUser((id, done) => {
      if (users[id]) return done(null, users[id]);
      return done(`invalid user id: ${id}`);
    });
    app.use(cookieParser());
    app.use(session({
      resave: false,
      saveUninitialized: true,
      secret: cookieSecret,
      store: sessionStore,
      cookie : {
        sameSite: 'none', // THIS is the config you are looing for.
        secure: true,
      }
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.get('/auth', passport.authenticate('github', { scope: ['user:email'] }));
    app.get('/auth/github/callback', passport.authenticate('github', { successRedirect: '/' }));
    deployIndex(app, wsPath);
}
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const { WebPubSubServiceClient } = require('@azure/web-pubsub');
const { WebPubSubEventHandler } = require('@azure/web-pubsub-express');
const hubName = 'chat';
const app = express();
const clientId = "c7c3bb449781f830f0c9";
const clientSecret = "006c27050535a2eaeaf4f4b14c80f012e7e79770";

function applyGithubOAuthToExpress(app, users, clientId, clientSecret) {
  passport.use(
    new GitHubStrategy({
      clientID: process.argv[3],
      clientSecret: process.argv[4]
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
    secret: 'keyboard cat'
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));
  app.get('/auth/github/callback', passport.authenticate('github', { successRedirect: '/' }));
}

// initialize github authentication
const users = {};
applyGithubOAuthToExpress(app, users, clientId, clientSecret);

// initialize web pubsub event handlers
let serviceClient = new WebPubSubServiceClient(process.argv[2], hubName);
let handler = new WebPubSubEventHandler(hubName, ['*'], {
  path: '/eventhandler',
  handleConnect: (req, res) => {
    res.success({
      groups: ['system', 'message'],
    });
  },
  onConnected: req => {
    console.log(`${req.context.userId} connected`);
    serviceClient.group('system').sendToAll(`${req.context.userId} joined`, { contentType: 'text/plain' });
  },
  handleUserEvent: (req, res) => {
    console.log(req.data);
    if (req.context.eventName === 'message') {
      serviceClient.group('message').sendToAll({
        user: req.context.userId,
        message: req.data
      });
    }
    res.success();
  }
});

app.use(handler.getMiddleware());
app.get('/negotiate', async (req, res) => {
  if (!req.user || !req.user.username) {
    res.status(401).send('missing user id');
    return;
  }
  var options = {
    userId: req.user.username,
    roles: []
  };
  if (req.user.username === process.argv[5]) options.roles= ['webpubsub.sendToGroup.system'];
  let token = await serviceClient.getAuthenticationToken(options);
  res.json({
    url: token.url
  });
});

app.use(express.static('public'));
app.listen(8888, () => console.log('server started'));
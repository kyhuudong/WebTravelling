'use strict';
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config({ path: 'variables.env' })
const APIAI_TOKEN = process.env.APIAI_TOKEN;
const APIAI_SESSION_ID = process.env.APIAI_SESSION_ID;

const express = require('express');
const app = express();

app.use(express.static(__dirname + '/views')); // html
app.use(express.static(__dirname + '/public')); // js, css, images
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = app.listen(process.env.PORT || 5000, () => {
  console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});

const io = require('socket.io')(server);
io.on('connection', function(socket){
  console.log('a user connected');
});

const apiai = require('apiai')(APIAI_TOKEN);

// Web UI
app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.post('/chat', (req, res) => {

  const message = req.body.message;
  console.log(req.body);
  let apiaiReq = apiai.textRequest(message, {
    sessionId: APIAI_SESSION_ID
  });
  apiaiReq.on('response', (response) => {
    let aiText = response.result.fulfillment.speech;
    console.log('Bot reply: ' + aiText);
    res.send(aiText);
  });

  apiaiReq.on('error', (error) => {
    console.log(error);
  });

  apiaiReq.end();
});

io.on('connection', function(socket) {
  socket.on('chat message', (text) => {
    console.log('Message: ' + text);

    // Get a reply from API.ai

    let apiaiReq = apiai.textRequest(text, {
      sessionId: APIAI_SESSION_ID
    });

    apiaiReq.on('response', (response) => {
      let aiText = response.result.fulfillment.speech;
      console.log('Bot reply: ' + aiText);
      socket.emit('bot reply', aiText);
    });

    apiaiReq.on('error', (error) => {
      console.log(error);
    });

    apiaiReq.end();

  });
});
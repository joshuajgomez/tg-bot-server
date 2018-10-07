// set webhook
// https://api.telegram.org/bot584181575:AAHOjDEMEAx1dyzUh5WO2HV_wc-R7kcUVJI/setWebhook?url=https://tg-bot-server-hrxqzleoqm.now.sh
// logs
// https://zeit.co/joshuajgomez/tg-bot-server/byfsfgwndu/logs

var express = require('express')
var app = express()
var bodyParser = require('body-parser')
const axios = require('axios')
var telegram = require('telegram-bot-api');

var api = new telegram({
  token: '584181575:AAHOjDEMEAx1dyzUh5WO2HV_wc-R7kcUVJI',
  updates: {
    enabled: true,
    get_interval: 1000
  }
});

const sendUrl = 'https://api.telegram.org/bot584181575:AAHOjDEMEAx1dyzUh5WO2HV_wc-R7kcUVJI/sendMessage'
const key_shoot = '/shoot'
const key_snoop = "/snoopdogg"
const key_image = '/image'

app.use(bodyParser.json()) // for parsing application/json
app.use(
  bodyParser.urlencoded({
    extended: true
  })
) // for parsing application/x-www-form-urlencoded

app.post('/', function(req, res) {

  const { message } = req.body
  var response_msg = 'Yeah, You could say that!'
  var type = '/DEFAULT'

  if (message.text.startsWith(key_shoot)) {
    // in case a message is not present, or if our message does not have the word marco in it, do nothing and return an empty response
    response_msg = 'Bang! Bang! Bang!'  
    type = key_shoot
  } else if (message.text.startsWith(key_snoop)) {
    response_msg = 'Nada! Nada! Nada!'
    type = key_snoop
  } else if (message.text.startsWith(key_image)) {
    api.sendPhoto({
      chat_id : message.chat.id,
      photo: './image.jpg'//replace your image url here
  })
    .then(function(data)
    {
      console.log(data);
    });
  }

  console.log('[' + type + '] User #' + message.chat.id + " says " + message.text)

  axios
  .post(
    sendUrl,
    {
      chat_id: message.chat.id,
      text: response_msg
    }
    )
  .then(response => {
      // We get here if the message was successfully posted
      console.log('Message posted')
      res.end('ok')
    })
  .catch(err => {
      // ...and here if it was not
      console.log('Error :', err)
      res.end('Error :' + err)
    })

})

// Finally, start our server
app.listen(3000, function() {
  console.log('Telegram app listening on port 3000!')
})
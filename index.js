// set webhook
// https://api.telegram.org/bot584181575:AAHOjDEMEAx1dyzUh5WO2HV_wc-R7kcUVJI/setWebhook?url=https://tg-bot-server-hrxqzleoqm.now.sh
// logs
// https://zeit.co/joshuajgomez/tg-bot-server/byfsfgwndu/logs

var express = require('express')
var app = express()
var bodyParser = require('body-parser')
const axios = require('axios')

const sendUrl = 'https://api.telegram.org/bot584181575:AAHOjDEMEAx1dyzUh5WO2HV_wc-R7kcUVJI/sendMessage'
const key_shoot = '/shoot'
const key_snoop = "/snoopdogg"
const key_image = '/image'
const key_music = '/music'
const key_josh = 'josh'

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

  if (message.text.toLowerCase().includes(key_josh)) {
	response_msg = 'I respect my master.'  
	type = key_josh
  } else if (message.text.startsWith(key_shoot)) {
	response_msg = 'Bang! Bang! Bang!'  
	type = key_shoot
  } else if (message.text.startsWith(key_snoop)) {
	response_msg = 'Nada! Nada! Nada!'
	type = key_snoop
  } else if (message.text.startsWith(key_image)) {
	response_msg = 'One image coming right up!!'
  } else if (message.text.startsWith(key_music)) {
	response_msg = 'I will give you music'
  } else {
	return res.end()    
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

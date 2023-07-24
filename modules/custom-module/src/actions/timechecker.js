/**
 * Small description of your action
 * @title Custom Greeting
 * @category Custom
 * @author Basanta Rai
 */

// const myAction = async () => {

//   try {
//     const message = {
//       type: 'text',
//       text: "Hello, this is custom greeting!",
//       markdown: true
//     }

//     await bp.events.replyToEvent(event, [message])
//   } catch (error) {
//     bp.logger.info(error)
//   }
// }

// return myAction()

const axios = require('axios')

async function sendWhatsAppMessage(recipient, message) {
  const payload = {
    recipient: recipient,
    message: message
  }

  try {
    const response = await axios.post(
      'https://connect.pabbly.com/workflow/sendwebhookdata/IjU3NjUwNTZjMDYzNDA0MzU1MjY0NTUzNjUxMzMi_pc',
      payload,
      {
        headers: {
          Authorization:
            'Bearer EAAHlbPJeF5gBABzXLEaHyuSZChtZCtRoyyvRKkwtzU7XqgZBHrK6sWqVmhYZCZBUPXUZCdoHRlAvDIewZBY2ZCpHZCYeDDLBicP0ZCfAhRSe8iVeKFugX5Y1m6oBJII25CqFTahXYWAdZBDEZCmXk0UHDxFDNgNZBHMmLLcJOOfnYtZAqOIknZCW5NbSpt10fikbZCQlXruJFaRNTKjZAnAZDZD'
        }
      }
    )

    return response.data
  } catch (error) {
    console.error('Failed to send WhatsApp message:', error)
    throw error
  }
}

const myAction = async (bp, event) => {
  const recipient = '9818088418'
  const message = 'Hello from Botpress!'

  try {
    await sendWhatsAppMessage(recipient, message)
    // Handle successful sending of WhatsApp message
  } catch (error) {
    // Handle error
  }
}

return myAction(bp, event)

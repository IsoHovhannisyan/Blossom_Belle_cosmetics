const twilio = require('twilio');

// Load environment variables
require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

// Function to send SMS
const sendSMS = async (recipientPhoneNumber, message) => {
  try {
    await client.messages.create({
      body: message,
      from: twilioPhoneNumber,
      to: recipientPhoneNumber
    });
    console.log('SMS sent successfully.');
  } catch (error) {
    console.error('Error sending SMS:', error);
  }
};

module.exports = sendSMS;





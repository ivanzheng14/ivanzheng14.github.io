const cheerio = require('cheerio');
const axios = require('axios');
const nodemailer = require('nodemailer');
const { AzureFunction, Context } = require('@azure/functions');

const emailConfig = {
  service: 'Gmail',
  auth: {
    user: 'ivanzheng4826@gmail.com',
    pass: 'rupuxitdyeczbrzz'
  }
};

const targetURL = 'https://loris.wlu.ca/ssb_prod/bwckschd.p_disp_detail_sched?term_in={TERM}&crn_in={CRN}';

async function scrapeRemainingSeats(term, crn) {
  const url = targetURL.replace('{TERM}', term).replace('{CRN}', crn);
  try {
    const response = await axios.get(url);
    const html = response.data;

    const $ = cheerio.load(html);

    const seatsAvailable = parseInt($('table.datadisplaytable tbody tr:nth-child(2) td.dddefault').text(), 10);
    const waitlistSeatsAvailable = parseInt($('table.datadisplaytable tbody tr:nth-child(3) td.dddefault').text(), 10);

    return {
      seatsAvailable,
      waitlistSeatsAvailable
    };
  } catch (error) {
    console.error('Error scraping seats:', error);
    return null;
  }
}

function sendEmail(recipient, subject, body) {
  const transporter = nodemailer.createTransport(emailConfig);

  const mailOptions = {
    from: emailConfig.auth.user,
    to: recipient,
    subject: subject,
    text: body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

module.exports = async function (context, req) {
  const { term, crn, email } = req.query;
  const recipientEmail = email || 'zhen6090@mylaurier.ca';

  const seatData = await scrapeRemainingSeats(term, crn);

  if (seatData && seatData.seatsAvailable > 0) {
    const message = `Seats are available for CRN ${crn} in term ${term}!`;
    sendEmail(recipientEmail, 'Seat Availability Alert', message);
    context.log(message);
  } else {
    context.log(`No seats available for CRN ${crn} in term ${term}.`);
  }

  context.res = {
    status: 200,
    body: 'Seat availability check completed'
  };
};

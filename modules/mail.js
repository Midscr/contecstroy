const nodemailer = require('nodemailer');

let mailTransporter = nodemailer.createTransport({
  service: 'yandex',
  host: 'smtp.yandex.ru',
  port: 465,
  auth: {
    user: 'rb@ray-bit.ru',
    pass: 'G55pmx0ffcraybit'
  },
  secure: true
});

module.exports = mailTransporter;

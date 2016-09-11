#!/usr/bin/env node

const amqp = require('amqplib/callback_api');
const cmd = require('./cmd.js')
const url = cmd.makeUrl()

amqp.connect(url, function(err, conn) {
  if (err) {
    console.log(err);
    return;
  };

  conn.createChannel(function(err, ch) {
    var q = 'hello';
    var msg = 'Hello World!';

    ch.assertQueue(q, {durable: false});
    // Note: on Node 6 Buffer.from(msg) should be used
    // ch.sendToQueue(q, new Buffer(msg));
    ch.sendToQueue(q, Buffer.from(msg));

    console.log(" [x] Sent %s to %s", msg, url);
  });
  setTimeout(function() { conn.close(); process.exit(0) }, 500);
});

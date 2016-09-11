#!/usr/bin/env node

var amqp = require('amqplib/callback_api');
const cmd = require('./cmd.js')
const url = cmd.makeUrl()

amqp.connect(url, function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = 'hello';

    ch.assertQueue(q, {durable: false});
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
    ch.consume(q, function(msg) {
      console.log(" [x] Received %s from %s", msg.content.toString(), url);
    }, {noAck: true});
  });
});
const kafka = require('kafka-node');
const Catalog = require('../models');

const TOPICS = [{
  topic: 'PRODUCTS',
  partitions: 1,
  replicationFactor: 1
}];

const CONSUMER_SETTINGS = {
  autoCommit: true,
  fetchMaxWaitMs: 1000,
  fetchMaxBytes: 1024 * 1024,
  encoding: 'utf8',
  fromOffset: false
}

function service() {
  try {
    const Consumer = kafka.Consumer;
    const client = new kafka.KafkaClient({kafkaHost: process.env.KAFKA});
    console.log(`Connecting to ${process.env.KAFKA}`);
    let consumer = new Consumer(client, TOPICS, CONSUMER_SETTINGS);
    consumer.on('message', ({value})  => {
      console.log(`kafka message ${value}`);
      let catalog = new Catalog({product_id: JSON.parse(value).id});
      catalog.save()
    });
    consumer.on('error', (err) => console.log('error', err));
  } catch(e) {
    console.log(e);
  }
}

exports.service = service;

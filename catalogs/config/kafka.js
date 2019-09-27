const kafka = require('kafka-node');
const Catalog = require('../models');

function client() {
  console.log(`Connecting to ${process.env.KAFKA}`);
  return new kafka.KafkaClient({kafkaHost: process.env.KAFKA});
}

function createConsumer() {
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
  };
  return new kafka.Consumer(client(), TOPICS, CONSUMER_SETTINGS);
}

function handleMessage({value}) {
  const {event, id} = JSON.parse(value);
  console.log(`Received event ${event} for id ${id}`);
  (event === 'PRODUCT_CREATED') ?  new Catalog({product_id: id}).save() : Catalog.remove({product_id: id});
}

function service() {
  let consumer = createConsumer();
  consumer.on('message', handleMessage);
  consumer.on('error', () => setTimeout(service, 3000));
}

exports.service = service;

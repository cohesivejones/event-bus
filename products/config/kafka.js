const kafka = require('kafka-node');

const TOPICS = [{
  topic: 'PRODUCTS',
  partitions: 1,
  replicationFactor: 1
}];

let _connection;
function connect() {
  console.log(`Connecting to ${process.env.KAFKA}`);
  return new kafka.KafkaClient({kafkaHost: process.env.KAFKA});
}

function client() {
  if (_connection == null) {
    _connection = connect();
  }
  return _connection;
}

function producer(client) {
  const producer = new kafka.Producer(client);
  return new Promise((resolve, reject) => {
    producer.on('ready', () => {
      //producer.createTopics(TOPICS, (error, result) => {
      //  if (error) {
      //    console.error('Failed to create topics', error);
      //    reject(error);
      //  } else {
      //    console.log('Successfully created topics', result);
      //    resolve(producer);
      //  }
      //});
      resolve(producer);
    });
    producer.on('error', (err) => reject(err));
  });
}

module.exports = {
  client,
  producer
};

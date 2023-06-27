const { Kafka } = require('kafkajs');
const Users = require('../use-cases');
const Joi = require('joi')
console.log(Users.users.defaultFolders)
const kafka = new Kafka({
  clientId: 'default-folder',
  brokers: ['localhost:9092']
});

const consumer = kafka.consumer({ groupId: 'my-group' });

const run = async () => {
await consumer.connect();
await consumer.subscribe({ topic: 'my_topic' ,fromBeginning: false});

await consumer.run({
  eachMessage: async ({ topic, partition, message }) => {
    const id = JSON.parse(message.value.toString());
    console.log(id.userId);
    const result = Users.users.defaultFolders({id:id.userId}
      );
    },
  });
};

run().catch(console.error);
// const { Kafka } = require('kafkajs')
// const {defaultFolders} = require("../use-cases").users
// const kafka = new Kafka({
//   clientId: 'my-app',
//   brokers: ['localhost:9092']
// })


// const consumer = kafka.consumer({ groupId: 'test-group' })

// const run = async () => {

//   await consumer.connect()
//   await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })

//   await consumer.run({
    
//     eachMessage: async ({ topic, partition, message }) => {
//         await defaultFolders({ id: +message.value.toString() });

//       console.log({
//         partition,
//         offset: message.offset,
//         value: message.value.toString(),
//         data : "hey"
//       })
//     },
//   })
// }

// run().catch(console.error)
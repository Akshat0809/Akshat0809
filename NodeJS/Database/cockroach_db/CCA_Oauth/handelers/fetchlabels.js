module.exports = function makeaddfetchfolder({
    Kafka,
    addFolder
}) {
    
    return async function updategmailfolder() {
        databasename = 'emailclient';
        
        const kafka = new Kafka({
            clientId: 'fetch_label',
            brokers: ['localhost:9092']
        });

        const consumer = await kafka.consumer({ groupId: "fetchfoldersgmail" });

        await consumer.connect();
        await consumer.subscribe({ topic: 'fetchlabel', fromBeginning: false });
        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                console.log("Message consumed to fetch folders:", {
                    partition,
                    offset: message.offset,
                    value: message.value.toString()
                });

                let result = JSON.parse(message.value);
                // console.log("inside fetchlabels Oath",result);

                await addFolder(result)
            }
        })
    }
}
require('dotenv').config();
const { MongoClient } = require('mongodb');
const client = new MongoClient(process.env.MONGO_URL);

async function main() {
    await client.connect();
    console.log('Connection OK');
    const db = client.db('myTask');
    const collection = db.collection('documents');
    const insertStuff = await collection.insertMany([
        { a: 1 },
        { b: 2 },
        { c: 3 },
    ]);
    console.log('Documents insérés :', insertStuff);
    return 'Done';
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());

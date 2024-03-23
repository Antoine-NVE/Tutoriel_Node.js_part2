require('dotenv').config();
const { MongoClient } = require('mongodb');
const client = new MongoClient(process.env.MONGO_URL);

async function main() {
    await client.connect();
    console.log('Connection OK');
    const db = client.db('myTask');
    const collection = db.collection('documents');

    // CREATE
    try {
        const insertData = await collection.insertMany([
            {
                nom: 'Jean',
                age: 30,
                sexe: 'masculin',
                hobby: 'jouer au football',
            },
            {
                nom: 'Marie',
                age: 25,
                sexe: 'féminin',
                hobby: 'peindre',
            },
            {
                nom: 'Pierre',
                age: 35,
                sexe: 'masculin',
                hobby: 'jouer de la guitare',
            },
        ]);
        console.log('Documents insérés :', insertData);
    } catch (error) {
        throw error;
    }

    // READ
    try {
        const findData = await collection.findOne({ nom: 'Jean' });
        console.log('Document trouvé :', findData);

        const findMultipleData = collection.find({ sexe: 'masculin' });
        console.log('Documents trouvés :', await findMultipleData.toArray());
    } catch (error) {
        throw error;
    }

    // UPDATE
    try {
        const updatePierre = collection.updateOne(
            { nom: 'Pierre' },
            {
                $set: {
                    nom: 'Pauline',
                    sexe: 'féminin',
                },
            }
        );
        console.log('Document modifié :', await updatePierre);

        const updateAge = collection.updateMany(
            { age: 30 },
            {
                $set: {
                    age: 31,
                },
            }
        );
        console.log('Documents modifiés :', await updateAge);
    } catch (error) {
        throw error;
    }

    // DELETE
    try {
        const deletePierre = await collection.deleteOne({ nom: 'Pauline' });
        console.log('Document supprimé :', deletePierre);

        const deleteEveryone = await collection.deleteMany();
        console.log('Documents supprimés :', deleteEveryone);
    } catch (error) {
        throw error;
    }

    return 'Done';
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());

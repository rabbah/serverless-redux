// This works
// function main() {
//     let greeting = "What's up"
//     return {
//         "body": greeting
//         }
// }

require ('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');
const path = require('path');

async function main() {
    const DB_CERT = process.env['CA_CERT'].replace(/\\n/g, '\n');
    const DATABASE_URL = process.env['DATABASE_URL'];
    const uri = DATABASE_URL

    const tlsCAFilePath = path.resolve(__dirname, 'certificate.pem');
    fs.writeFileSync(tlsCAFilePath, DB_CERT, { encoding: 'utf8' });

    let client = new MongoClient(uri, {
        tls: true,
        tlsCAFile: tlsCAFilePath,
        tlsInsecure: true
    });

    try {
        await client.connect();
        // await listDatabases(client);
        const inventory = await client.db("admin").collection("inventory").find().toArray();
        console.log(inventory);
        return {
            "body": inventory
        }
    } catch {
        console.error();
        return {
            "error": "oops"
        }
    } finally {
        await client.close();
    }
}

module.exports.main = main

if (process.env.TEST) {
    main().then(console.log).catch(console.error)
}

// async function listDatabases(client) {
//   const databasesList = await client.db().admin().listDatabases();
//   console.log("Databases:");
//   databasesList.databases.forEach(db => {
//     console.log(`- ${db.name}`);
//   })
// }

// async function getInventory(client) {
//   const inventory = await client.db("admin").collection("inventory").find().toArray();
//   console.log(inventory);
//   return {
//       body: {
//         coffee: inventory
//     }
//   }
// }

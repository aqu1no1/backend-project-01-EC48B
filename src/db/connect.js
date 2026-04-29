import { MongoClient } from 'mongodb';
import 'dotenv/config';

let db = null;

async function connect() {
    if (db) return db;
    
    try {
        const client = new MongoClient(process.env.MONGO_URI);
        await client.connect();
        db = client.db(process.env.MONGO_DB_NAME);
        console.log(`Conectado ao banco: ${process.env.MONGO_DB_NAME}`);
        return db;
    } catch (error) {
        console.error('Erro ao conectar no MongoDB:', error);
        throw error;
    }
}

export default connect;
import connect from '../db/connect.js';
import { v4 as uuidv4 } from 'uuid';

async function insertVideo({ name, url, category, duration, userId }) {
    if (!name)      throw new Error('Campo obrigatório ausente: nome');
    if (!url)       throw new Error('Campo obrigatório ausente: url');
    if (!category) throw new Error('Campo obrigatório ausente: categoria');
    if (!duration)   throw new Error('Campo obrigatório ausente: duracao');
    if (!userId)    throw new Error('Campo obrigatório ausente: userId');

    try {
        const db = await connect();
        const collection = db.collection('videos');

        const video = {
            _id: uuidv4(),
            name,
            url,
            category,
            duration,
            count: { like: 0, dislike: 0 },
            createdAt: new Date(),
            updatedAt: new Date(),
            userId,
        };

        const result = await collection.insertOne(video);
        console.log(`Vídeo inserido com id: ${result.insertedId}`);
        return result;
    } catch (error) {
        console.error('Erro ao inserir vídeo:', error.message);
        throw error;
    }
}

export default insertVideo;
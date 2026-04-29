import connect from '../db/connect.js';
import { v4 as uuidv4 } from 'uuid';

async function insertFavorite({ userId, videoId }) {
    if (!userId)  throw new Error('Campo obrigatório ausente: userId');
    if (!videoId) throw new Error('Campo obrigatório ausente: videoId');

    try {
        const db = await connect();
        const collection = db.collection('favoritos');

        const jaExiste = await collection.findOne({ userId, videoId });

        if (jaExiste) {
            console.warn('Vídeo já está nos favoritos');
            return null;
        }

        const favorito = {
            _id: uuidv4(),
            userId,
            videoId,
            createdAt: new Date(),
        };

        const result = await collection.insertOne(favorito);
        console.log(`Favorito inserido com id: ${result.insertedId}`);
        return result;
    } catch (error) {
        console.error('Erro ao inserir favorito:', error.message);
        throw error;
    }
}

export default insertFavorite;
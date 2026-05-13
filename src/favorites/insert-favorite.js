import connect from '../db/connect.js';
import { v4 as uuidv4 } from 'uuid';
import { logError, logInfo, logWarn } from '../logger/logger.js';

async function insertFavorite({ userId, videoId }) {
    if (!userId) throw new Error('Campo obrigatório ausente: userId');
    if (!videoId) throw new Error('Campo obrigatório ausente: videoId');

    try {
        const db = await connect();
        const collection = db.collection('favoritos');

        const jaExiste = await collection.findOne({ userId, videoId });
        if (jaExiste) {
            logWarn('insertFavorite', 'Vídeo já está nos favoritos');
            return null;
        }

        const favorito = {
            _id: uuidv4(),
            userId,
            videoId,
            createdAt: new Date(),
        };

        const result = await collection.insertOne(favorito);
        logInfo('insertFavorite', `Favorito inserido com id: ${result.insertedId}`);
        return result;
    } catch (error) {
        logError('insertFavorite', 'Erro ao inserir favorito', error);
        throw error;
    }
}

export default insertFavorite;
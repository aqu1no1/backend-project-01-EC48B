import connect from '../db/connect.js';
import { v4 as uuidv4 } from 'uuid';
import { logError, logInfo } from '../logger/logger.js';

async function insertPlaylist({ userId, name }) {
    if (!userId) throw new Error('Campo obrigatório ausente: userId');
    if (!name) throw new Error('Campo obrigatório ausente: nome da Playlist');

    try {
        const db = await connect();
        const collection = db.collection('playlists');

        const playlist = {
            _id: uuidv4(),
            userId,
            name,
            videoId: [],
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const result = await collection.insertOne(playlist);
        logInfo('insertPlaylist', `Playlist inserida com id: ${result.insertedId}`);
        return result;
    } catch (error) {
        logError('insertPlaylist', 'Erro ao inserir playlist', error);
        throw error;
    }
}

export default insertPlaylist;
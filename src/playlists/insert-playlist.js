import connect from '../db/connect.js';
import { v4 as uuidv4 } from 'uuid';

async function insertPlaylist({ userId, name }) {
    if (!userId)         throw new Error('Campo obrigatório ausente: userId');
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
        console.log(`Playlist inserida com id: ${result.insertedId}`);
        return result;
    } catch (error) {
        console.error('Erro ao inserir playlist:', error.message);
        throw error;
    }
}

export default insertPlaylist;
import connect from '../db/connect.js';
import { logError, logInfo } from '../logger/logger.js';

async function findPlaylists(filtro = {}) {
    try {
        const db = await connect();
        const collection = db.collection('playlists');
        const playlists = await collection.find(filtro).toArray();

        logInfo('findPlaylists', `${playlists.length} playlist(s) encontrada(s)`);
        return playlists;
    } catch (error) {
        logError('findPlaylists', 'Erro ao buscar playlists', error);
        throw error;
    }
}

export default findPlaylists;
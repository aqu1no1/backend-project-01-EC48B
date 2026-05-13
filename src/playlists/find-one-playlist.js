import connect from '../db/connect.js';
import { logError, logInfo, logWarn } from '../logger/logger.js';

async function findOnePlaylist(id) {
    if (!id) throw new Error('Campo obrigatório ausente: id');

    try {
        const db = await connect();
        const collection = db.collection('playlists');
        const playlist = await collection.findOne({ _id: id });

        if (!playlist) {
            logWarn('findOnePlaylist', `Nenhuma playlist encontrada com id: ${id}`);
            return null;
        }

        logInfo('findOnePlaylist', `Playlist encontrada: ${playlist.name}`);
        return playlist;
    } catch (error) {
        logError('findOnePlaylist', 'Erro ao buscar playlist', error);
        throw error;
    }
}

export default findOnePlaylist;
import connect from '../db/connect.js';
import { logError, logInfo, logWarn } from '../logger/logger.js';

async function deletePlaylist(id) {
    if (!id) throw new Error('Campo obrigatório ausente: id');

    try {
        const db = await connect();
        const collection = db.collection('playlists');
        const result = await collection.deleteOne({ _id: id });

        if (result.deletedCount === 0) {
            logWarn('deletePlaylist', `Nenhuma playlist encontrada com id: ${id}`);
            return null;
        }

        logInfo('deletePlaylist', `Playlist deletada com id: ${id}`);
        return result;
    } catch (error) {
        logError('deletePlaylist', 'Erro ao deletar playlist', error);
        throw error;
    }
}

export default deletePlaylist;
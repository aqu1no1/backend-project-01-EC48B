import connect from '../db/connect.js';
import { logError, logInfo, logWarn } from '../logger/logger.js';

async function deleteFavorite({ userId, videoId }) {
    if (!userId) throw new Error('Campo obrigatório ausente: userId');
    if (!videoId) throw new Error('Campo obrigatório ausente: videoId');

    try {
        const db = await connect();
        const collection = db.collection('favoritos');
        const result = await collection.deleteOne({ userId, videoId });

        if (result.deletedCount === 0) {
            logWarn('deleteFavorite', 'Favorito não encontrado');
            return null;
        }

        logInfo('deleteFavorite', `Favorito removido: userId=${userId} videoId=${videoId}`);
        return result;
    } catch (error) {
        logError('deleteFavorite', 'Erro ao deletar favorito', error);
        throw error;
    }
}

export default deleteFavorite;
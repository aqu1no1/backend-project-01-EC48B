import connect from '../db/connect.js';
import { logError, logInfo, logWarn } from '../logger/logger.js';

async function deleteVideo(id) {
    if (!id) throw new Error('Campo obrigatório ausente: id');

    try {
        const db = await connect();
        const collection = db.collection('videos');
        const result = await collection.deleteOne({ _id: id });

        if (result.deletedCount === 0) {
            logWarn('deleteVideo', `Nenhum vídeo encontrado com id: ${id}`);
            return null;
        }

        logInfo('deleteVideo', `Vídeo deletado com id: ${id}`);
        return result;
    } catch (error) {
        logError('deleteVideo', 'Erro ao deletar vídeo', error);
        throw error;
    }
}

export default deleteVideo;
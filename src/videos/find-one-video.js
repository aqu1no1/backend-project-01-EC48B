import connect from '../db/connect.js';
import { logError, logInfo, logWarn } from '../logger/logger.js';

async function findOneVideo(id) {
    if (!id) throw new Error('Campo obrigatório ausente: id');

    try {
        const db = await connect();
        const collection = db.collection('videos');
        const video = await collection.findOne({ _id: id });

        if (!video) {
            logWarn('findOneVideo', `Nenhum vídeo encontrado com id: ${id}`);
            return null;
        }

        logInfo('findOneVideo', `Vídeo encontrado: ${video.name}`);
        return video;
    } catch (error) {
        logError('findOneVideo', 'Erro ao buscar vídeo', error);
        throw error;
    }
}

export default findOneVideo;
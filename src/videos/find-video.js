import connect from '../db/connect.js';
import { logError, logInfo } from '../logger/logger.js';

async function findVideos(filtro = {}) {
    try {
        const db = await connect();
        const collection = db.collection('videos');
        const videos = await collection.find(filtro).toArray();

        logInfo('findVideos', `${videos.length} vídeo(s) encontrado(s)`);
        return videos;
    } catch (error) {
        logError('findVideos', 'Erro ao buscar vídeos', error);
        throw error;
    }
}

export default findVideos;
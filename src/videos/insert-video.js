import connect from '../db/connect.js';
import { v4 as uuidv4 } from 'uuid';
import { validateUrl } from '../validators/validate-url.js';
import { validateDuration } from '../validators/validate-duration.js';
import { logError, logInfo } from '../logger/logger.js';

async function insertVideo({ name, url, category, duration, userId }) {
    if (!name) throw new Error('Campo obrigatório ausente: nome');
    if (!url) throw new Error('Campo obrigatório ausente: url');
    if (!category) throw new Error('Campo obrigatório ausente: categoria');
    if (duration === undefined || duration === null) throw new Error('Campo obrigatório ausente: duracao');
    if (!userId) throw new Error('Campo obrigatório ausente: userId');

    validateUrl(url);
    validateDuration(duration);

    try {
        const db = await connect();
        const collection = db.collection('videos');

        const video = {
            _id: uuidv4(),
            name,
            url,
            category,
            duration,
            count: { like: 0, dislike: 0 },
            createdAt: new Date(),
            updatedAt: new Date(),
            userId,
        };

        const result = await collection.insertOne(video);
        logInfo('insertVideo', `Vídeo inserido com id: ${result.insertedId}`);
        return result;
    } catch (error) {
        logError('insertVideo', 'Erro ao inserir vídeo', error);
        throw error;
    }
}

export default insertVideo;
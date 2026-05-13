import connect from '../db/connect.js';
import { logError, logInfo } from '../logger/logger.js';

async function findFavorites(userId) {
    if (!userId) throw new Error('Campo obrigatório ausente: userId');

    try {
        const db = await connect();
        const collection = db.collection('favoritos');
        const favoritos = await collection.find({ userId }).toArray();

        logInfo('findFavorites', `${favoritos.length} favorito(s) encontrado(s)`);
        return favoritos;
    } catch (error) {
        logError('findFavorites', 'Erro ao buscar favoritos', error);
        throw error;
    }
}

export default findFavorites;
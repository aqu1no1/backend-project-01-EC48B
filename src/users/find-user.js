import connect from '../db/connect.js';
import { logError, logInfo } from '../logger/logger.js';

async function findUsers(filtro = {}) {
    try {
        const db = await connect();
        const collection = db.collection('users');
        const users = await collection.find(filtro, {
            projection: { password: 0 },
        }).toArray();

        logInfo('findUsers', `${users.length} usuário(s) encontrado(s)`);
        return users;
    } catch (error) {
        logError('findUsers', 'Erro ao buscar usuários', error);
        throw error;
    }
}

export default findUsers;